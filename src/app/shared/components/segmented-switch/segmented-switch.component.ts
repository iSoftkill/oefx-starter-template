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
  styles: [`
    :host {
      display: inline-block;
    }
    :host(.block) {
      display: block;
      width: 100%;
    }
    .switch-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .switch-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .switch-badge {
      font-size: 0.6875rem;
      padding: 1px 7px;
      border-radius: var(--oefa-radius-full, 9999px);
      background: var(--oefa-neutral-200, #E2E8F0);
      color: var(--oefa-text-secondary, #334155);
      border: 1px solid var(--oefa-border-color, #E2E8F0);
      font-weight: 700;
      line-height: 1.4;
      display: inline-flex;
      align-items: center;
      transition: all var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
    }
    .switch-dot-badge {
      width: 7px;
      height: 7px;
      border-radius: var(--oefa-radius-full, 9999px);
      background-color: var(--oefa-error-root, #E51A2F);
      flex-shrink: 0;
      box-shadow: 0 0 0 2px var(--oefa-surface-card, #ffffff);
      transition: transform var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
    }
    .switch-tooltip-wrapper {
      display: inline-flex;
      align-items: center;
      margin-left: 2px;
      line-height: 1;
      --oefa-info-tooltip-color: var(--oefa-text-muted, #475569);
      --oefa-info-tooltip-hover-color: var(--oefa-primary-root, #144AA7);
    }
    .switch-btn:hover:not(.active) .switch-badge {
      background: var(--oefa-neutral-300, #CBD5E1);
      color: var(--oefa-text-primary, #1D1D1B);
    }
    .switch-btn.active .switch-dot-badge {
      box-shadow: 0 0 0 2px var(--oefa-primary-root, #144AA7);
    }
    .switch-btn.active .switch-badge {
      background: rgba(255, 255, 255, 0.22);
      border-color: rgba(255, 255, 255, 0.35);
      color: var(--oefa-primary-on, #FFFFFF);
    }
    .switch-btn.active .switch-tooltip-wrapper {
      --oefa-info-tooltip-color: rgba(255, 255, 255, 0.85);
      --oefa-info-tooltip-hover-color: #FFFFFF;
    }
  `]
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
