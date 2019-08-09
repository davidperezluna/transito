import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvIpatService } from '../../../../services/svIpat.service';

import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { SvIpatConsecutivoService } from '../../../../services/svIpatConsecutivo.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { SvCfgGravedadAccidenteService } from '../../../../services/svCfgGravedadAccidente.service';
import { SvIpatConductorService } from '../../../../services/svIpatConductor.services'
import { SvIpatVehiculoService } from '../../../../services/svIpatVehiculo.services'
import { SvIpatVictimaService } from '../../../../services/svIpatVictima.services'
import { SvCfgClaseAccidenteService } from '../../../../services/svCfgClaseAccidente.service';
import { SvCfgClaseChoqueService } from '../../../../services/svCfgClaseChoque.service';
import { SvCfgObjetoFijoService } from '../../../../services/svCfgObjetoFijo.service';
import { SvCfgAreaService } from "../../../../services/svCfgArea.service";
import { SvCfgTipoAreaService } from "../../../../services/svCfgTipoArea.service";
import { SvCfgTipoViaService } from "../../../../services/svCfgTipoVia.service";
import { SvCfgCardinalidadService } from "../../../../services/svCfgCardinalidad.service";
import { SvCfgSectorService } from "../../../../services/svCfgSector.service";
import { SvCfgZonaService } from "../../../../services/svCfgZona.service";
import { SvCfgDisenioService } from "../../../../services/svCfgDisenio.service";
import { SvCfgEstadoTiempoService } from "../../../../services/svCfgEstadoTiempo.service";
import { SvCfgGeometriaService } from "../../../../services/svCfgGeometria.service";
import { SvCfgUtilizacionService } from "../../../../services/svCfgUtilizacion.service";
import { SvCfgCalzadaCarrilService } from "../../../../services/svCfgCalzadaCarril.service";
import { SvCfgMaterialService } from "../../../../services/svCfgMaterial.service";
import { SvCfgEstadoViaService } from "../../../../services/svCfgEstadoVia.service";
import { SvCfgCondicionViaService } from "../../../../services/svCfgCondicionVia.service";
import { SvCfgIluminacionService } from "../../../../services/svCfgIluminacion.service";
import { SvCfgEstadoIluminacionService } from "../../../../services/svCfgEstadoIluminacion.service";
import { SvCfgVisualService } from "../../../../services/svCfgVisual.service";
import { SvCfgVisualDisminuidaService } from "../../../../services/svCfgVisualDisminuida.service";
import { SvCfgResultadoExamenService } from "../../../../services/svCfgResultadoExamen.service";
import { SvCfgGradoExamenService } from "../../../../services/svCfgGradoExamen.service";
import { SvCfgHospitalService } from "../../../../services/svCfgHospital.service";
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
import { SvCfgFallaService } from "../../../../services/svCfgFalla.service";
import { SvCfgLugarImpactoService } from "../../../../services/svCfgLugarImpacto.service";
import { VhloCfgClaseService } from "../../../../services/vhloCfgClase.service";
import { VhloCfgServicioService } from "../../../../services/vhloCfgServicio.service";
import { UserLcCfgCategoriaService } from "../../../../services/userLcCfgCategoria.service";
import { SvCfgHipotesisService } from "../../../../services/svCfgHipotesis.service";
import { SvCfgTipoVictimaService } from "../../../../services/svCfgTipoVictima.service";
import { SvCfgGravedadVictimaService } from "../../../../services/svCfgGravedadVictima.service";
import { SvCfgUnidadReceptoraService } from "../../../../services/svCfgUnidadReceptora.service";

import { UserCfgTipoIdentificacionService } from "../../../../services/userCfgTipoIdentificacion.service";
import { SvCfgNacionalidadService } from "../../../../services/svCfgNacionalidad.service";
import { UserCfgGeneroService } from "../../../../services/userCfgGenero.service";

import { SvCfgAseguradoraService } from '../../../../services/svCfgAseguradora.service';
import { SvCfgControlViaService } from '../../../../services/svCfgControlVia.service';
import { SvCfgEntidadAccidenteService } from '../../../../services/svCfgEntidadAccidente.service';
import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../../services/vhloCfgLinea.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import { VhloCfgModalidadTransporteService } from '../../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { VhloCfgRadioAccionService } from '../../../../services/vhloCfgRadioAccion.service';
import { PqoCfgPatioService } from "../../../../services/pqoCfgPatio.service";

import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ExportComponent } from './export/export.component';
import { SelectModule } from 'angular2-select';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ToolTipModule } from 'angular2-tooltip';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, SortableModule.forRoot(), ToolTipModule],
    declarations: [NewComponent, ShowComponent, ExportComponent],
    
    exports: [NewComponent, ShowComponent, ExportComponent],

    providers: [
        SvIpatService, 
        SvIpatConductorService, 
        SvIpatVehiculoService, 
        SvIpatVictimaService,
        PnalFuncionarioService,
        SvIpatConsecutivoService,
        CfgMunicipioService,
        CfgOrganismoTransitoService,
        SvCfgGravedadAccidenteService,
        SvIpatConductorService,
        SvIpatVehiculoService,
        SvIpatVictimaService,
        SvCfgClaseAccidenteService,
        SvCfgClaseChoqueService,
        SvCfgObjetoFijoService,
        SvCfgAreaService,
        SvCfgTipoAreaService,
        SvCfgTipoViaService,
        SvCfgCardinalidadService,
        SvCfgSectorService,
        SvCfgZonaService,
        SvCfgDisenioService,
        SvCfgEstadoTiempoService,
        SvCfgGeometriaService,
        SvCfgUtilizacionService,
        SvCfgCalzadaCarrilService,
        SvCfgMaterialService,
        SvCfgEstadoViaService,
        SvCfgCondicionViaService,
        SvCfgIluminacionService,
        SvCfgEstadoIluminacionService,
        SvCfgVisualService,
        SvCfgVisualDisminuidaService,
        SvCfgResultadoExamenService,
        SvCfgGradoExamenService,
        SvCfgHospitalService,
        UserEmpresaService,
        SvCfgFallaService,
        SvCfgLugarImpactoService,
        VhloCfgClaseService,
        VhloCfgServicioService,
        UserLcCfgCategoriaService,
        SvCfgHipotesisService,
        SvCfgTipoVictimaService,
        SvCfgGravedadVictimaService,
        SvCfgUnidadReceptoraService,
        UserCfgTipoIdentificacionService,
        SvCfgNacionalidadService,
        UserCfgGeneroService,
        SvCfgAseguradoraService,
        SvCfgControlViaService,
        SvCfgEntidadAccidenteService,
        VhloCfgMarcaService,
        VhloCfgLineaService,
        VhloCfgColorService,
        VhloCfgModalidadTransporteService,
        VhloCfgCarroceriaService,
        VhloCfgRadioAccionService,
        PqoCfgPatioService,
    ]
})

export class SvIpatModule { }
