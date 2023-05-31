import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Service/Api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  bannerData : any = [];
  displayedColumns : string[] = ['symbol','current_price','price_change_percentage_24h','market_cap']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }

  getBannerData() {
    this.api.getTrendingCurrency('INR')
      .subscribe(res => {
        console.log(res);
        this.bannerData = res;
      })
  }

  getAllData(){
    this.api.getAllCurrencyData('INR')
      .subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
