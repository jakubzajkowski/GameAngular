import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Root} from "./models/currency.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency : Root = {} as Root
  private currencies: string[];
  constructor(private httpClient: HttpClient) {
    this.currencies = ['usd','chf','jpy','aud','cad','cny','eur','gbp']
  }

  fetchData():Observable<Root>{
    const randomCurrency = this.currencies[Math.floor(Math.random()*7)]
    return this.httpClient.get<Root>(`https://api.nbp.pl/api/exchangerates/rates/c/${randomCurrency}/2023-10-11/?format=json`)
  }
  setCurrency(data:Root):void{
    this.currency=data
  }
  getCurrency(): number{
    return this.currency.rates[0].bid
  }
}
