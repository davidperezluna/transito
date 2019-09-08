import { Component, OnInit } from '@angular/core';
import { GdDocumento } from './gdDocumento.modelo';
import { GdDocumentoService } from '../../../../services/gdDocumento.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './gdDocumento.component.html'
})

export class GdDocumentoComponent implements OnInit {
  public errorMessage;
  public documentos: any = null;
  public documentosPendientes: any = null;
  public funcionarios: any;
  public funcionarioSelected: any;
  
	public formNew = false;
	public formEdit = false;
	public formIndex = false;
  public formPrint = false;
  public formShow = false;
  public formAssign = false;
  public formRecord = false;
  public formSearch = true;
  
  public table: any = null; 
  public documento: GdDocumento;
  public documentoSelected: any = null;

  public filtro: any= null;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Nombres o Apellidos' },
    { 'value': '2', 'label': 'Identificación' },
    { 'value': '3', 'label': 'Entidad' },
    { 'value': '4', 'label': 'No. de radicado' },
  ];

  constructor(
    private _DocumentoService: GdDocumentoService,
    private _FuncionarioService: PnalFuncionarioService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {    
    if (this.table) {
      this.table.destroy();
    }

    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
    this.formShow = false;
    this.formRecord = false;
    this.formPrint = false;
    this.formAssign = false;

    this._FuncionarioService.select().subscribe(
      response => {
        this.funcionarios = response;        
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._DocumentoService.index().subscribe(
      response => {
        if (response.code == 200) {
          this.documentosPendientes = response.data;
          this.formAssign = true;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );

    swal({
      title: '<i>Para Tener En Cuenta</i>',
      type: 'info',
      html:
        '<p style="text-align:justify;"><b>- DERECHO DE PETICIÓN EN INTERÉS GENERAL Y PARTICULAR:</b>' +
        ' El que tiene toda persona para presentar solicitudes respetuosas ante las autoridades consagrado en el articulo' +
        '23 de la constitucion política como derecho fundamental. Termino de respuesta 15 días</p>' +
        '<p style="text-align:justify;"><b>- DERECHO DE PETICIÓN DE INFORMACIÓN:</b> Petición para que el funcionario de a conocer como ha actuado en un caso determinado o permita el ' +
        'examen de los documentos públicos o expida copia de los mismos. Termino para Resolver 10 días </p>',
    });
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      retrieve: true,
      paging: false,
      responsive: true,
      pageLength: 10,
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

  onChangedAssign(event, idDocumento) {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
    
    if (event) {
      console.log(event);
      let token = this._loginService.getToken();

      this._DocumentoService.show({'id': idDocumento}, token).subscribe(
        response => {
          if (response.code == 200) {
            this.documentoSelected = response.data;            
          } else {
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });

            this.documentoSelected = null;
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );

      this._FuncionarioService.show({ 'id': event }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.funcionarioSelected = response.data;

            let datos = {
              'idFuncionario': event,
              'idDocumento': idDocumento
            };
      
            var html = '¿Esta seguro que desea asignar este documento a: '+this.funcionarioSelected.ciudadano.primerNombre+' '+this.funcionarioSelected.ciudadano.primerApellido+'?';
      
            swal({
              title: 'Atención',
              type: 'warning',
              html: html,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Asignar!',
              confirmButtonAriaLabel: 'Thumbs up, great!',
              cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> Cancelar',
              cancelButtonAriaLabel: 'Thumbs down',
            }).then((result) => {
              if (result.value) {
                this._DocumentoService.assign(datos, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                      });
      
                      this.ngOnInit();
                    } else {
                      swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                      });
                    }
                    error => {
                      this.errorMessage = <any>error;
                      if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                      }
                    }
                  }
                );
              } else if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.cancel
              ) {
      
              }
            });
          } else {
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });

            this.funcionarioSelected = null;
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );
    }
  }

  onNew(){
    this.formIndex = false;
    this.formEdit = false;
    this.formShow = false;
    this.formRecord = false;
    this.formPrint = false;
    this.formAssign = false;
    this.formNew = true;
  }

  onShow(documento: any){
    this.documento = documento;
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
    this.formPrint = false;
    this.formAssign = false;
    this.formRecord = false;
    this.formShow = true;
  }

  onRecord(documento: any) {
    this.documento = documento;    
    if (this.documento) {
      this.formIndex = false;
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formRecord = true;
      this.formAssign = false;
      this.formPrint = false;
    }
  }

  onPrint(documento: any) {
    this.documento = documento;
    if (this.documento) {
      this.formIndex = false;
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formRecord = false;
      this.formAssign = false;
      this.formPrint = true;
    }
  }

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  onReadyDocument(documento:any){
    this.documento = documento;
    if(this.documento) {
      this.ngOnInit();
      this.formSearch = true;
    }
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();
    
    this._DocumentoService.search(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.formIndex = true;
          this.formAssign = false;
          this.documentos = response.data;

          if (this.table) {
            this.table.destroy();
          }

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);

          swal.close();
        } else {
          swal({
            title: 'Alerta',
            type: 'warning',
            text: response.message,
            showCloseButton: true,
          });

          this.documentos = null;
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

  onSearchByState(estado: any) {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();

    this._DocumentoService.searchByState({ 'state':estado }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.formIndex = true;
          this.formAssign = false;
          this.documentos = response.data;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);

          swal.close();
        } else {
          swal({
            title: 'Alerta',
            type: 'warning',
            text: response.message,
            showCloseButton: true,
          });

          this.documentos = null;
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

  delete(id: any) {
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
        this._DocumentoService.delete(token, id).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonColor: '#15d4be',
            });
            this.table.destroy();
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

  edit(documento: any) {
    this.documento = documento;
    this.formEdit = true;
  }
}