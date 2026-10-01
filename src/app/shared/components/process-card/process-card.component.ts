import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent } from '../icon/icon.component';

export type ProcessCardVariant = 'estrategico' | 'misional' | 'apoyo' | 'custom';

@Component({
  selector: 'oefa-process-card',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  template: `
    <article
      class="oefa-process-card"
      [class]="'variant-' + variant"
      [class.theme-light]="theme === 'light'"
      [attr.aria-label]="title + ': ' + description"
      tabindex="0"
      (click)="onClick()"
      (keydown.enter)="onClick()"
      (keydown.space)="onClick()"
    >
      <!-- Capa 1: Fotografía de fondo (opcional / configurable) -->
      @if (bgImage) {
        <div class="card-bg-image" [style.background-image]="'url(' + bgImage + ')'"></div>
      }

      <!-- Capa 2: Degradado institucional protector de contraste -->
      <div class="card-gradient-overlay" [style.background]="customGradient || defaultGradient"></div>

      <!-- Capa 3: Contenido textual y acciones -->
      <div class="card-foreground">
        <div class="card-header-row">
          <!-- Círculo de icono institucional -->
          <div class="card-icon-circle" [style.background-color]="iconBg || defaultIconBg">
            @if (icon) {
              <oefa-icon [name]="icon" [size]="28" color="#FFFFFF" />
            } @else {
              <!-- Icono concéntrico institucional por defecto (según diseño) -->
              <svg class="concentric-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" stroke-width="2.2" />
                <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
              </svg>
            }
          </div>

          <!-- Título del proceso -->
          <h3 class="card-title">{{ title }}</h3>
        </div>

        <!-- Descripción informativa -->
        <p class="card-description">{{ description }}</p>

        <!-- CTA de acción -->
        <div class="card-action">
          <span class="action-label">{{ actionText }}</span>
          <svg class="action-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .oefa-process-card {
      position: relative;
      overflow: hidden;
      border-radius: var(--oefa-radius-xl, 20px);
      min-height: 240px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 28px;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 4px 16px rgba(10, 24, 50, 0.08);
      transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1),
                  box-shadow 0.25s cubic-bezier(0.2, 0, 0, 1);

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(10, 24, 50, 0.16);

        .action-arrow {
          transform: translateX(6px);
        }

        .card-bg-image {
          transform: scale(1.04);
        }
      }

      &:focus-visible {
        outline: 3px solid var(--oefa-primary-root, #144AA7);
        outline-offset: 2px;
      }

      /* Variante tema inverso / claro (soft tones) */
      &.theme-light {
        background-color: #FFFFFF;
        border: 1px solid var(--oefa-border-color, #E2E8F0);
        box-shadow: 0 4px 16px rgba(10, 24, 50, 0.06);

        &:hover {
          box-shadow: 0 12px 28px rgba(10, 24, 50, 0.12);
        }

        .card-foreground {
          color: #1D1D1B;
        }

        .card-title {
          color: #0F172A;
          text-shadow: none;
        }

        .card-description {
          color: #475569;
          text-shadow: none;
          font-weight: 500;
        }

        .card-icon-circle {
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
          border: 1.5px solid rgba(255, 255, 255, 0.9);
        }

        &.variant-estrategico {
          border-color: rgba(20, 74, 167, 0.22);
          .card-action {
            color: #144AA7;
            text-shadow: none;
          }
        }

        &.variant-misional {
          border-color: rgba(22, 163, 74, 0.25);
          .card-action {
            color: #15803D;
            text-shadow: none;
          }
        }

        &.variant-apoyo {
          border-color: rgba(234, 88, 12, 0.25);
          .card-action {
            color: #C2410C;
            text-shadow: none;
          }
        }
      }
    }

    /* 1. Imagen de fondo */
    .card-bg-image {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center right;
      z-index: 1;
      transform: scale(1.01);
      transition: transform 0.4s ease;
      pointer-events: none;
    }

    /* 2. Degradado institucional */
    .card-gradient-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      transition: background 0.3s ease;
    }

    /* 3. Contenido en primer plano */
    .card-foreground {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      height: 100%;
      color: #FFFFFF;
      pointer-events: none;
    }

    .card-header-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 14px;
    }

    .card-icon-circle {
      width: 58px;
      height: 58px;
      min-width: 58px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.25);
      flex-shrink: 0;

      .concentric-icon {
        display: block;
      }
    }

    .card-title {
      font-family: var(--oefa-font-display, 'Poppins', sans-serif);
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.15;
      color: #FFFFFF;
      margin: 0;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      white-space: pre-line;
    }

    .card-description {
      font-family: var(--oefa-font-body, 'Inter', sans-serif);
      font-size: 0.9375rem;
      line-height: 1.45;
      color: rgba(255, 255, 255, 0.94);
      margin: 0 0 20px 0;
      max-width: 68%;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    }

    .card-action {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: auto;
      color: #FFFFFF;
      font-family: var(--oefa-font-body, 'Inter', sans-serif);
      font-size: 1.125rem;
      font-weight: 700;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);

      .action-arrow {
        transition: transform 0.2s ease;
      }
    }

    @media (max-width: 768px) {
      .oefa-process-card {
        padding: 22px;
        min-height: 210px;
      }

      .card-title {
        font-size: 1.35rem;
      }

      .card-description {
        max-width: 85%;
        font-size: 0.875rem;
      }
    }
  `]
})
export class OefaProcessCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() actionText: string = 'Explorar';
  @Input() variant: ProcessCardVariant = 'estrategico';
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() bgImage: string = '';
  @Input() icon: string = '';
  @Input() iconBg: string = '';
  @Input() customGradient: string = '';

  @Output() cardClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();

  get defaultGradient(): string {
    if (this.theme === 'light') {
      if (this.bgImage) {
        // Modo claro inverso: Tono pastel sólido a la izquierda y transparente a la derecha para ver la foto
        switch (this.variant) {
          case 'estrategico':
            return 'linear-gradient(90deg, #EEF4FF 0%, #EEF4FF 36%, rgba(238, 244, 255, 0.95) 55%, rgba(238, 244, 255, 0.70) 74%, rgba(238, 244, 255, 0.20) 90%, transparent 100%)';
          case 'misional':
            return 'linear-gradient(90deg, #F0FDF4 0%, #F0FDF4 36%, rgba(240, 253, 244, 0.95) 55%, rgba(240, 253, 244, 0.70) 74%, rgba(240, 253, 244, 0.20) 90%, transparent 100%)';
          case 'apoyo':
            return 'linear-gradient(90deg, #FFF7ED 0%, #FFF7ED 36%, rgba(255, 247, 237, 0.95) 55%, rgba(255, 247, 237, 0.70) 74%, rgba(255, 247, 237, 0.20) 90%, transparent 100%)';
          default:
            return 'linear-gradient(90deg, #EEF4FF 0%, rgba(238, 244, 255, 0.95) 60%, transparent 100%)';
        }
      } else {
        switch (this.variant) {
          case 'estrategico':
            return 'linear-gradient(135deg, #EEF4FF 0%, #E0ECFF 60%, #D1E0FA 100%)';
          case 'misional':
            return 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 60%, #BBF7D0 100%)';
          case 'apoyo':
            return 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 60%, #FED7AA 100%)';
          default:
            return 'linear-gradient(135deg, #F8FAFC 0%, #EEF4FF 100%)';
        }
      }
    }

    if (this.bgImage) {
      // Degradado direccional con foto: sólido a la izquierda para garantizar legibilidad WCAG AAA y transparente a la derecha
      switch (this.variant) {
        case 'estrategico':
          return 'linear-gradient(90deg, #09479E 0%, #0A4FA8 38%, rgba(10, 79, 168, 0.85) 60%, rgba(10, 79, 168, 0.35) 80%, rgba(10, 79, 168, 0.05) 95%, transparent 100%)';
        case 'misional':
          // Verde institucional profundo (WCAG AAA > 8.5:1 sobre texto blanco)
          return 'linear-gradient(90deg, #133910 0%, #1A4D16 38%, rgba(26, 77, 22, 0.88) 60%, rgba(26, 77, 22, 0.35) 80%, rgba(26, 77, 22, 0.05) 95%, transparent 100%)';
        case 'apoyo':
          // Naranja/ámbar profundo institucional (WCAG AAA > 10:1 sobre texto blanco)
          return 'linear-gradient(90deg, #422000 0%, #5E2F00 38%, rgba(94, 47, 0, 0.88) 60%, rgba(94, 47, 0, 0.35) 80%, rgba(94, 47, 0, 0.05) 95%, transparent 100%)';
        default:
          return 'linear-gradient(90deg, #0A4FA8 0%, rgba(10, 79, 168, 0.85) 60%, transparent 100%)';
      }
    } else {
      // Degradado decorativo completo cuando aún no se ha colocado la imagen
      switch (this.variant) {
        case 'estrategico':
          return 'linear-gradient(135deg, #083D87 0%, #0A4FA8 45%, #1565C0 85%, #0284C7 100%)';
        case 'misional':
          // Verde institucional enriquecido
          return 'linear-gradient(135deg, #10300D 0%, #1A4D16 45%, #2D7A27 85%, #52A849 100%)';
        case 'apoyo':
          // Naranja/ámbar institucional enriquecido
          return 'linear-gradient(135deg, #3A1C00 0%, #5E2F00 45%, #8C4700 85%, #B45309 100%)';
        default:
          return 'linear-gradient(135deg, #083D87 0%, #0A4FA8 100%)';
      }
    }
  }

  get defaultIconBg(): string {
    if (this.theme === 'light') {
      switch (this.variant) {
        case 'estrategico':
          return '#144AA7';
        case 'misional':
          return '#15803D';
        case 'apoyo':
          return '#EA580C';
        default:
          return '#144AA7';
      }
    }

    switch (this.variant) {
      case 'estrategico':
        return '#0088FF';
      case 'misional':
        return '#16A34A';
      case 'apoyo':
        return '#EA580C';
      default:
        return '#0088FF';
    }
  }

  onClick(): void {
    this.cardClick.emit();
    this.actionClick.emit();
  }
}
