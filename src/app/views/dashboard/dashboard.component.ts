import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { OefaBentoKpiTileComponent } from '../../shared/components/bento-kpi-tile/bento-kpi-tile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    OefaButtonComponent,
    OefaPageHeaderComponent,
    OefaBentoKpiTileComponent
  ],
  template: `
    <div class="dashboard-page">
      <app-page-header
        title="Plantilla Base OEFA"
        subtitle="Inicio rápido para nuevos sistemas institucionales con Design System integrado.">
        <div actions>
          <a routerLink="/design-system">
            <app-button variant="primary">
              Ver Catálogo Design System
            </app-button>
          </a>
        </div>
      </app-page-header>

      <div class="grid-kpis">
        <app-bento-kpi-tile
          label="Componentes UI"
          value="30+"
          trendText="Listos para usar"
          trend="neutral">
        </app-bento-kpi-tile>

        <app-bento-kpi-tile
          label="Estándar OEFA"
          value="100%"
          trendText="Accesibilidad & Tokens"
          trend="up">
        </app-bento-kpi-tile>

        <app-bento-kpi-tile
          label="Arquitectura"
          value="Angular 22"
          trendText="Standalone components"
          trend="neutral">
        </app-bento-kpi-tile>
      </div>

      <div class="welcome-card">
        <div class="welcome-content">
          <h2>Bienvenido al Starter Kit</h2>
          <p>
            Esta plantilla está configurada sin dependencias de negocio externas ni llamadas a bases de datos. 
            Puedes comenzar a crear tus modelos, servicios y vistas en <code>src/app/</code>.
          </p>
          <div class="welcome-actions">
            <a routerLink="/design-system/botones">
              <app-button variant="secondary">
                Explorar Componentes
              </app-button>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      padding: var(--space-6, 24px);
      display: flex;
      flex-direction: column;
      gap: var(--space-6, 24px);
    }
    .grid-kpis {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--space-4, 16px);
    }
    .welcome-card {
      background: var(--bg-surface, #ffffff);
      border: 1px solid var(--border-subtle, #e5e7eb);
      border-radius: var(--radius-lg, 12px);
      padding: var(--space-8, 32px);
    }
    .welcome-content h2 {
      margin-top: 0;
      color: var(--text-primary, #111827);
    }
    .welcome-content p {
      color: var(--text-secondary, #4b5563);
      max-width: 650px;
      line-height: 1.6;
    }
    .welcome-actions {
      margin-top: var(--space-6, 24px);
    }
  `]
})
export class DashboardComponent {}
