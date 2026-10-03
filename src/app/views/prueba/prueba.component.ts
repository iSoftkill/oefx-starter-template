import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaButtonComponent, OefaCardComponent } from '../../shared';
import { OefaBentoKpiTileComponent } from '../../shared';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent, OefaBentoKpiTileComponent, OefaCardComponent],
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
})
export class PruebaComponent {
  
}
