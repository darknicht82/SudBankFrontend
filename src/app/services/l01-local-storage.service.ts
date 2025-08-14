import { Injectable } from '@angular/core';
import { L01RegulatoryData } from './l01-regulatory.service';

export interface PendingChange {
  id: string;
  type: 'create' | 'update' | 'delete';
  data: L01RegulatoryData;
  timestamp: Date;
  status: 'pending' | 'syncing' | 'synced' | 'error';
  errorMessage?: string;
  retryCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class L01LocalStorageService {
  private readonly STORAGE_KEY = 'l01_pending_changes';
  private readonly MAX_RETRY_COUNT = 3;
  private readonly STORAGE_EXPIRY_DAYS = 7;

  constructor() {}

  /**
   * Guarda un cambio pendiente en el almacenamiento local
   */
  savePendingChange(change: Omit<PendingChange, 'id' | 'timestamp' | 'status' | 'retryCount'>): string {
    const pendingChange: PendingChange = {
      ...change,
      id: this.generateChangeId(),
      timestamp: new Date(),
      status: 'pending',
      retryCount: 0
    };

    const changes = this.getPendingChanges();
    changes.push(pendingChange);
    this.saveToStorage(changes);

    return pendingChange.id;
  }

  /**
   * Obtiene todos los cambios pendientes
   */
  getPendingChanges(): PendingChange[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];

      const changes: PendingChange[] = JSON.parse(stored);
      
      // Limpiar cambios expirados
      const validChanges = changes.filter(change => 
        this.isChangeValid(change)
      );

      if (validChanges.length !== changes.length) {
        this.saveToStorage(validChanges);
      }

      return validChanges;
    } catch (error) {
      console.error('Error al obtener cambios pendientes:', error);
      return [];
    }
  }

  /**
   * Obtiene cambios pendientes por tipo
   */
  getPendingChangesByType(type: 'create' | 'update' | 'delete'): PendingChange[] {
    return this.getPendingChanges().filter(change => change.type === type);
  }

  /**
   * Obtiene cambios pendientes por estado
   */
  getPendingChangesByStatus(status: PendingChange['status']): PendingChange[] {
    return this.getPendingChanges().filter(change => change.status === status);
  }

  /**
   * Actualiza el estado de un cambio pendiente
   */
  updateChangeStatus(changeId: string, status: PendingChange['status'], errorMessage?: string): boolean {
    const changes = this.getPendingChanges();
    const changeIndex = changes.findIndex(c => c.id === changeId);
    
    if (changeIndex === -1) return false;

    changes[changeIndex].status = status;
    if (errorMessage) {
      changes[changeIndex].errorMessage = errorMessage;
    }
    
    if (status === 'error') {
      changes[changeIndex].retryCount++;
    }

    this.saveToStorage(changes);
    return true;
  }

  /**
   * Marca un cambio como sincronizado exitosamente
   */
  markChangeAsSynced(changeId: string): boolean {
    return this.updateChangeStatus(changeId, 'synced');
  }

  /**
   * Marca un cambio como error
   */
  markChangeAsError(changeId: string, errorMessage: string): boolean {
    return this.updateChangeStatus(changeId, 'error', errorMessage);
  }

  /**
   * Marca un cambio como sincronizando
   */
  markChangeAsSyncing(changeId: string): boolean {
    return this.updateChangeStatus(changeId, 'syncing');
  }

  /**
   * Elimina un cambio pendiente (cuando ya fue procesado)
   */
  removePendingChange(changeId: string): boolean {
    const changes = this.getPendingChanges();
    const filteredChanges = changes.filter(c => c.id !== changeId);
    
    if (filteredChanges.length !== changes.length) {
      this.saveToStorage(filteredChanges);
      return true;
    }
    
    return false;
  }

  /**
   * Limpia todos los cambios pendientes
   */
  clearAllPendingChanges(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Limpia cambios sincronizados exitosamente
   */
  clearSyncedChanges(): void {
    const changes = this.getPendingChanges();
    const pendingChanges = changes.filter(c => c.status !== 'synced');
    this.saveToStorage(pendingChanges);
  }

  /**
   * Obtiene estadísticas de cambios pendientes
   */
  getPendingChangesStats(): {
    total: number;
    pending: number;
    syncing: number;
    synced: number;
    error: number;
    create: number;
    update: number;
    delete: number;
  } {
    const changes = this.getPendingChanges();
    
    return {
      total: changes.length,
      pending: changes.filter(c => c.status === 'pending').length,
      syncing: changes.filter(c => c.status === 'syncing').length,
      synced: changes.filter(c => c.status === 'synced').length,
      error: changes.filter(c => c.status === 'error').length,
      create: changes.filter(c => c.type === 'create').length,
      update: changes.filter(c => c.type === 'update').length,
      delete: changes.filter(c => c.type === 'delete').length
    };
  }

  /**
   * Verifica si hay cambios pendientes que requieren sincronización
   */
  hasChangesToSync(): boolean {
    const changes = this.getPendingChanges();
    return changes.some(c => c.status === 'pending' || c.status === 'error');
  }

  /**
   * Obtiene cambios que pueden ser reintentados
   */
  getRetryableChanges(): PendingChange[] {
    return this.getPendingChanges().filter(c => 
      c.status === 'error' && c.retryCount < this.MAX_RETRY_COUNT
    );
  }

  /**
   * Verifica si un cambio puede ser reintentado
   */
  canRetryChange(changeId: string): boolean {
    const change = this.getPendingChanges().find(c => c.id === changeId);
    return change ? change.retryCount < this.MAX_RETRY_COUNT : false;
  }

  /**
   * Guarda cambios en el almacenamiento local
   */
  private saveToStorage(changes: PendingChange[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(changes));
    } catch (error) {
      console.error('Error al guardar cambios pendientes:', error);
    }
  }

  /**
   * Genera un ID único para el cambio
   */
  private generateChangeId(): string {
    return `l01_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Verifica si un cambio sigue siendo válido (no expirado)
   */
  private isChangeValid(change: PendingChange): boolean {
    const expiryDate = new Date(change.timestamp);
    expiryDate.setDate(expiryDate.getDate() + this.STORAGE_EXPIRY_DAYS);
    
    return new Date() < expiryDate;
  }

  /**
   * Exporta cambios pendientes para debugging
   */
  exportPendingChanges(): string {
    const changes = this.getPendingChanges();
    return JSON.stringify(changes, null, 2);
  }

  /**
   * Importa cambios pendientes desde backup
   */
  importPendingChanges(backupData: string): boolean {
    try {
      const changes: PendingChange[] = JSON.parse(backupData);
      
      // Validar estructura
      if (!Array.isArray(changes)) return false;
      
      const validChanges = changes.filter(change => 
        change.id && change.type && change.data && change.timestamp
      );
      
      if (validChanges.length === 0) return false;
      
      this.saveToStorage(validChanges);
      return true;
    } catch (error) {
      console.error('Error al importar cambios pendientes:', error);
      return false;
    }
  }
}
