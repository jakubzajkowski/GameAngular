import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Root} from "../../services/models/currency.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{

  constructor(private currencyService: CurrencyService) {

  }

  ngOnInit() {
      this.currencyService.fetchData().subscribe(value => this.currencyService.setCurrency(value))
  }

  getCurrency() : number{
    return this.currencyService.getCurrency()
  }

}
