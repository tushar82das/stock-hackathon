import { Component, OnInit } from '@angular/core';
import { IPurchedOrder } from '../services/purchedOrders';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-purchased-stock',
  templateUrl: './purchased-stock.component.html',
  styleUrls: ['./purchased-stock.component.css']
})
export class PurchasedStockComponent implements OnInit {

  userDetail;
  orders: IPurchedOrder[];

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.initGetUserDetail();
    this.initGetALlpurchedStocks(this.userDetail.userId);
  }

  /*This function is to get logged in user info*/
  initGetUserDetail() {
    if (typeof (Storage) !== "undefined") {
      this.userDetail = JSON.parse(localStorage.getItem("user"));
    }
  }

  initGetALlpurchedStocks(user_id) {
    this.stocksService.getAllPurchedOrdersGlobal(user_id);
    this.stocksService.orderListAllGlobal.subscribe(data => {
      this.orders = data;
    })
  }

}
