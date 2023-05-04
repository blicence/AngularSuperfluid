import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from 'src/app/core/base/base.component';
import { MainLayoutsComponent } from 'src/app/layouts/main-layouts/main-layouts.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MainLayoutsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends  BaseComponent {
	isDarkTheme!: Observable<boolean>;

  constructor() {
    super();
  }
  ngOnInit(): void { 
		this.isDarkTheme = this.themeService.getDarkTheme();
	}

	toggleDarkTheme(dark: boolean): void {
		this.themeService.setDarkTheme(dark);
	}
}