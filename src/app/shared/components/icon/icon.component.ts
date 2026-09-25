import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type OefaIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export const OEFA_ICON_SIZES: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

/**
 * Componente Institucional de Iconografía OEFA.
 * Estándar para renderizar iconos SVG vectoriales con sizing semántico y accesibilidad integrada.
 *
 * @example
 * <oefa-icon name="factory" size="lg" />
 * <oefa-icon name="close" size="sm" color="var(--oefa-primary-root)" />
 * <oefa-icon [size]="28"><svg>...</svg></oefa-icon>
 */
@Component({
  selector: 'oefa-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="oefa-icon-wrapper"
      [style.width.px]="pixelSize()"
      [style.height.px]="pixelSize()"
      [style.color]="color || 'inherit'"
      [attr.aria-hidden]="ariaLabel ? null : ariaHidden"
      [attr.aria-label]="ariaLabel || null"
      [attr.role]="ariaLabel ? 'img' : null"
    >
        @switch (name) {
          @case ('factory') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
              <path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>
            </svg>
          }
          @case ('droplets') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
          }
          @case ('scale') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
              <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
            </svg>
          }
          @case ('leaf') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          }
          @case ('close') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          }
          @case ('x') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          }
          @case ('check') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          }
          @case ('search') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          }
          @case ('alert') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          }
          @case ('info') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
          }
          @case ('chart') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          }
          @case ('plus') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="M12 5v14"/>
            </svg>
          }
          @case ('calendar') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/>
              <line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
          }
          @case ('chevron-down') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          }
          @case ('chevron-right') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          }
          @case ('chevron-left') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          }
          @case ('arrow-left') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          }
          @case ('filter') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
          }
          @case ('kebab') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
            </svg>
          }
          @case ('user') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          }
          @case ('folder') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
            </svg>
          }
          @case ('document') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
            </svg>
          }
          @case ('pickaxe') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="m14 10-8.5 8.5a2.12 2.12 0 1 1-3-3L11 7"/><path d="m15 4 5 5"/><path d="m18 7 3-3"/><path d="m9 12-4-4"/><path d="m20 9-4 4"/>
            </svg>
          }
          @case ('waves') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
            </svg>
          }
          @case ('clipboard-check') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>
            </svg>
          }
          @case ('menu') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          }
          @case ('moon') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          }
          @case ('sun') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
            </svg>
          }
          @case ('bell') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          }
          @case ('download') {
            <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
          }
          @default {
            @if (name) {
              <!-- Fallback cuando no coincide con un icono específico -->
              <svg viewBox="0 0 24 24" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            }
          }
        }
    </span>
  `,
  styleUrls: ['./icon.component.scss']
})
export class OefaIconComponent {
  @Input() name: string = '';
  @Input() size: OefaIconSize = 'md';
  @Input() strokeWidth: number = 2;
  @Input() color?: string;
  @Input() ariaLabel?: string;
  @Input() ariaHidden: boolean = true;

  pixelSize = computed(() => {
    if (typeof this.size === 'number') {
      return this.size;
    }
    return OEFA_ICON_SIZES[this.size] || OEFA_ICON_SIZES.md;
  });
}
