import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvTalonarioService } from '../../services/msvTalonario.service';
import { LoginService } from '../../services/login.service';
import { SedeOperativaService } from '../../services/sedeOperativa.service';
import swal from 'sweetalert2';
import { MsvTalonario } from './msvTalonario.modelo';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvTalonario.component.html'
})
export class MsvTalonarioComponent implements OnInit {
 // @Output() ready = new EventEmitter<any>();
  public errorMessage;
  public id;
  public respuesta;
  public msvTalonarios;
  public formNew = false;
  public formN = false;
  public formEdit = false;
  public comparendoForm = false;
  public formIndex = true;
  public table: any = null;
  public msvTalonario: MsvTalonario;
  public sedeOperativaSuccess = false;
  public validado = false;
  public sedeOperativaReady = false;
  public msvTalonarioReady = false;
  public sedeOperativa: any;

  constructor(
    private _msvTalonarioService: MsvTalonarioService,
    private _loginService: LoginService,
    private _sedeOperativaService: SedeOperativaService,
  ) { }

  ngOnInit() {
    this.msvTalonario = new MsvTalonario(null, null, null, null,  null, null);
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });


    this._msvTalonarioService.index().subscribe(
      response => {
        if (response) {
          this.msvTalonarios = response.data;
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
          swal.close();
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  iniciarTabla() {
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
  
  onNew() {
    this.formNew = true;
    this.formN = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formN = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  deleteMsvTalonario(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._msvTalonarioService.deleteMsvTalonario(token, id).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonColor: '#15d4be',
            })
            this.table.destroy();
            this.respuesta = response;
            this.ngOnInit();
          },
          error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );


      }
    })
  }

  editMsvTalonario(msvTalonario: any) {    
    this.msvTalonario = msvTalonario;
    this.formEdit = true;
    this.formIndex = false;
  }

}