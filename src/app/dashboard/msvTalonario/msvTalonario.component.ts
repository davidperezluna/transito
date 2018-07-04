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
  @Output() ready = new EventEmitter<any>();
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
  public sedesOperativas: any;
  public sedeOperativaSelected: any;
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
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })

    this._sedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
        this.sedeOperativaSuccess = false;
        this.formN = true;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    /*this._msvTalonarioService.getMsvTalonario().subscribe(
      response => {
        if (response) {

          console.log(response);
          this.msvTalonarios = response.data;
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );*/
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
    this.formNew = false;
    this.formN = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  myFunc() {
    console.log("asd");
  }

  calcularTotal() {
    let ini, fin, total;
    ini = 0;
    fin = 0;
    total = 0;
    ini = this.msvTalonario.rangoini;
    fin = this.msvTalonario.rangofin;
    total = (fin-ini)+1;
    console.log(total);
    if (total<0) {
      total=0;
      
    }
    this.msvTalonario.total = total;

  }

  /*ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formN = false;
      this.formEdit = false;
      this.formIndex = false;
      this.ngOnInit();
    }
  }*/
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


  onEnviar() {
    let token = this._loginService.getToken();
    this.msvTalonario.rangoini = this.msvTalonario.rangoini;
    this.msvTalonario.rangofin = this.msvTalonario.rangofin;
    this.msvTalonario.total = this.msvTalonario.total;
    this.msvTalonario.fechaAsignacion = this.msvTalonario.fechaAsignacion;
    this.msvTalonario.nResolucion = this.msvTalonario.nResolucion;
    this.msvTalonario.sedeOperativaId = this.sedeOperativaSelected;
    this._msvTalonarioService.register(this.msvTalonario, token).subscribe(
      response => {
        //console.log(response);
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha agregado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });
  }


  changedSedeOperativa(e) {

    this.validado = false;
    if (e) {
      let token = this._loginService.getToken();
      this._sedeOperativaService.showSedeOperativa(token, e).subscribe(
        response => {
          this.sedeOperativa = response;
          this.sedeOperativaReady = true;
//          this.msvTalonario.rangoini = this.sedeOperativa.data.
          //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
          console.log(this.sedeOperativa);
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );

      this._msvTalonarioService.showMsvTalonarioPorSedeOperativa(token, e).subscribe(
        response => {
          this.sedeOperativaSuccess = true;
          if (response.status=="success") {
            
            this.msvTalonario = response.data;
            
            this.msvTalonarioReady = true;
            this.msvTalonario.fechaAsignacion = this.msvTalonario.fechaAsignacion;
            
            //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
            console.log(this.msvTalonario);
          }
          else if (response.status=="vacio") {
            this.msvTalonario = new MsvTalonario(0,0,0,"",0,0);
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
  }

}