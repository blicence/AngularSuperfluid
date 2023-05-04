import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
 
import { RouterModule } from "@angular/router";
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent     implements AfterViewInit {
 
  @ViewChild('loadingScreen') loadingScreen!: ElementRef;
  constructor(private renderer: Renderer2) {
 
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderer.setStyle(this.loadingScreen.nativeElement, 'display', 'none');
    }, 500);
  }

}


