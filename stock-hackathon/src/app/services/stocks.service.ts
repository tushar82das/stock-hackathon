import { Injectable } from '@angular/core';
import { IStocks } from '../services/stocks';
import { IPurchedOrder } from './purchedOrders';
import { IUpdatePrice } from './priceUpdate';
import { IConfirmBuy } from './confirmBuy';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StocksService {

    constructor(private _http: HttpClient) {

    }

    getAllStocks(): Observable<IStocks> {

        let url = 'http://10.117.189.147:8087/trading/api/stocks';
        //let headers = new HttpHeaders();
        //headers.append('Content-Type', 'application/json');
        //let params = new HttpParams().set("requestData", JSON.stringify(requesrData));

        return this._http.get<IStocks>(url);
    }

    getAllPurchedOrders(user_id): Observable<IPurchedOrder[]> {

        let url = 'http://10.117.189.147:8087/trading/api/users/' + user_id + '/orders';
        return this._http.get<IPurchedOrder[]>(url);
    }

    getStockUpdatedPrice(stock_id, quantity): Observable<IUpdatePrice> {

        let url = 'http://10.117.189.147:8087/trading/api/stockprice?quantity=' + quantity + '&stockId=' + stock_id;
        return this._http.get<IUpdatePrice>(url);
    }

    confirmAndBuyStock(data): Observable<IConfirmBuy> {

        let url = 'http://10.117.189.147:8087/trading/api/order/save';
        return this._http.post<IConfirmBuy>(url, data);
    }

    /*This Function is to return All the purched order*/
    orderListAllGlobal = new Subject<IPurchedOrder[]>();
    getAllPurchedOrdersGlobal(user_id) {
        this.getAllPurchedOrders(user_id).subscribe(data => {
            this.orderListAllGlobal.next(data);
        })
    }


}