import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user/user-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllStockComponent } from './child-component/all-stock.component';
import { PurchasedStockComponent } from './child-component/purchased-stock.component';

import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';

import { UserService } from './user/user.service';
import { StocksService } from './services/stocks.service';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    DashboardComponent,
    AllStockComponent,
    PurchasedStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabViewModule,
    DialogModule
  ],
  providers: [UserService, StocksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
