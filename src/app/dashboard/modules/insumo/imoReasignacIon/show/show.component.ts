import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImoAsignacionService } from '../../../../../services/imoAsignacion.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show-insumo-reasignacion',
  templateUrl: './show.component.html',
  providers: [DatePipe]
})

export class ShowComponent implements OnInit {
@Input() idReasignacion:any = null;
@Output() ready = new EventEmitter<any>();
public errorMessage;

public reasignaciones:any;
public insumoSelected:any;
public table: any = null;
public numero:any;
public funcionario: any = null;

constructor(
  private _AsignacionService: ImoAsignacionService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.funcionario = response.data; 
        } else {
          this.funcionario = null;

          swal({
              title: 'Error!',
              text: 'Usted no tiene permisos para realizar la impresión.',
              type: 'error',
              confirmButtonText: 'Aceptar'
          });
        }
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert('Error en la petición');
            }
        }
      }
    );

    this._AsignacionService.showTrazabilidad(token,this.idReasignacion).subscribe(
      response => {
        this.reasignaciones = response.data;
        let timeoutId = setTimeout(() => {
          this.onInitTable();
          swal.close();
        }, 100);
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onInitTable() {
    if (this.table) {
      this.table.destroy();
    }
    
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
  }

  onPrint(){
    swal({
      title: 'Generando acta!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._AsignacionService.printReasignacion({ 'idTrazabilidad': this.idReasignacion, 'idFuncionario': this.funcionario.id }, token).subscribe((response)=>{     
      var fileURL = URL.createObjectURL(response);
      window.open(fileURL);
      swal.close();
    })
  }
}