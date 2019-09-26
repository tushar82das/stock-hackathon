import { IStockData } from '../services/stockData';
export interface IStocks {
    "statusCode": number,
    "status": string,
    "message": string,
    "data": IStockData[]
}