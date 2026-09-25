import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent, OefaIconSize } from '../icon/icon.component';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'excel' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonIconPosition = 'left' | 'right';

/**
 * Componente reutilizable de botón con variantes del design system OEFA.
 *
 * @example
 * <oefa-button variant="primary" icon="plus" (clicked)="crear()">Nuevo Registro</oefa-button>
 *
 * @example
 * <oefa-button variant="secondary" icon="download" iconPosition="right" (clicked)="exportar()">Descargar</oefa-button>
 */
@Component({
  selector: 'oefa-button',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  template: `
    <button
      [type]="type"
      class="btn"
      [ngClass]="[variantClass, sizeClass]"
      [disabled]="disabled || loading"
      [title]="title"
      (click)="handleClick($event)">
      @if (loading) {
        <span class="spinner-small"></span>
      } @else if (icon && iconPosition === 'left') {
        <oefa-icon [name]="icon" [size]="iconSize" />
      }
      <ng-content />
      @if (!loading && icon && iconPosition === 'right') {
        <oefa-icon [name]="icon" [size]="iconSize" />
      }
    </button>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    /* Los estilos de .btn, .btn-primary, etc. están en styles.scss */
    button { width: 100%; }
  `]
})
export class OefaButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() title = '';
  @Input() icon?: string;
  @Input() iconPosition: ButtonIconPosition = 'left';
  @Output() clicked = new EventEmitter<void>();
  @Output() btnClick = this.clicked;

  get variantClass(): string {
    const map: Record<ButtonVariant, string> = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      excel: 'btn-excel',
      danger: 'btn-danger',
    };
    return map[this.variant];
  }

  get sizeClass(): string {
    const map: Record<ButtonSize, string> = {
      sm: 'btn-sm',
      md: '',
      lg: 'btn-lg',
    };
    return map[this.size];
  }

  get iconSize(): OefaIconSize {
    switch (this.size) {
      case 'sm':
        return 'xs';
      case 'lg':
        return 'md';
      case 'md':
      default:
        return 'sm';
    }
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
