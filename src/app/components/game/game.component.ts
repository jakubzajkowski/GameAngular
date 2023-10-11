import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Root} from "../../services/models/currency.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  public currency! : Root;
  public inputValue : string="";
  public message! : string;
  public correct! : boolean;
  public result: number;
  constructor(private currencyService: CurrencyService) {
    this.result=0
  }

  ngOnInit(): void {
    this.fetchData()
  }
  setInputValue(name: string):void {
    this.inputValue=  name;
  }
  check():void{
    const currencyValue = this.currency.rates[0].bid
    if (currencyValue==parseFloat(this.inputValue)){
      this.message="Good Job You Guess!";
      this.correct=true;
      this.result+=1
    }
    else if (currencyValue<parseFloat(this.inputValue)){
      this.message="Your Value is To High!";
      this.correct=false;
      this.result+=1
    }
    else if (currencyValue>parseFloat(this.inputValue)){
      this.message="Your Value is To Low!";
      this.correct=false;
      this.result+=1
    }
    this.inputValue=""
  }
  getGuessClass() {
    return {
      'correct-guess': this.correct,
      'incorrect-guess': !this.correct
    };
  }
  fetchData(){
    this.currencyService.fetchData().subscribe(value => {
      const data = value
      data.rates[0].bid = Math.round(data.rates[0].bid*100)/100
      this.currency = data
    })
    this.result=0
    this.correct=false
    this.message=""
  }

}
