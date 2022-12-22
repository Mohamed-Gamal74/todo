import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  light: boolean = false;

  constructor(private _AppService: AppService) {
    this._AppService.light.subscribe((value) => {
      this.light = value;
    });
  }
}
