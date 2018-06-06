import { Component, OnInit } from '@angular/core';
import { PingService } from './services/ping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private pingService: PingService) { }

  ngOnInit() {
    this.pingService
      .getPong()
      .subscribe(pong => console.log(pong.data));
  }
}
