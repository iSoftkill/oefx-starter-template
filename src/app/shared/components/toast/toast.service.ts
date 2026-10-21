import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

export const DEFAULT_TOAST_DURATION = 3200;

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _defaultDuration = DEFAULT_TOAST_DURATION;
  private _toasts = signal<ToastItem[]>([]);
  readonly toasts = this._toasts.asReadonly();

  /**
   * Configura la duracion global por defecto de las notificaciones toast (en ms).
   * @param ms Milisegundos de permanencia antes de auto-cerrarse (ej. 3200, 5000).
   */
  setDefaultDuration(ms: number): void {
    if (ms >= 0) {
      this._defaultDuration = ms;
    }
  }

  /**
   * Obtiene la duracion configurada por defecto (en ms).
   */
  getDefaultDuration(): number {
    return this._defaultDuration;
  }

  /**
   * Muestra una notificacion emergente en la esquina superior derecha.
   * @param message Texto del mensaje.
   * @param type Tipo de toast ('success' | 'warning' | 'error' | 'info').
   * @param duration Duracion en ms (opcional). Por defecto 3200ms. Si es 0, no se auto-cierra.
   */
  show(message: string, type: ToastType = 'info', duration?: number): string {
    const effectiveDuration = duration !== undefined ? duration : this._defaultDuration;
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newItem: ToastItem = { id, message, type, duration: effectiveDuration };

    this._toasts.update(current => [...current, newItem]);

    if (effectiveDuration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, effectiveDuration);
    }

    return id;
  }

  success(message: string, duration?: number): string {
    return this.show(message, 'success', duration);
  }

  warning(message: string, duration?: number): string {
    return this.show(message, 'warning', duration);
  }

  error(message: string, duration?: number): string {
    return this.show(message, 'error', duration);
  }

  info(message: string, duration?: number): string {
    return this.show(message, 'info', duration);
  }

  dismiss(id: string): void {
    this._toasts.update(current => current.filter(t => t.id !== id));
  }

  remove(id: string): void {
    this.dismiss(id);
  }

  clear(): void {
    this._toasts.set([]);
  }
}
