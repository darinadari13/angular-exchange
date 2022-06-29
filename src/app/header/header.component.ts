import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EXCHANGE_SERVICE_URL } from '../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usdUahRate: string = '';
  eurUahRate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>(`${EXCHANGE_SERVICE_URL}/latest?base=UAH&symbols=USD,EUR`)
      .subscribe((data) => {
        this.usdUahRate = (1 / data.rates.USD).toFixed(2);
        this.eurUahRate = (1 / data.rates.EUR).toFixed(2);
      });
  }
}
