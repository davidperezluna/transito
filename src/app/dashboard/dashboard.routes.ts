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
import { ComparendoRoutes } from './comparendo/comparendo.routes';
import { InfraccionRoutes } from './infraccion/infraccion.routes';
import { CiudadanoRoutes } from './ciudadano/ciudadano.routes';
import { TipoIdentificacionRoutes } from './tipoIdentificacion/tipoIdentificacion.routes';
import { GeneroRoutes } from './genero/genero.routes';
import { GrupoSanguineoRoutes } from './grupoSanguineo/grupoSanguineo.routes';
import { CarroceriaRoutes } from './carroceria/carroceria.routes';
import { ModuloRoutes } from './modulo/modulo.routes';
import { TramiteRoutes } from './tramite/tramite.routes';
import { FacturaRoutes } from './factura/factura.routes';
import { TramiteFacturaRoutes } from './tramiteFactura/tramiteFactura.routes';
import { TramiteSolicitudRoutes } from './tramiteSolicitud/tramiteSolicitud.routes';
import { SustratoRoutes } from './sustrato/sustrato.routes';
import { GestionTransportePublicoRoutes } from './gestionTransportePublico/gestionTransportePublico.routes';
import { TipoDocumentoRoutes } from './tipoDocumento/tipoDocumento.routes';
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
        ...TipoIdentificacionRoutes,
        ...GeneroRoutes,
        ...GrupoSanguineoRoutes,
        ...CuentaRoutes,
        ...ModuloRoutes,
        ...TramiteRoutes,
        ...AlmacenRoutes,
        ...ComparendoRoutes,
        ...InfraccionRoutes,
        ...CarroceriaRoutes,
        ...FacturaRoutes,
        ...TramiteFacturaRoutes,
        ...TramiteSolicitudRoutes,
        ...SustratoRoutes,
        ...GestionTransportePublicoRoutes,
        ...TipoDocumentoRoutes,
        
      ]
    }
];
