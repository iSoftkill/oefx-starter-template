import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type OefaDotBadgeColor = 'danger' | 'warning' | 'primary' | 'success' | 'info' | 'neutral';
export type OefaDotBadgeSize = 'sm' | 'md' | 'lg';

/**
 * Átomo reutilizable de punto indicador visual (Dot Badge).
 * Cumple con WCAG 2.2 y directrices del Sistema de Diseño OEFA.
 *
 * @example
 * <oefa-dot-badge color="danger" />
 * <oefa-dot-badge color="warning" size="sm" />
 * <oefa-dot-badge color="primary" [ping]="true" />
 */
@Component({
  selector: 'oefa-dot-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="oefa-dot-badge"
      [ngClass]="[
        'oefa-dot-' + color,
        'oefa-dot-' + size,
        ping ? 'oefa-dot-ping' : ''
      ]"
      [attr.aria-label]="ariaLabel"
      role="status"
    ></span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      vertical-align: middle;
    }
  `]
})
export class OefaDotBadgeComponent {
  /** Color semántico institucional */
  @Input() color: OefaDotBadgeColor = 'danger';

  /** Escala de tamaño: sm (6px), md (8px), lg (10px) */
  @Input() size: OefaDotBadgeSize = 'md';

  /** Pulso animado para estados críticos en vivo */
  @Input() ping: boolean = false;

  /** Texto para lectores de pantalla */
  @Input() ariaLabel: string = 'Indicador de alerta';
}
