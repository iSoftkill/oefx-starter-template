import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaChipComponent, ChipVariant } from '../chip/chip.component';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';
import { OefaIconComponent } from '../icon/icon.component';

export type CatalogActivityType = 'sparkline' | 'bar' | 'pulse' | 'none';

export interface CatalogChipConfig {
  variant: ChipVariant;
  label: string;
}

@Component({
  selector: 'oefa-catalog-card',
  standalone: true,
  imports: [CommonModule, OefaChipComponent, OefaStatusBadgeComponent, OefaIconComponent],
  template: `
    <div
      class="bento-catalog-card"
      (click)="onCardClick()"
      role="article"
      [attr.aria-label]="title"
      tabindex="0"
      (keydown.enter)="onCardClick()"
      (keydown.space)="onCardClick()"
    >
      <!-- Cabecera de la Card -->
      <div class="bcc-top">
        <div class="bcc-icon-box" [style.color]="iconColor || color">
          <oefa-icon [name]="icon" [size]="22" [color]="iconColor || color">
            <ng-content select="[icon]" />
          </oefa-icon>
        </div>
        <div class="bcc-status-wrap">
          @if (status) {
            <oefa-status-badge [status]="status" size="sm" [dot]="true" />
          } @else if (type) {
            <span class="bcc-badge" [style.background]="bgTint || 'var(--oefa-surface-muted)'" [style.color]="typeColor || color">
              {{ type }}
            </span>
          }
        </div>
      </div>

      <!-- Cuerpo: Título, metadatos, descripción y tags -->
      <div class="bcc-body">
        @if (type && status) {
          <div class="bcc-top-meta">
            <span class="bcc-badge" [style.background]="bgTint || 'var(--oefa-surface-muted)'" [style.color]="typeColor || color">
              {{ type }}
            </span>
          </div>
        }
        <h3 class="bcc-title">{{ title }}</h3>
        <p class="bcc-description">{{ description }}</p>

        <div class="bcc-tags">
          @if (chips && chips.length > 0) {
            @for (chip of chips; track chip.label) {
              <oefa-chip [variant]="chip.variant" [label]="chip.label" />
            }
          }
          @if (tags && tags.length > 0) {
            @for (tag of tags; track tag) {
              <span class="bcc-tag">{{ tag }}</span>
            }
          }
        </div>
      </div>

      <!-- Footer: Micro-indicador de actividad y acción -->
      <div class="bcc-footer">
        <div class="bcc-activity" aria-hidden="true">
          @if (activityType === 'sparkline') {
            <div class="mini-spark-wrap">
              <span class="mini-stat-label">{{ activityLabel || 'Uso semanal' }}</span>
              <svg class="mini-spark" viewBox="0 0 50 16">
                <path d="M 0,14 Q 10,2 20,10 T 35,4 T 50,2" fill="none" [attr.stroke]="color" stroke-width="2" stroke-linecap="round"></path>
              </svg>
            </div>
          } @else if (activityType === 'bar') {
            <div class="mini-bar-wrap">
              <span class="mini-stat-label">{{ activityLabel || 'Actividad 98%' }}</span>
              <div class="mini-bar-track">
                <div class="mini-bar-fill" [style.background]="color" style="width: 98%"></div>
              </div>
            </div>
          } @else if (activityType === 'pulse') {
            <div class="mini-pulse-wrap">
              <span class="pulse-dot"></span>
              <span class="mini-stat-label">{{ activityLabel || 'En línea' }}</span>
            </div>
          }
          @if (updatedAt) {
            <span class="bcc-time">{{ updatedAt }}</span>
          }
        </div>

        <button
          class="bcc-btn"
          [style.color]="color"
          [style.background]="bgTint || 'var(--oefa-surface-muted)'"
          (click)="onActionClick($event)"
        >
          {{ actionText }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      min-width: 0;
    }

    .bento-catalog-card {
      height: 100%;
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-lg, 16px);
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      box-shadow: var(--oefa-shadow-sm);
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  box-shadow var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  border-color var(--oefa-duration-short) var(--oefa-ease-standard);
      cursor: pointer;
      outline: none;

      &:focus-visible {
        box-shadow: 0 0 0 3px var(--oefa-focus-glow), var(--oefa-shadow-sm);
        border-color: var(--oefa-primary-root);
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--oefa-shadow-md);
        border-color: var(--oefa-border-color-strong, #cbd5e1);

        .bcc-icon-box {
          transform: rotate(8deg) scale(1.12);
        }
      }

      &:active {
        transform: translateY(-1px) scale(0.995);
        transition-duration: var(--oefa-duration-short);
      }
    }

    .bcc-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .bcc-status-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-shrink: 0;
    }

    .bcc-top-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .bcc-icon-box {
      width: 44px;
      height: 44px;
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md, 12px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--oefa-shadow-sm);
      flex-shrink: 0;
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized);
    }

    .bcc-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--oefa-radius-full);
      letter-spacing: 0.02em;
    }

    .bcc-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .bcc-title {
      margin: 0;
      font-family: var(--oefa-font-display, 'Poppins', sans-serif);
      font-size: 1rem;
      font-weight: 700;
      color: var(--oefa-text-primary);
      line-height: 1.35;
      min-height: 2.7em;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bcc-description {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--oefa-text-secondary);
      line-height: 1.5;
      min-height: 3em;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bcc-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding-top: 4px;
    }

    .bcc-tag {
      font-size: 0.6875rem;
      font-weight: 500;
      background: var(--oefa-surface-muted);
      color: var(--oefa-text-secondary);
      padding: 2px 8px;
      border-radius: var(--oefa-radius-sm, 6px);
      border: 1px solid var(--oefa-border-color);
    }

    .bcc-footer {
      padding-top: 14px;
      border-top: 1px solid var(--oefa-border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .bcc-activity {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mini-spark-wrap, .mini-bar-wrap, .mini-pulse-wrap {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .mini-stat-label {
      font-size: 0.625rem;
      color: var(--oefa-text-muted);
      font-weight: 600;
      text-transform: uppercase;
    }

    .mini-spark {
      width: 54px;
      height: 14px;
    }

    .mini-bar-track {
      width: 54px;
      height: 5px;
      background: var(--oefa-surface-muted);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-full);
      overflow: hidden;
    }

    .mini-bar-fill {
      height: 100%;
      border-radius: var(--oefa-radius-full);
    }

    .mini-pulse-wrap {
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background: var(--oefa-success-ui-safe);
      border-radius: 50%;
      box-shadow: 0 0 0 3px var(--oefa-focus-glow);
    }

    .bcc-time {
      font-size: 0.6875rem;
      color: var(--oefa-text-muted);
    }

    .bcc-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.8125rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: var(--oefa-radius-md, 10px);
      transition: transform var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  filter var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);

      &:hover {
        transform: translateX(2px);
        filter: brightness(0.95);
      }
    }

    @media (max-width: 576px) {
      .bento-catalog-card {
        padding: 16px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .bento-catalog-card, .bcc-btn {
        transition: none !important;
        transform: none !important;
      }
    }
  `]
})
export class OefaCatalogCardComponent {
  @Input() icon: string = 'folder';
  @Input() iconColor?: string;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() tags: string[] = [];
  @Input() chips?: CatalogChipConfig[];
  @Input() status?: string;
  @Input() type?: string;
  @Input() typeColor?: string;
  @Input() color: string = 'var(--oefa-primary-root)';
  @Input() bgTint?: string;
  @Input() borderTint?: string;
  @Input() activityType: CatalogActivityType = 'none';
  @Input() activityLabel?: string;
  @Input() updatedAt?: string;
  @Input() actionText: string = 'Abrir';

  @Output() cardClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<Event>();

  onCardClick(): void {
    this.cardClick.emit();
  }

  onActionClick(event: Event): void {
    event.stopPropagation();
    this.actionClick.emit(event);
  }
}
