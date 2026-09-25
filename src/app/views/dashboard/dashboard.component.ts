import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { OefaBentoKpiTileComponent } from '../../shared/components/bento-kpi-tile/bento-kpi-tile.component';
import { OefaIconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import { OefaKpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    OefaButtonComponent,
    OefaPageHeaderComponent,
    OefaBentoKpiTileComponent,
    OefaIconButtonComponent,
    OefaKpiCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  onSelectTile(title: string): void {
    console.log('Titulo al clic', title);
  }
}
