import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiService } from './demo/service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [
    MiService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'viaandina-app';

  schedules: any = [];

  constructor(private miService: MiService) {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes():void {
    this.miService.getData()
      .subscribe(data => {
        console.log(data);
        this.schedules = data;
      })
  }
  
}
