import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/Service/Api.service';
import { ChartConfiguration,ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from 'src/Service/currency.service';

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
        borderColor : '#009688',
        pointBackgroundColor : '#009688',
        pointBorderColor : '#009688',
        pointHoverBackgroundColor : '#009688',
        pointHoverBorderColor : '#009688'
      }
    ],
    labels : []
  }
  public lineChartOptions: ChartConfiguration['options'] = {
    elements : {
      point : {
        radius : 1
      
      }
    },
    plugins : {
      legend : {
        display : true
      },
    }
  }
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;
  constructor(private api: ApiService, private route: ActivatedRoute,private currencyService : CurrencyService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.coinId = params['id']; 
    });
    this.getCoinData();
    this.getGraphData(this.days);
    this.currencyService.getCurrency()
      .subscribe(data => {
        this.currency = data;
        this.getGraphData(this.days);
        this.getCoinData();
      })
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((response) => {
      console.log(this.coinData);
      if(this.currency === 'USD'){
        response.market_data.current_price.inr = response.market_data.current_price.usd
        response.market_data.market_cap.inr = response.market_data.market_cap.usd
      }
      response.market_data.current_price.inr = response.market_data.current_price.inr
      response.market_data.market_cap.inr = response.market_data.market_cap.inr
      this.coinData = response;
    });
  }
  getGraphData(days: number){
    this.days = days;   
    this.api.getGraphicalCurrencyData(this.coinId,this.currency,this.days)
      .subscribe(res => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        },200);
        this.lineChartData.datasets[0].data = res.prices
          .map((x : any) => {
            return x[1];
          });
          this.lineChartData.labels = res.prices
            .map((x : any)=>{
              let date = new Date(x[0]);
              let time = date.getHours() > 12 ? 
              `${date.getHours() - 12} : ${date.getMinutes()} PM`  : 
              `${date.getHours()} : ${date.getMinutes()} : AM`
            return this.days === 1 ? time : date.toLocaleDateString();
      });
    })
  }
}
