import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  showAllText = false;

  constructor() { }

  ngOnInit(): void {
  }

  upscale(img: HTMLElement) {
    img.style.transform = 'scale(1.2)';
  }

  downscale(img: HTMLElement) {
    img.style.transform = 'scale(1)';
  }
}
