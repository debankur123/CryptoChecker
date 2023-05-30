import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Service/Api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  getBannerData() {}
}
