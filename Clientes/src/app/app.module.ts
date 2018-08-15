import { ListaTelefonesComponent } from './lista-telefones/lista-telefones.component';
import { HomeService } from './home/shared/home.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { FormComponent } from './home/form/form.component';
import { ClienteListComponent } from './home/cliente-list/cliente-list.component';

import { HttpModule } from '@angular/http';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    HomeComponent,
    ClienteListComponent,
    ListaTelefonesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
   
  ],
  providers: [FormBuilder,HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
