import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { BpRegistroCompromisoService } from '../../../../../services/bpRegistroCompromiso.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show-pnalfuncionario',
  templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() funcionario:any = null;
  public errorMessage;

  public table: any = null;

  public horarios: any = null;
  public registro: any = null;

constructor(
  private _FuncionarioService: PnalFuncionarioService,
  private _RegistroCompromisoService: BpRegistroCompromisoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    let token = this._LoginService.getToken();

    this._FuncionarioService.recordTimes(this.funcionario, token).subscribe(
      response => {
        this.horarios = response.data;
        let timeoutId = setTimeout(() => {
          this.onInitTable();
        }, 100);
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    if (this.funcionario.numeroContrato) {
      this._RegistroCompromisoService.searchByNumeroContrato({ 'numero': this.funcionario.numeroContrato }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.registro = response.data;
            
            

            
            swal.close();
          } else {
            this.registro = null;
            
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      );
    }
  }

  onInitTable() {
    $('#dataTables-example').DataTable({
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
    this.table = $('#dataTables-example').DataTable();
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
}