import { Component, OnInit } from '@angular/core';
import { StocksService } from '../services/stocks.service';
import { IStockData } from '../services/stockData';

@Component({
  selector: 'app-all-stock',
  templateUrl: './all-stock.component.html',
  styleUrls: ['./all-stock.component.css']
})
export class AllStockComponent implements OnInit {

  userDetail;

  displayBuyDialog: boolean = false;
  isClickedGetLatestPrice: boolean = false;
  isSuccessGetLatestPrice: boolean = false;
  isDisableGetLatest: boolean = false;
  isSuccessOrder: boolean = false;

  selected_stockId: number = 0;
  selected_stockName: string = '';
  selected_stockPrice: number = 0;
  selected_quantity: number = 1;
  selected_total: number = 0;

  stocks: IStockData[]

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.initGetUserDetail();
    this.initGetAllStocks(); /*Initialize initGetAllStocks function */
  }

  /*This function is to get logged in user info*/
  initGetUserDetail() {
    if (typeof (Storage) !== "undefined") {
      this.userDetail = JSON.parse(localStorage.getItem("user"));
    }
  }

  /*This function is used to get all the Stocks from server*/
  initGetAllStocks() {
    this.stocksService.getAllStocks().subscribe(data => {
      console.log(data);
      this.stocks = data.data;
      console.log(this.stocks);
    })
  }

  /*This function is to show Dialod with stock detail*/
  showDialog(stock_id, stock_name, stock_price) {
    this.isSuccessOrder = false;
    this.isDisableGetLatest = false;
    this.isClickedGetLatestPrice = false;
    this.isSuccessGetLatestPrice = false;
    this.displayBuyDialog = true;
    this.selected_stockId = stock_id;
    this.selected_stockName = stock_name;
    this.selected_stockPrice = stock_price;
    this.selected_quantity = 1;
    this.selected_total = stock_price;
  }

  /*This Function is used to close the pop up dialog*/
  closeDialog() {
    this.displayBuyDialog = false;
  }

  /*This function is used to update the unit price and total price if price updated*/
  getLatestPrice() {
    this.isDisableGetLatest = true;

    this.stocksService.getStockUpdatedPrice(this.selected_stockId, this.selected_quantity).subscribe(data => {
      if (data != null && data != undefined) {
        this.selected_stockPrice = data.unitPrice;
        this.selected_total = data.totalPrice;

        this.isDisableGetLatest = false;
        this.isClickedGetLatestPrice = true;
        this.isSuccessGetLatestPrice = true;

        setTimeout(() => {
          this.isSuccessGetLatestPrice = false;
        }, 1000);

      }
    });
  }

  confirmBuy() {
    let data = {
      "userId": this.userDetail.userId,
      "stockId": this.selected_stockId,
      "quantity": this.selected_quantity,
      "totalPrice": this.selected_total,
      "unitPrice": this.selected_stockPrice
    };
    this.stocksService.confirmAndBuyStock(data).subscribe(data => {
      if (data != null && data != undefined) {
        console.log(data);
        this.isSuccessOrder = true;
        this.stocksService.getAllPurchedOrdersGlobal(this.userDetail.userId);
      }
    });
  }

  /*This function is to update total price based on the unit peice change*/
  changeUnitPrice(event) {
    this.isClickedGetLatestPrice = false;
    let quantity = event.target.value;
    this.selected_total = (this.selected_stockPrice * quantity);
  }

}
