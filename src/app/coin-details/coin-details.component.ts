import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/Service/Api.service';
import { ChartConfiguration,ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss'],
})
export class CoinDetailsComponent implements OnInit {
  coinData: any;
  coinId!: string;
  days: number = 1;
  currency: string = 'INR';
  public lineChartData: ChartConfiguration['data'] = {
    datasets:[
      {
        data : [],
        label : 'Price Trends',
        backgroundColor : 'rgba(148,159,177,0.2)',
        borderColor : '#00988',
        pointBackgroundColor : '#00988',
        pointBorderColor : '#00988',
        pointHoverBackgroundColor : '#00988',
        pointHoverBorderColor : '#00988'
      }
    ],
    labels : []
  }
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.coinId = params['id']; 
    });
    this.getCoinData();
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((response) => {
      this.coinData = response;
      console.log(response);
    });
  }
}
