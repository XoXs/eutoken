import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenModule } from './token/token.module';
import { Web3Service } from './providers/token.web3.service';
import { TokenRoutingModule } from './token/token-routing.module';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TokenModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatMenuModule


  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }


export class PizzaPartyAppModule { }

