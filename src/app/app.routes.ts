import { Routes } from '@angular/router';

// empieza la carga del front end
import { ParametrizacionRoutes } from './frontend/parametrizacion/parametrizacion.routes';

import { LoginRoutes } from './frontend/login/login.routes';
import { Login2Routes } from './login2/login2.routes';
import { Login3Routes } from './login3/login3.routes';
import { Login4Routes } from './login4/login4.routes';
import { Login5Routes } from './login5/login5.routes';
import { Login6Routes } from './login6/login6.routes';

import { DashboardRoutes } from './dashboard/dashboard.routes';
import { Comingsoon1Routes } from './comingsoon1/comingsoon1.routes';
import { Comingsoon2Routes } from './comingsoon2/comingsoon2.routes';
import { Comingsoon3Routes } from './comingsoon3/comingsoon3.routes';

import { SignupRoutes } from './signup/signup.routes';
import { Signup2Routes } from './signup2/signup2.routes';
import { Signup3Routes } from './signup3/signup3.routes';
import { Signup4Routes } from './signup4/signup4.routes';
import { Signup5Routes } from './signup5/signup5.routes';
import { Signup6Routes } from './signup6/signup6.routes';

import { ResetpasswordRoutes } from './resetpassword/resetpassword.routes';
import { Resetpassword2Routes } from './resetpassword2/resetpassword2.routes';
import { Resetpassword3Routes } from './resetpassword3/resetpassword3.routes';
import { Resetpassword4Routes } from './resetpassword4/resetpassword4.routes';
import { Resetpassword5Routes } from './resetpassword5/resetpassword5.routes';
import { Resetpassword6Routes } from './resetpassword6/resetpassword6.routes';

import { LockRoutes } from './lock/lock.routes';
import { Lock2Routes } from './lock2/lock2.routes';
import { Lock3Routes } from './lock3/lock3.routes';
import { Lock4Routes } from './lock4/lock4.routes';
import { Lock5Routes } from './lock5/lock5.routes';
import { Lock6Routes } from './lock6/lock6.routes';

import { LoginComponent } from './frontend/login/index';

export const routes: Routes = [
  ...LoginRoutes,
  ...Login2Routes,
  ...Login3Routes,
  ...Login4Routes,
  ...Login5Routes,
  ...Login6Routes,
  ...DashboardRoutes, 
  ...Comingsoon1Routes,
  ...Comingsoon2Routes,
  ...Comingsoon3Routes,
  ...SignupRoutes,
  ...Signup2Routes,
  ...Signup3Routes,
  ...Signup4Routes,
  ...Signup5Routes,
  ...Signup6Routes,
  ...ResetpasswordRoutes,
  ...Resetpassword2Routes,
  ...Resetpassword3Routes,
  ...Resetpassword4Routes,
  ...Resetpassword5Routes,
  ...Resetpassword6Routes,
  ...LockRoutes,
  ...Lock2Routes,
  ...Lock3Routes,
  ...Lock4Routes,
  ...Lock5Routes,
  ...Lock6Routes,
  //empieza la carga del front end 
  ...ParametrizacionRoutes,

  // {
  //   path: '**',
  //   component: LoginComponent
  //  }
];
