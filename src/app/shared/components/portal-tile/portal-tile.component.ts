import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OefaIconComponent } from '../icon/icon.component';

export type PortalTileVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'emerald';

/**
 * Componente Institucional de Acceso Rápido / Mosaico de Portal (<oefa-portal-tile>).
 * Diseñado bajo las reglas del OEFA Design System:
 * - Colores firmes y de bajo tono (container tokens M3), sin degradados.
 * - Alto contraste WCAG AA/AAA (> 7:1) entre fondos y textos/iconos.
 * - Área táctil accesible mínima de 44px (WCAG 2.5.8).
 */
@Component({
  selector: 'oefa-portal-tile',
  standalone: true,
  imports: [CommonModule, RouterModule, OefaIconComponent],
  templateUrl: './portal-tile.component.html',
  styleUrls: ['./portal-tile.component.scss']
})
export class OefaPortalTileComponent {
  @Input() label: string = '';
  @Input() icon: string = 'star';
  @Input() variant: PortalTileVariant = 'primary';
  @Input() iconColor?: string;
  @Input() routerLink?: string;
  @Input() href?: string;
  @Input() external: boolean = false;
  @Input() ariaLabel?: string;

  @Output() tileClick = new EventEmitter<void>();

  get computedIconColor(): string {
    if (this.iconColor) {
      return this.iconColor;
    }
    switch (this.variant) {
      case 'secondary':
      case 'cyan':
      case 'teal':
        return 'var(--oefa-secondary-ui-safe, #2C817A)';
      case 'success':
      case 'emerald':
        return 'var(--oefa-success-ui-safe, #578221)';
      case 'warning':
        return 'var(--oefa-tertiary-ui-safe, #996D00)';
      case 'error':
        return 'var(--oefa-error-root, #E51A2F)';
      case 'neutral':
        return 'var(--oefa-text-secondary, #475569)';
      case 'primary':
      case 'blue':
      default:
        return 'var(--oefa-primary-root, #144AA7)';
    }
  }

  onClick(): void {
    this.tileClick.emit();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.tileClick.emit();
    }
  }
}
