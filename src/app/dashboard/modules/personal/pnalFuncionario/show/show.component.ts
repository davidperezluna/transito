import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
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


constructor(
  private _loginService: LoginService,
  private _FuncionarioService: PnalFuncionarioService,
  ){}

  ngOnInit() {
    let token = this._loginService.getToken();

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
  }

  onInitTable() {
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<<',
          sPrevious: '<',
          sNext: '>',
          sLast: '>>'
        }
      }
    });
    this.table = $('#dataTables-example').DataTable();
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
}