import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from 'src/app/core/base/base.component'; 
import { RouterModule } from '@angular/router';
import { SettingsComponent } from 'src/app/components/settings/settings.component';

@Component({
  selector: 'app-main-layouts',
  standalone: true,
  imports: [CommonModule,SettingsComponent],
  templateUrl: './main-layouts.component.html',
  styleUrls: ['./main-layouts.component.css']
})
export class MainLayoutsComponent extends BaseComponent {
 
  price = 100;
  constructor() {
    super();
  }
}
