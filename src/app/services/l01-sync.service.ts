import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, retry, switchMap, tap } from 'rxjs/operators';
import { L01RegulatoryService, L01RegulatoryData } from './l01-regulatory.service';
import { L01LocalStorageService, PendingChange } from './l01-local-storage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class L01SyncService {
  private isOnline = true;
  private syncInProgress = false;
  private readonly SYNC_INTERVAL = 30000; // 30 segundos
  private readonly MAX_RETRY_DELAY = 60000; // 1 minuto

  constructor(
    private regulatoryService: L01RegulatoryService,
    private localStorageService: L01LocalStorageService
  ) {
    this.startAutoSync();
  }

  /**
   * Inicia la sincronización automática
   */
  private startAutoSync(): void {
    if (environment.production) {
      setInterval(() => {
        this.syncPendingChanges();
      }, this.SYNC_INTERVAL);
    }
  }

  /**
   * Verifica la conectividad con el backend
   */
  checkBackendConnectivity(): Observable<boolean> {
    return this.regulatoryService.listarTodos().pipe(
      map(() => {
        this.isOnline = true;
        return true;
      }),
      catchError(() => {
        this.isOnline = false;
        return of(false);
      })
    );
  }

  /**
   * Sincroniza todos los cambios pendientes
   */
  syncPendingChanges(): Observable<boolean> {
    if (this.syncInProgress) {
      return of(false);
    }

    this.syncInProgress = true;
    const pendingChanges = this.localStorageService.getPendingChangesByStatus('pending');
    const errorChanges = this.localStorageService.getRetryableChanges();

    if (pendingChanges.length === 0 && errorChanges.length === 0) {
      this.syncInProgress = false;
      return of(true);
    }

    const allChanges = [...pendingChanges, ...errorChanges];
    let processedCount = 0;
    let successCount = 0;

    return new Observable(observer => {
      const processNext = (index: number) => {
        if (index >= allChanges.length) {
          this.syncInProgress = false;
          observer.next(successCount === allChanges.length);
          observer.complete();
          return;
        }

        const change = allChanges[index];
        this.processChange(change).subscribe(
          (success) => {
            if (success) {
              successCount++;
              this.localStorageService.removePendingChange(change.id);
            }
            processedCount++;
            processNext(index + 1);
          },
          (error) => {
            processedCount++;
            this.localStorageService.markChangeAsError(change.id, error.message || 'Error de sincronización');
            processNext(index + 1);
          }
        );
      };

      processNext(0);
    });
  }

  /**
   * Procesa un cambio individual
   */
  private processChange(change: PendingChange): Observable<boolean> {
    this.localStorageService.markChangeAsSyncing(change.id);

    switch (change.type) {
      case 'create':
        return this.regulatoryService.crear(change.data).pipe(
          tap(() => this.localStorageService.markChangeAsSynced(change.id)),
          map(() => true),
          catchError(error => {
            this.localStorageService.markChangeAsError(change.id, error.message || 'Error al crear');
            return throwError(error);
          })
        );

      case 'update':
        if (!change.data.id) {
          this.localStorageService.markChangeAsError(change.id, 'ID no válido para actualización');
          return throwError(new Error('ID no válido'));
        }
        return this.regulatoryService.actualizar(change.data.id, change.data).pipe(
          tap(() => this.localStorageService.markChangeAsSynced(change.id)),
          map(() => true),
          catchError(error => {
            this.localStorageService.markChangeAsError(change.id, error.message || 'Error al actualizar');
            return throwError(error);
          })
        );

      case 'delete':
        if (!change.data.id) {
          this.localStorageService.markChangeAsError(change.id, 'ID no válido para eliminación');
          return throwError(new Error('ID no válido'));
        }
        return this.regulatoryService.eliminar(change.data.id).pipe(
          tap(() => this.localStorageService.markChangeAsSynced(change.id)),
          map(() => true),
          catchError(error => {
            this.localStorageService.markChangeAsError(change.id, error.message || 'Error al eliminar');
            return throwError(error);
          })
        );

      default:
        this.localStorageService.markChangeAsError(change.id, 'Tipo de cambio no válido');
        return throwError(new Error('Tipo de cambio no válido'));
    }
  }

  /**
   * Crea un registro con sincronización automática
   */
  createWithSync(data: L01RegulatoryData): Observable<L01RegulatoryData> {
    if (this.isOnline) {
      return this.regulatoryService.crear(data).pipe(
        catchError(error => {
          // Si falla, guardar localmente
          const changeId = this.localStorageService.savePendingChange({
            type: 'create',
            data: data
          });
          console.log(`Registro guardado localmente con ID: ${changeId}`);
          return throwError(error);
        })
      );
    } else {
      // Sin conexión, guardar localmente
      const changeId = this.localStorageService.savePendingChange({
        type: 'create',
        data: data
      });
      return of({ ...data, id: parseInt(changeId.split('_')[1]) });
    }
  }

  /**
   * Actualiza un registro con sincronización automática
   */
  updateWithSync(id: number, data: L01RegulatoryData): Observable<L01RegulatoryData> {
    if (this.isOnline) {
      return this.regulatoryService.actualizar(id, data).pipe(
        catchError(error => {
          // Si falla, guardar localmente
          const changeId = this.localStorageService.savePendingChange({
            type: 'update',
            data: { ...data, id }
          });
          console.log(`Actualización guardada localmente con ID: ${changeId}`);
          return throwError(error);
        })
      );
    } else {
      // Sin conexión, guardar localmente
      const changeId = this.localStorageService.savePendingChange({
        type: 'update',
        data: { ...data, id }
      });
      return of(data);
    }
  }

  /**
   * Elimina un registro con sincronización automática
   */
  deleteWithSync(id: number): Observable<void> {
    if (this.isOnline) {
      return this.regulatoryService.eliminar(id).pipe(
        catchError(error => {
          // Si falla, guardar localmente
          const changeId = this.localStorageService.savePendingChange({
            type: 'delete',
            data: { id } as L01RegulatoryData
          });
          console.log(`Eliminación guardada localmente con ID: ${changeId}`);
          return throwError(error);
        })
      );
    } else {
      // Sin conexión, guardar localmente
      const changeId = this.localStorageService.savePendingChange({
        type: 'delete',
        data: { id } as L01RegulatoryData
      });
      return of(void 0);
    }
  }

  /**
   * Reintenta sincronizar cambios con error
   */
  retryFailedChanges(): Observable<boolean> {
    const failedChanges = this.localStorageService.getPendingChangesByStatus('error');
    if (failedChanges.length === 0) {
      return of(true);
    }

    return this.syncPendingChanges();
  }

  /**
   * Obtiene el estado de sincronización
   */
  getSyncStatus(): {
    isOnline: boolean;
    syncInProgress: boolean;
    pendingChanges: number;
    errorChanges: number;
    lastSync: Date | null;
  } {
    const stats = this.localStorageService.getPendingChangesStats();
    return {
      isOnline: this.isOnline,
      syncInProgress: this.syncInProgress,
      pendingChanges: stats.pending,
      errorChanges: stats.error,
      lastSync: this.getLastSyncTime()
    };
  }

  /**
   * Obtiene la hora de la última sincronización exitosa
   */
  private getLastSyncTime(): Date | null {
    const syncedChanges = this.localStorageService.getPendingChangesByStatus('synced');
    if (syncedChanges.length === 0) return null;

    const latestSync = syncedChanges.reduce((latest, current) => 
      current.timestamp > latest.timestamp ? current : latest
    );

    return latestSync.timestamp;
  }

  /**
   * Fuerza una sincronización manual
   */
  forceSync(): Observable<boolean> {
    return this.checkBackendConnectivity().pipe(
      switchMap(isOnline => {
        if (!isOnline) {
          return throwError(new Error('Backend no disponible'));
        }
        return this.syncPendingChanges();
      })
    );
  }

  /**
   * Limpia cambios sincronizados exitosamente
   */
  cleanupSyncedChanges(): void {
    this.localStorageService.clearSyncedChanges();
  }

  /**
   * Exporta el estado de sincronización para debugging
   */
  exportSyncStatus(): string {
    const status = this.getSyncStatus();
    const pendingChanges = this.localStorageService.getPendingChanges();
    
    return JSON.stringify({
      status,
      pendingChanges,
      timestamp: new Date().toISOString()
    }, null, 2);
  }
}

