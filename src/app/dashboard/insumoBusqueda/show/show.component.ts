import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {RnaLoteInsumoService} from '../../../services/rnaloteInsumos.service';
import {LoginService} from '../../../services/login.service';
import { EmpresaService } from '../../../services/empresa.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { CfgCasoInsumoService } from '../../../services/cfgCasoInsumo.service';
import {RnaInsumoService} from '../../../services/rnaInsumos.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  providers: [DatePipe]
})
export class ShowComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() loteInsumoId:any = null;
public errorMessage;
public respuesta;

constructor(
  private datePipe: DatePipe,
  private _rnaRegistroInsumosService: RnaLoteInsumoService,
  private _loginService: LoginService,
  private _EmpresaService: EmpresaService,
  private _SedeOperativaService: SedeOperativaService,
  private _CasoInsumoService: CfgCasoInsumoService,
  private _RnaInsumoService: RnaInsumoService,
  ){}

  ngOnInit() {
    alert(this.loteInsumoId);
  }
}