import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { 
  OefaButtonComponent, 
  OefaIconComponent, 
  OefaChipComponent, 
  OefaStatusBadgeComponent,
  OefaEmptyStateComponent,
  OefaBentoKpiTileComponent,
  OefaCatalogCardComponent,
  OefaFilterSidebarComponent,
  OefaProcessCardComponent,
  FilterOption,
  FilterGroupItem,
  FilterStatusOption
} from '../../shared';

export interface TableroItem {
  id: string;
  title: string;
  description: string;
  category: string;
  process: 'Estratégico' | 'Misional' | 'Apoyo';
  tags: string[];
  icon: string;
  featured?: boolean;
}

@Component({
  selector: 'app-pin-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    OefaButtonComponent,
    OefaIconComponent,
    OefaChipComponent,
    OefaStatusBadgeComponent,
    OefaEmptyStateComponent,
    OefaCatalogCardComponent,
    OefaFilterSidebarComponent,
    OefaProcessCardComponent
  ],
  templateUrl: './pin-demo.component.html',
  styleUrl: './pin-demo.component.scss'
})
export class PinDemoComponent {
  // Navigation active tab: 'inicio' | 'tableros' | 'acerca-de'
  currentTab = signal<'inicio' | 'tableros' | 'acerca-de'>('inicio');

  // Search queries
  searchQuery = signal<string>('');
  selectedProcessFilter = signal<string>('todos');
  selectedCategoryFilter = signal<string>('todas');

  // Mobile drawer filter toggle
  isMobileFilterOpen = signal<boolean>(false);

  // Special toggles
  onlyFeatured = signal<boolean>(false);
  onlyPlanefa = signal<boolean>(false);

  // Theme mode demo
  isDarkMode = signal<boolean>(false);

