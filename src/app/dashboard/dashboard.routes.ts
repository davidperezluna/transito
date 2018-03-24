import { Route } from '@angular/router';

import { HomeRoutes } from './home/home.routes';
import { VehiculoRoutes } from './vehiculo/vehiculo.routes';
import { MarcaRoutes } from './marca/marca.routes';
import { LineaRoutes } from './linea/linea.routes';
import { BancoRoutes } from './banco/banco.routes';
import { ClaseRoutes } from './clase/clase.routes';
import { ColorRoutes } from './color/color.routes';
import { DepartamentoRoutes } from './departamento/departamento.routes';
import { CombustibleRoutes } from './combustible/combustible.routes';
import { ConsumibleRoutes } from './consumible/consumible.routes';
import { ModalidadRoutes } from './modalidad/modalidad.routes';
import { MunicipioRoutes } from './municipio/municipio.routes';
import { CuentaRoutes } from './cuenta/cuenta.routes';
import { OrganismoTransitoRoutes } from './organismoTransito/organismoTransito.routes';
import { ServicioRoutes } from './servicio/servicio.routes';
import { AlmacenRoutes } from './almacen/almacen.routes';
import { CiudadanoRoutes } from './ciudadano/ciudadano.routes';
import { ModuloRoutes } from './modulo/modulo.routes';
import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        ...HomeRoutes,
        ...VehiculoRoutes,
        ...MarcaRoutes, 
        ...LineaRoutes,
        ...BancoRoutes,
        ...ClaseRoutes, 
        ...ColorRoutes,
        ...DepartamentoRoutes,
        ...CombustibleRoutes,
        ...ConsumibleRoutes,
        ...ModalidadRoutes,
        ...MunicipioRoutes,
        ...OrganismoTransitoRoutes,
        ...ServicioRoutes,
        ...CiudadanoRoutes,
        ...CuentaRoutes,
        ...ModuloRoutes,
        ...AlmacenRoutes,

      ]
    }
];
