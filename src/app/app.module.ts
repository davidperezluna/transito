import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DashboardModule } from './dashboard/dashboard.module';

import { Comingsoon1Module } from './comingsoon1/comingsoon1.module';
import { Comingsoon2Module } from './comingsoon2/comingsoon2.module';
import { Comingsoon3Module } from './comingsoon3/comingsoon3.module';

import { LoginModule } from './login/login.module';
import { Login2Module } from './login2/login2.module';
import { Login3Module } from './login3/login3.module';
import { Login4Module } from './login4/login4.module';
import { Login5Module } from './login5/login5.module';
import { Login6Module } from './login6/login6.module';

import { Signup1Module } from './signup/signup.module';
import { Signup2Module } from './signup2/signup2.module';
import { Signup3Module } from './signup3/signup3.module';
import { Signup4Module } from './signup4/signup4.module';
import { Signup5Module } from './signup5/signup5.module';
import { Signup6Module } from './signup6/signup6.module';

import { ResetpasswordModule } from './resetpassword/resetpassword.module';
import { Resetpassword2Module } from './resetpassword2/resetpassword2.module';
import { Resetpassword3Module } from './resetpassword3/resetpassword3.module';
import { Resetpassword4Module } from './resetpassword4/resetpassword4.module';
import { Resetpassword5Module } from './resetpassword5/resetpassword5.module';
import { Resetpassword6Module } from './resetpassword6/resetpassword6.module';

import { LockModule } from './lock/lock.module';
import { Lock2Module } from './lock2/lock2.module';
import { Lock3Module } from './lock3/lock3.module';
import { Lock4Module } from './lock4/lock4.module';
import { Lock5Module } from './lock5/lock5.module';
import { Lock6Module } from './lock6/lock6.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),

    LoginModule,
    Login2Module,
    Login3Module,
    Login4Module,
    Login5Module,
    Login6Module,

    DashboardModule,
    Comingsoon1Module,
    Comingsoon2Module,
    Comingsoon3Module,

    Signup1Module,
    Signup2Module,
    Signup3Module,
    Signup4Module,
    Signup5Module,
    Signup6Module,

    ResetpasswordModule,
    Resetpassword2Module,
    Resetpassword3Module,
    Resetpassword4Module,
    Resetpassword5Module,
    Resetpassword6Module,

    LockModule,
    Lock2Module,
    Lock3Module,
    Lock4Module,
    Lock5Module,
    Lock6Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
