import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

 
import {Observable, Subscription} from 'rxjs';
import { TailwindColor, TailwindColorPalette } from 'src/app/core/interfaces/tailwind-colors.interface';

import { BaseComponent } from '../../core/base/base.component';
const twColors: TailwindColorPalette = require('tailwindcss/colors');
@Component({
	standalone: true,
	imports: [CommonModule ],
	selector: 'custom-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
	colorSub!: Subscription;
	isDarkTheme!: Observable<boolean>;
	colorsOpen = false;
	loaded = false;
	colors: TailwindColor[] = [];
	selectedColor: TailwindColor= {name: 'violet', shades: twColors['Shades']};

	constructor( ) {
		super();
	}

	ngOnInit(): void {
		this.isDarkTheme = this.themeService.getDarkTheme();
		this.colors = this.colorService.getAllColors();
		this.colorSub = this.colorService.getCurrentColor().subscribe((color: TailwindColor) => {
			this.selectedColor = color;
		});
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.loaded = true;
		}, 300);
	}

	changeColor(color: TailwindColor): void {
	 
		this.colorService.setCurrentColor(color);
	}

	toggleDarkTheme(dark: boolean): void {
	 
		this.themeService.setDarkTheme(dark);
	}

	toggleColors(): void {
		this.colorsOpen = !this.colorsOpen;
	}

 
}