  // Process filter status options for Filter Sidebar
  processOptions: FilterStatusOption[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'Estratégico', label: 'Estratégico' },
    { value: 'Misional', label: 'Misional' },
    { value: 'Apoyo', label: 'Apoyo' }
  ];

  // Faceted filter groups for Filter Sidebar
  filterGroups = signal<FilterGroupItem[]>([
    {
      label: 'Dirección / Categoría',
      open: true,
      options: [
        { label: 'EVALUACIÓN', count: 1, checked: false },
        { label: 'SUPERVISIÓN', count: 2, checked: false },
        { label: 'FISCALIZACIÓN', count: 1, checked: false },
        { label: 'PLANEFA', count: 1, checked: false },
        { label: 'SMER', count: 1, checked: false },
        { label: 'TRANSVERSAL', count: 1, checked: false },
        { label: 'PCD', count: 1, checked: false }
      ]
    },
    {
      label: 'Etiquetas / Temas',
      open: true,
      options: [
        { label: 'Consulta general', count: 4, checked: false },
        { label: 'Supervisión', count: 2, checked: false },
        { label: 'Evaluación', count: 1, checked: false },
        { label: 'Fiscalización', count: 1, checked: false },
        { label: 'PLANEFA', count: 2, checked: false },
        { label: 'Sancionador', count: 1, checked: false },
        { label: 'Compromisos', count: 1, checked: false }
      ]
    }
  ]);

  // Tableros counts per process
  estrategicosCount = computed(() => this.tableros.filter(t => t.process === 'Estratégico').length);
  misionalesCount = computed(() => this.tableros.filter(t => t.process === 'Misional').length);
  apoyoCount = computed(() => this.tableros.filter(t => t.process === 'Apoyo').length);

  // Active filters count
  activeFilterCount = computed(() => {
    let count = 0;
    if (this.selectedProcessFilter() !== 'todos') count++;
    if (this.selectedCategoryFilter() !== 'todas') count++;
    if (this.onlyFeatured()) count++;
    if (this.onlyPlanefa()) count++;
    this.filterGroups().forEach((g: FilterGroupItem) => {
      count += g.options.filter((o: FilterOption) => o.checked).length;
    });
    return count;
  });

  // Tableros mock database
  tableros: TableroItem[] = [
    {
      id: 'deam-planefa',
      title: 'DEAM Seguimiento metas Planefa',
      description: 'Dashboard del detalle de la ejecución de los informes y reportes de la Dirección de Evaluación Ambiental.',
      category: 'EVALUACIÓN',
      process: 'Misional',
      tags: ['Evaluación', 'Consulta general'],
      icon: 'file-text',
      featured: true
    },
    {
      id: 'ds-odes-planefa',
      title: 'DS/ODES Seguimiento metas Planefa',
      description: 'Dashboard del detalle de la ejecución de las estrategias de promoción de cumplimiento de supervisiones.',
      category: 'SUPERVISIÓN',
      process: 'Misional',
      tags: ['Supervisión', 'Consulta general'],
      icon: 'shield-check',
      featured: true
    },
    {
      id: 'smer-planefa',
      title: 'SMER Seguimiento metas Planefa',
      description: 'Dashboard del detalle de la ejecución de las mejoras regulatorias publicadas por la Subdirección SMER.',
      category: 'SMER',
      process: 'Misional',
      tags: ['SMER', 'Consulta general'],
      icon: 'activity',
      featured: true
    },
    {
      id: 'reporte-ejecucion-planefa',
      title: 'Reporte: Ejecución de metas Planefa',
      description: 'Dashboard de la ejecución mensual de las metas Planefa de todas las direcciones y oficinas descentralizadas.',
      category: 'TRANSVERSAL',
      process: 'Estratégico',
      tags: ['Transversal', 'Consulta general'],
      icon: 'layers',
      featured: true
    },
    {
      id: 'fiscalizacion-sector',
      title: 'Fiscalización por sector económico',
      description: 'Indicadores agregados de fiscalización ambiental por actividad: minería, energía, pesquería e industria.',
      category: 'FISCALIZACIÓN',
      process: 'Misional',
      tags: ['Fiscalización', 'SEFA'],
      icon: 'bar-chart-2',
      featured: false
    },
    {
      id: 'supervision-ambiental',
      title: 'Supervisión ambiental y compromisos',
      description: 'Resultados de acciones de supervisión directa y estado de cumplimiento de compromisos ambientales.',
      category: 'SUPERVISIÓN',
      process: 'Misional',
      tags: ['Supervisión', 'Compromisos'],
      icon: 'check-circle',
      featured: false
    },
    {
      id: 'expedientes-concluidos',
      title: 'Expedientes concluidos y resoluciones',
      description: 'Seguimiento de expedientes sancionadores, recursos impugnatorios y estado final de resoluciones.',
      category: 'PCD',
      process: 'Apoyo',
      tags: ['Legal', 'Sancionador'],
      icon: 'folder',
      featured: false
    },
    {
      id: 'planefa-nacional',
      title: 'PLANEFA Nacional Consolidado',
      description: 'Seguimiento del plan anual de evaluación y fiscalización ambiental a nivel de todas las EFA del país.',
      category: 'PLANEFA',
      process: 'Estratégico',
      tags: ['PLANEFA', 'EFA'],
      icon: 'compass',
      featured: false
    }
  ];

  categories = [
    { id: 'todas', label: 'Todas las categorías', count: 36 },
    { id: 'EVALUACIÓN', label: 'EVALUACIÓN', count: 12 },
    { id: 'SUPERVISIÓN', label: 'SUPERVISIÓN', count: 14 },
    { id: 'FISCALIZACIÓN', label: 'FISCALIZACIÓN', count: 8 },
    { id: 'PLANEFA', label: 'PLANEFA', count: 14 },
    { id: 'SISEFA', label: 'SISEFA', count: 11 },
    { id: 'SMER', label: 'SMER', count: 2 },
    { id: 'TRANSVERSAL', label: 'TRANSVERSAL', count: 5 }
  ];

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }

  setTab(tab: 'inicio' | 'tableros' | 'acerca-de') {
    this.currentTab.set(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterByCategory(catId: string) {
    this.selectedCategoryFilter.set(catId);
  }

  filterByProcess(proc: string) {
    this.selectedProcessFilter.set(proc);
  }

  toggleFilterGroup(index: number): void {
    this.filterGroups.update(groups =>
      groups.map((g, i) => i === index ? { ...g, open: !g.open } : g)
    );
  }

  toggleFilterOption(event: { groupIndex: number; optionIndex: number; checked: boolean }): void {
    this.filterGroups.update((groups: FilterGroupItem[]) =>
      groups.map((g: FilterGroupItem, gi: number) => {
        if (gi !== event.groupIndex) return g;
        const newOpts = g.options.map((opt: FilterOption, oi: number) =>
          oi === event.optionIndex ? { ...opt, checked: event.checked } : opt
        );
        return { ...g, options: newOpts };
      })
    );
  }

  clearAllFilters(): void {
    this.selectedProcessFilter.set('todos');
    this.selectedCategoryFilter.set('todas');
    this.searchQuery.set('');
    this.onlyFeatured.set(false);
    this.onlyPlanefa.set(false);
    this.filterGroups.update((groups: FilterGroupItem[]) =>
      groups.map((g: FilterGroupItem) => ({
        ...g,
        options: g.options.map((o: FilterOption) => ({ ...o, checked: false }))
      }))
    );
  }

  get filteredTableros(): TableroItem[] {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategoryFilter();
    const proc = this.selectedProcessFilter();
    const featuredOnly = this.onlyFeatured();
    const planefaOnly = this.onlyPlanefa();

    // Check facet checkboxes
    const groups = this.filterGroups();
    const selectedCats = groups[0]?.options.filter((o: FilterOption) => o.checked).map((o: FilterOption) => o.label.toLowerCase()) || [];
    const selectedTags = groups[1]?.options.filter((o: FilterOption) => o.checked).map((o: FilterOption) => o.label.toLowerCase()) || [];

    return this.tableros.filter(t => {
      const matchQuery = !q || 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q));

      const matchCatPill = cat === 'todas' || t.category === cat;
      const matchProc = proc === 'todos' || t.process === proc;
      const matchFeatured = !featuredOnly || !!t.featured;
      const matchPlanefa = !planefaOnly || t.title.toLowerCase().includes('planefa') || t.tags.some(tag => tag.toLowerCase().includes('planefa'));

      const matchCatCheck = selectedCats.length === 0 || selectedCats.includes(t.category.toLowerCase());
      const matchTagCheck = selectedTags.length === 0 || t.tags.some(tag => selectedTags.includes(tag.toLowerCase()));

      return matchQuery && matchCatPill && matchProc && matchFeatured && matchPlanefa && matchCatCheck && matchTagCheck;
    });
  }

  get featuredTableros(): TableroItem[] {
    return this.tableros.filter(t => t.featured);
  }
}

