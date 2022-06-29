import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EXCHANGE_SERVICE_URL } from '../constants';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  currencies: string[] = [];
  selectedFromCurrency: string = 'UAH';
  selectedToCurrency: string = 'USD';
  inputValueFrom: number = 0;
  inputValueTo: number = 0;
  exchangeRate: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(`${EXCHANGE_SERVICE_URL}/symbols`).subscribe((data) => {
      this.currencies = Object.keys(data.symbols);
    });
  }

  onFromAmountChange(e: any): void {
    this.inputValueFrom = parseInt(e.target.value);

    this.convertLeftToRight(
      this.selectedFromCurrency,
      this.selectedToCurrency,
      this.inputValueFrom
    );
  }

  onFromCurrencyChange(e: any) {
    this.selectedFromCurrency = e.target.value;

    this.convertLeftToRight(
      this.selectedFromCurrency,
      this.selectedToCurrency,
      this.inputValueFrom
    );
  }

  onToAmountChange(e: any): void {
    this.inputValueTo = parseInt(e.target.value);

    this.convertRightToLeft(
      this.selectedToCurrency,
      this.selectedFromCurrency,
      this.inputValueTo
    );
  }

  onToCurrencyChange(e: any) {
    this.selectedToCurrency = e.target.value;

    this.convertRightToLeft(
      this.selectedToCurrency,
      this.selectedFromCurrency,
      this.inputValueTo
    );
  }

  convertLeftToRight(from: string, to: string, amount: number): void {
    console.log(from, to, amount);

    if (!from || !to || !amount) {
      console.log('do nothing');
      return;
    }

    this.http
      .get<any>(
        `${EXCHANGE_SERVICE_URL}/convert?from=${from}&to=${to}&amount=${amount}`
      )
      .subscribe((data) => {
        this.inputValueTo = data.result;
      });
  }

  convertRightToLeft(from: string, to: string, amount: number): void {
    console.log(from, to, amount);

    if (!from || !to || !amount) {
      console.log('do nothing');
      return;
    }

    this.http
      .get<any>(
        `${EXCHANGE_SERVICE_URL}/convert?from=${from}&to=${to}&amount=${amount}`
      )
      .subscribe((data) => {
        this.inputValueFrom = data.result;
      });
  }
}
