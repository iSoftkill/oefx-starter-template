import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaInfoTooltipComponent } from '../info-tooltip/info-tooltip.component';

export interface SegmentedOption<T = any> {
  value: T;
  label: string;
  icon?: string;
  badge?: string | number;
  dotBadge?: boolean;
  dotColor?: string;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

/**
 * Componente conmutador segmentado (Segmented Switch / Button Group)
 * Basado en los tokens institucionales OEFA (.segmented-switch & .switch-btn).
 *
 * @example
 * <oefa-segmented-switch
 *   [options]="[
 *     { value: 'orders', label: 'Vista por Órdenes', badge: 12 },
 *     { value: 'deliverables', label: 'Matriz Excel', dotBadge: true, tooltip: 'Ver detalle matricial' }
 *   ]"
 *   [(selected)]="currentView" />
 */
@Component({
  selector: 'oefa-segmented-switch',
  standalone: true,
  imports: [CommonModule, OefaInfoTooltipComponent],
  template: `
    <div 
      class="segmented-switch" 
      [class.full-width]="fullWidth"
      role="group" 
      [attr.aria-label]="ariaLabel">
      
      @for (opt of options; track opt.value) {
        <button
          type="button"
          class="switch-btn"
          [class.active]="opt.value === selected"
          [disabled]="opt.disabled"
          (click)="selectOption(opt)"
          [attr.aria-pressed]="opt.value === selected">
          
          @if (opt.icon) {
            <span class="switch-icon" [innerHTML]="opt.icon"></span>
          }

          <span class="switch-mode-text">{{ opt.label }}</span>

          @if (opt.dotBadge) {
            <span 
              class="switch-dot-badge" 
              [style.background-color]="opt.dotColor || 'var(--oefa-danger, #ef4444)'"
              aria-label="Notificación pendiente"></span>
          }

          @if (opt.badge !== undefined) {
            <span class="switch-badge">{{ opt.badge }}</span>
          }

          @if (opt.tooltip) {
            <span class="switch-tooltip-wrapper" (click)="$event.stopPropagation()">
              <oefa-info-tooltip
                [text]="opt.tooltip"
                [position]="opt.tooltipPosition || 'top'"
                size="sm" />
            </span>
          }
        </button>
      }
    </div>
  `,
  styleUrls: ['./segmented-switch.component.scss']
})
export class OefaSegmentedSwitchComponent<T = any> {
  @Input() options: SegmentedOption<T>[] = [];
  @Input() selected!: T;
  @Input() fullWidth = false;
  @Input() ariaLabel = 'Conmutador de opciones';

  @Output() selectedChange = new EventEmitter<T>();

  selectOption(opt: SegmentedOption<T>): void {
    if (!opt.disabled && opt.value !== this.selected) {
      this.selected = opt.value;
      this.selectedChange.emit(this.selected);
    }
  }
}
