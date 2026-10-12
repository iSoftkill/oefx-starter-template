import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  OefaPageLayoutComponent,
  OefaIconComponent,
  OefaTabsComponent,
  OefaTabItem,
  OefaPortalTileComponent,
  OefaButtonComponent,
  ToastService
} from '../../shared';

export interface FeedItem {
  id: string;
  tab: 'eventos' | 'boletines' | 'noticias';
  icon?: string;
  title: string;
  category: string;
  date: string;
  imageTag?: string;
  imageUrl?: string;
}

export interface Colleague {
  id: string;
  name: string;
  area: string;
  initials: string;
  avatarColor?: string;
}

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    OefaPageLayoutComponent,
    OefaIconComponent,
    OefaTabsComponent,
    OefaPortalTileComponent,
    OefaButtonComponent
  ],
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent {
  private toast = inject(ToastService);

  /** Pestañas de Navegación Institucionales OEFA (<oefa-tabs>) */
  portalTabs: OefaTabItem[] = [
    { id: 'eventos', label: 'Eventos, Actividades y comunicados' },
    { id: 'boletines', label: 'Boletines' },
    { id: 'noticias', label: 'Noticias' }
  ];

  activeTab: string = 'eventos';

  feedItems: FeedItem[] = [
    {
      id: 'f-1',
      tab: 'eventos',
      icon: 'video',
      title: 'Revive eventos, capacitaciones y talleres...',
      category: 'Videoteca OEFA',
      date: '01 Ene 2031',
      imageUrl: 'images/intranet_temporal/001a.webp'
    },
    {
      id: 'f-2',
      tab: 'eventos',
      title: 'Transformación digital en el OEFA',
      category: 'OTI - Oficina de Tecnologías de la Información',
      date: '30 Mar 2030',
      imageUrl: 'images/intranet_temporal/002a.webp'
    },
    {
      id: 'f-3',
      tab: 'eventos',
      title: 'Cultura institucional y valores',
      category: 'Cultura institucional y valores',
      date: '01 Ene 2029',
      imageUrl: 'images/intranet_temporal/003a.webp'
    },
    {
      id: 'f-4',
      tab: 'eventos',
      title: 'Igualdad de Oportunidades',
      category: 'Cultura institucional y valores',
      date: '05 Oct 2026',

      imageUrl: 'images/intranet_temporal/001.webp'
    },
    {
      id: 'f-5',
      tab: 'eventos',
      title: '#Efemérides | Día Internacional de la No Violencia',
      category: 'Comunicaciones y Protocolo',
      date: '02 Oct 2026',

      imageUrl: 'images/intranet_temporal/002.webp'
    },
    {
      id: 'f-6',
      tab: 'boletines',
      title: 'Boletín N° 12: Balance Institucional Ambiental 2026',
      category: 'Oficina de Comunicaciones',
      date: '01 Oct 2026',

      imageUrl: 'images/intranet_temporal/003.webp'
    },
    {
      id: 'f-7',
      tab: 'noticias',
      title: 'OEFA fortalece acciones de supervisión directa a nivel nacional',
      category: 'Dirección de Supervisión Ambiental',
      date: '28 Set 2026',

      imageUrl: 'images/intranet_temporal/004.webp'
    }
  ];

  cumpleaneros: Colleague[] = [
    {
      id: 'c-1',
      name: 'Chata Bejar, Gerald Paul Ronny',
      area: 'Dirección de Fiscalización y Aplicación de Incentivos',
      initials: 'CB',
      avatarColor: 'var(--oefa-primary-root, #144AA7)'
    },
    {
      id: 'c-2',
      name: 'Gutierrez Rojas, Carlos Fernando',
      area: 'Subdirección Técnica Científica',
      initials: 'GR',
      avatarColor: 'var(--oefa-primary-40, #1651B6)'
    },
    {
      id: 'c-3',
      name: 'Vasquez Peñaherrera, Jorge Manuel',
      area: 'Coordinación de Supervisión Ambiental en Hidrocarburos',
      initials: 'VP',
      avatarColor: 'var(--oefa-primary-hover, #103D89)'
    }
  ];

  nuevosCompaneros: Colleague[] = [
    {
      id: 'n-1',
      name: 'Ramirez Huiman, Teresa Elisa',
      area: 'Dirección de Supervisión Ambiental en Energía y Minas',
      initials: 'RH',
      avatarColor: 'var(--oefa-secondary-ui-safe, #2C817A)'
    },
    {
      id: 'n-2',
      name: 'Zarate Villanueva, Ursula Ruth',
      area: 'Subdirección de Seguimiento de Entidades de Fiscalización',
      initials: 'ZV',
      avatarColor: 'var(--oefa-secondary-30, #27726C)'
    },
    {
      id: 'n-3',
      name: 'Jimenez Jara, Mariana Andrea',
      area: 'Dirección de Evaluación Ambiental',
      initials: 'JJ',
      avatarColor: 'var(--oefa-secondary-40, #349890)'
    },
    {
      id: 'n-4',
      name: 'Montecinos Atao, Gina Florencia',
      area: 'Subdirección de Políticas e Innovación Ambiental',
      initials: 'MA',
      avatarColor: 'var(--oefa-secondary-ui-safe, #2C817A)'
    }
  ];

  get currentFeedItems(): FeedItem[] {
    const items = this.feedItems.filter(item => item.tab === this.activeTab);
    return items.length ? items : this.feedItems;
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
  }

  onSendGreeting(): void {
    this.toast.success('¡Tu saludo de cumpleaños fue enviado con éxito a tus compañeros!');
  }

  onOpenMoreCompaneros(): void {
    this.toast.info('Cargando directorio completo de nuevos colaboradores...');
  }

  onOpenTile(title: string): void {
    this.toast.info(`Accediendo al servicio: ${title}`);
  }

  onReadMoreFeed(item: FeedItem): void {
    this.toast.info(`Abriendo publicación: ${item.title}`);
  }
}
