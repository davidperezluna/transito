import { Component, OnInit } from '@angular/core';
import { GdDocumentoService } from '../../services/gdDocumento.service';
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import { LoginService } from '../../services/login.service';
import { GdDocumento } from './gdDocumento.modelo';
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
  public formSearch = true;
  
  public table: any = null; 
  public documento: GdDocumento;

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
    private _FuncionarioService: MpersonalFuncionarioService,
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
        if (response.status == 'success') {
          this.documentosPendientes = response.data;
          this.formAssign = true;

          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
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

  iniciarTabla(){
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

  onChangedAssign(event,idDocumento) {
    if (event !== undefined) {
      let token = this._loginService.getToken();

      let datos = {
        'idFuncionario': event,
        'idDocumento': idDocumento
      };

      this._DocumentoService.assign(datos, token).subscribe(
        response => {
          if (response.status == 'success') {
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
    }
  }

  onNew(){
    this.formIndex = false;
    this.formEdit = false;
    this.formShow = false;
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
    this.formShow = true;
  }

  onPrint(documento: any) {
    this.documento = documento;
    if (this.documento) {
      this.formIndex = false;
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
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
        if (response.status == 'success') {
          this.formIndex = true;
          this.formAssign = false;
          this.documentos = response.data;

          if (this.table) {
            this.table.destroy();
          }

          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
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