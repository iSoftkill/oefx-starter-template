import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent } from '../icon/icon.component';

/**
 * Variantes visuales de forma/estilo según estándar OEFA Design System.
 * - 'pill': Cápsula redondeada completa (radius-full). Estilo estándar para tags/badges.
 * - 'rounded': Esquinas redondeadas suaves (radius-sm/md). Ideal para códigos y metadatos.
 * - 'outlined': Solo contorno/borde con fondo transparente o tenue.
 * - 'filter': Chip interactivo para barras de filtro (soporta [active], hover, toggle).
 *
 * Retrocompatibilidad:
 * 'project', 'maintenance', 'siged', 'area', 'deliverable', 'default',
 * y variantes semánticas directas ('success', 'warning', 'info', etc.).
 */
export type ChipVariant = 'pill' | 'rounded' | 'outlined' | 'filter';

/**
 * Paleta semántica institucional OEFA (Tokens WCAG 2.2 AA).
 */
export type ChipColor =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'secondary'
  | 'primary';

/**
 * Componente Institucional de Chips y Etiquetas OEFA.
 * Desacoplado: Estilo/Forma (`variant`) + Color Semántico (`color`).
 * Admite iconos y logos (vía input o proyección [logo]), prefijos configurables,
 * chips interactivos de filtro rápido con estado activo, y opción de remoción (removable).
 */
@Component({
  selector: 'oefa-chip',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class OefaChipComponent {
  /** Estilo de forma / comportamiento del chip: 'pill' | 'rounded' | 'outlined' | 'filter' */
  @Input() variant: ChipVariant = 'pill';
  /** Color semántico explícito independiente de la forma */
  @Input() color: ChipColor = 'default';
  /** Prefijo opcional no acoplado (ej: '[PRY]', '[MNT]', '[EXP]') */
  @Input() prefix?: string;
  @Input() label: string = '';
  @Input() title?: string;
  @Input() icon?: string;
  @Input() logo?: string;
  @Input() size: 'sm' | 'md' = 'md';
  @Input() active: boolean = false;
  @Input() clickable: boolean = false;
  @Input() removable: boolean = false;
  @Input() disabled: boolean = false;

  @Output() clicked = new EventEmitter<MouseEvent>();
  @Output() activeChange = new EventEmitter<boolean>();
  @Output() removed = new EventEmitter<MouseEvent>();

  get isImageLogo(): boolean {
    return !!this.logo && (this.logo.includes('/') || this.logo.endsWith('.svg') || this.logo.endsWith('.png'));
  }

  get isInteractive(): boolean {
    return (
      !this.disabled &&
      (this.clickable ||
        this.variant === 'filter' ||
        this.clicked.observed ||
        this.activeChange.observed)
    );
  }

  onClick(event: MouseEvent): void {
    if (this.disabled) return;
    if (this.isInteractive) {
      this.clicked.emit(event);
      this.activeChange.emit(!this.active);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (this.isInteractive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.onClick(event as unknown as MouseEvent);
    }
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.removed.emit(event);
    }
  }
}
