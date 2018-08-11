import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvSenialService } from '../../services/msvSenial.service';
import { LoginService } from '../../services/login.service';

 import { CfgTipoDestinoService } from '../../services/cfgTipoDestino.service';
 import { CfgBodegaService } from '../../services/cfgBodega.service';
 import { MunicipioService } from '../../services/municipio.service';
 import { CfgTipoSenialService } from '../../services/cfgTipoSenial.service';
 //import { MsvInventarioSenialService } from '../../services/msvInventarioSenial.service'

 import { MsvSenial } from './msvSenial.modelo';

//import { SedeOperativaService } from '../../services/sedeOperativa.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvSenial.component.html'
})

export class MsvSenialComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public errorMessage;
  //public id;
  public respuesta;
  public msvSenials;
  public formNew = false;
  //public formN = false;
  //public formEdit = false;
  //public comparendoForm = false;
  public formIndex = false;

    public formSearch = true;
    public formAdd = false;

  public table: any = null;

    public tiposDestino: any;
    public destino: any;
    public senal: any;
    public msvSenial: MsvSenial;
    public destinoSelected: any;
    public tipoDestinoSelected: any;
    public tipoSenalSelected: any;
    public senalSelected: any;
    public senales: any;
    private build : any;
    public file: any;
    public senalesPorAsignar: any;
    public datos = {
        'destinoId' : null,
        'tipoDestinoId' : null,
        'tipoSenalId' : null
    }

  //public sedesOperativas: any;
  //public sedeOperativaSelected: any;
  //public sedeOperativaSuccess = false;
  //public validado = false;
  //public sedeOperativaReady = false;
  //public msvSenialReady = false;
  //public sedeOperativa: any;

  constructor(
      private _msvSenialService: MsvSenialService,
      private _loginService: LoginService,

       private _cfgTipoDestinoService : CfgTipoDestinoService,
       private _cfgBodegaService : CfgBodegaService,
       private _municipioService : MunicipioService,
       private _cfgTipoSenialService : CfgTipoSenialService,
       //private _msvInventarioSenialService: MsvInventarioSenialService,

      //private _sedeOperativaService: SedeOperativaService,
  ) { this.senalSelected = ""; this.build = {}; }

  ngOnInit() {
    this.msvSenial = new MsvSenial(null, null, null, null);

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
    });

      this._cfgTipoDestinoService.select().subscribe(
              response => {
              this.tiposDestino = response;
          },
              error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert('Error en la petición');
              }
          }
      );

      this._cfgTipoSenialService.select().subscribe(
              response => {
              this.senal = response;
          },
              error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert('Error en la petición');
              }
          }
      );

    /*this._sedeOperativaService.getSedeOperativaSelect().subscribe(
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
    );*/
    this._msvSenialService.getMsvSenial().subscribe(
            response => {
          if (response) {

            console.log(response);
            this.msvSenials = response.data;
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
    );
  }

    obtieneDestino(value) {

        switch (value) {
            case 1:

                this._cfgBodegaService.select().subscribe(
                        response => {
                        this.destino = response;
                    },
                        error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );

                break;
            case 2:

                this._municipioService.getMunicipioSelect().subscribe(
                        response => {
                        this.destino = response;
                    },
                        error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );

                break;
        }

    }

    search(){
        var radios = document.getElementsByName('tipoDestino');

        for (var i in radios){
            for(var item in radios[i]){
                if(typeof radios[i]['checked'] !== 'undefined') {
                    if (radios[i]['checked']) {
                        this.tipoDestinoSelected = radios[i]['value'];
                    }
                }
            }
        }

        var radios = document.getElementsByName('senal');

        for (var i in radios){
            for(var item in radios[i]){
                if(typeof radios[i]['checked'] !== 'undefined') {
                    if (radios[i]['checked']) {
                        this.tipoSenalSelected = radios[i]['value'];
                    }
                }
            }
        }

        this.datos.destinoId = this.destinoSelected;
        this.datos.tipoDestinoId = this.tipoDestinoSelected;
        this.datos.tipoSenalId = this.tipoSenalSelected;

        let token = this._loginService.getToken();
        this._msvSenialService.searchByParametros(this.datos,token).subscribe(
                response => {
                this.respuesta = response;
                if(this.respuesta.status == 'success'){
                    this.senales = response.data;
                    //this.iniciarTabla();
                    this.formSearch = false;
                    this.formIndex = true;

                    swal({
                        title: 'Perfecto',
                        text: "¡Señales encontradas!",
                        type: 'info',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> OK!',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="fa fa-thumbs-down"></i>',
                        cancelButtonAriaLabel: 'Thumbs down',
                    });
                }else{
                    swal({
                        title: 'Alerta',
                        text: "¡No existen señales, por favor registrela y vuelva hacer una búsqueda!",
                        type: 'warning',
                        showCancelButton: true,
                        focusConfirm: true,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Registrar',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="fa fa-thumbs-down"></i> Cancelar',
                        cancelButtonAriaLabel: 'Thumbs down',
                    }).then((result) => {
                        if (result.value) {
                            this.formNew = true;
                            this.formSearch = false;
                        }
                    });
                }
                    error => {
                    this.errorMessage = <any>error;
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }

            });
    }

  onAdd(){

      this._msvSenialService.searchByFull().subscribe(
              response => {
                  if(response!=""){
                      var checkboxParent = document.getElementsByName('_senalParent_')[0];
                  }
              this.senalesPorAsignar = response;
              this.formAdd = true;
              this.formIndex = false;
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

    checkAll(e){

        var checkboxParent = document.getElementsByName('_senalParent_')[0]['checked'];
        var checkboxes = document.getElementsByName('_senal_');

        for (var i in checkboxes){
            for(var item in checkboxes[i]){
                    if(typeof checkboxes[i]['checked'] !== 'undefined') {
                        if (!checkboxes[i]['checked']) {
                            checkboxes[i]['checked'] = true;
                            this.build[checkboxes[i]['value']] = checkboxes[i]['value'];
                        } else {
                            checkboxes[i]['checked'] = false;
                            delete this.build[checkboxes[i]['value']];
                        }
                        if (checkboxParent){
                            checkboxes[i]['checked'] = true;
                            this.build[checkboxes[i]['value']] = checkboxes[i]['value'];
                        } else {
                            checkboxes[i]['checked'] = false;
                            delete this.build[checkboxes[i]['value']];
                        }
                    }
                }
            }

    }

    check(e){

        if(e.target.checked){
            this.build[e.target.value] = e.target.value;
        } else {
            delete this.build[e.target.value];
        }

    }

    onFileChange(event) {
        if(event.target.files.length > 0) {
            const fileSelected: File = event.target.files[0];

            this.file = new FormData();
            this.file.append('file', fileSelected);
        }
    }

    onExport(){
        this._msvSenialService.export();
    }

    onSend() {
        let token = this._loginService.getToken();

        this.msvSenial.destinoId = this.destinoSelected;
        this.msvSenial.tipoDestinoId = this.tipoDestinoSelected;
        this.msvSenial.tipoSenalId = this.tipoSenalSelected;

        for (var i in this.build) {
            this.senalSelected += this.build[i] + ',';
        }

        this.msvSenial.inventarioSenialId = this.senalSelected.slice(0, -1);

        var valid = "";

        if (this.msvSenial.tipoSenalId == 0) {
            valid += "Debe seleccionar un tipo de señal.\n";
        }
        if (this.msvSenial.destinoId == 0 || this.msvSenial.tipoDestinoId == 0) {
            valid += "Debe seleccionar un lugar de destino.\n";
        }
        if (this.msvSenial.inventarioSenialId == "") {
            valid += "Debe seleccionar la señal(es) que desea agregar al inventario.";
        }
        if(this.file == null){
            valid += "Debe agregar algún comprobate o nota en formato pdf.\n";
        }

    if(valid != ""){
            swal({
                title: 'Advertencia',
                text: valid,
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
    }else {

            //if(this.funcionario.activo == 'true'){
            this._msvSenialService.register(this.file, this.msvSenial, token).subscribe(
                    response => {

                    this.respuesta = response;
                    //this.formConfirm = false;
                    //this.formPdf = true;

                    if (this.respuesta.status == 'success') {
                        this.ready.emit(true);
                        swal({
                            title: 'Perfecto!',
                            text: 'Registro exitoso!',
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                        this.onAdd();
                    } else {
                        swal({
                            title: 'Error!',
                            text: 'La señal ya se encuentra registrada',
                            type: 'error',
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
            //}else{
            //  this.formConfirm = true;
            //this.formPdf = false;
            //}
        }
        this.senalSelected = "";
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
      },
    });
    this.table = $('#dataTables-example').DataTable();
  }
  /*onNew() {
    this.formNew = true;
    this.formN = false;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }*/


  /*myFunc() {
    console.log("asd");
  }*/

  /*calcularTotal() {
    let ini, fin, total;
    ini = 0;
    fin = 0;
    total = 0;
    ini = this.msvSenial.rangoini;
    fin = this.msvSenial.rangofin;
    total = (fin-ini)+1;
    console.log(total);
    if (total<0) {
      total=0;

    }
    this.msvSenial.total = total;

  }*/

  /*ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formN = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }*/
  /*deleteMsvSenial(id: any) {

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
        this._msvSenialService.deleteMsvSenial(token, id).subscribe(
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

  editMsvSenial(msvSenial: any) {
    console.log(msvSenial);

    this.msvSenial = msvSenial;

    this.formEdit = true;
    this.formIndex = false;
  }*/


  /* onEnviar() {
   let token = this._loginService.getToken();
   this.msvSenial.rangoini = this.msvSenial.rangoini;
   this.msvSenial.rangofin = this.msvSenial.rangofin;
   this.msvSenial.total = this.msvSenial.total;
   this.msvSenial.fechaAsignacion = this.msvSenial.fechaAsignacion;
   this.msvSenial.nResolucion = this.msvSenial.nResolucion;
   this.msvSenial.sedeOperativaId = this.sedeOperativaSelected;
   this._msvSenialService.register(this.msvSenial, token).subscribe(
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
   }*/


  /*changedSedeOperativa(e) {

    this.validado = false;
    if (e) {
      let token = this._loginService.getToken();
      this._sedeOperativaService.showSedeOperativa(token, e).subscribe(
              response => {
            this.sedeOperativa = response;
            this.sedeOperativaReady = true;
//          this.msvSenial.rangoini = this.sedeOperativa.data.
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

      this._msvSenialService.showMsvSenialPorSedeOperativa(token, e).subscribe(
              response => {
            this.sedeOperativaSuccess = true;
            if (response.status=="success") {

              this.msvSenial = response.data;

              this.msvSenialReady = true;
              this.msvSenial.fechaAsignacion = this.msvSenial.fechaAsignacion;

              //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
              console.log(this.msvSenial);
            }
            else if (response.status=="vacio") {
              this.msvSenial = new MsvSenial(0,0,0,"","",0);
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
  }*/

}