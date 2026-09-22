import { Injectable, signal } from '@angular/core';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  badgeVariant?: 'primary' | 'warning' | 'neutral';
  route?: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  readonly activeModule = signal<string>('inicio');
  readonly isCollapsed = signal<boolean>(false);
  readonly isMobileOpen = signal<boolean>(false);

  readonly menuGroups: MenuGroup[] = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Inicio', icon: 'home', route: '/dashboard' }
      ]
    },
    {
      title: 'Design System',
      items: [
        { id: 'ds-colores', label: 'Colores & Tokens', icon: 'palette', route: '/design-system/colores' },
        { id: 'ds-tipografia', label: 'Tipografía', icon: 'type', route: '/design-system/tipografia' },
        { id: 'ds-botones', label: 'Botones & Acciones', icon: 'square-mouse-pointer', route: '/design-system/botones' },
        { id: 'ds-tablas', label: 'Tablas', icon: 'table', route: '/design-system/tablas' },
        { id: 'ds-feedback', label: 'Modales & Toasts', icon: 'bell', route: '/design-system/feedback' }
      ]
    }
  ];

  setActiveModule(id: string) {
    this.activeModule.set(id);
  }

  toggleCollapse() {
    this.isCollapsed.update(v => !v);
  }

  toggleMobile() {
    this.isMobileOpen.update(v => !v);
  }

  closeMobile() {
    this.isMobileOpen.set(false);
  }
}
