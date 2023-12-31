import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvestmentSimulatorComponent } from './investment-simulator/investment-simulator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { CompoundInterestTableComponent } from './compound-interest-table/compound-interest-table.component';
import { TableModule } from 'primeng/table';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MonetaryFormatPipe } from '../app/pipes/monetary-format.pipe';


@NgModule({
  declarations: [
    AppComponent,
    InvestmentSimulatorComponent,
    CompoundInterestTableComponent,
    MonetaryFormatPipe // Adicione o pipe aqui

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule // Adicione o ReactiveFormsModule aqui
        ,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    InputNumberModule,
    TableModule,
    CurrencyMaskModule,
    InputMaskModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
