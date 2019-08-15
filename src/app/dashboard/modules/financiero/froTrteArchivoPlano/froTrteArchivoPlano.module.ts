import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvMedidaCautelarService } from '../../../../services/cvMedidaCautelar.service';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    CvMedidaCautelarService,
    FroTrteSolicitudService,
  ]
})
export class FroTrteArchivoPlanoModule { }
