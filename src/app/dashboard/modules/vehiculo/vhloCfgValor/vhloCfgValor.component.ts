import { Component, OnInit } from '@angular/core';
import { VhloValorService } from '../../../../services/vholCfgValor.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloCfgValor.component.html'
})
export class VhloCfgValorComponent implements OnInit {
  public errorMessage;
  public id;
  public valores;

  public formIndex = true;
  public formNew = false;
  public formEdit = false;
  public formUpload = false;

  public txt: any[] = null;
  public table: any = null;
  public valor: any;
  public valido = true;

  public file: any = null;
  public fileSelected: File = null;

  constructor(
    private _VhloValorService: VhloValorService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.onInitForms();
    
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._VhloValorService.index().subscribe(
      response => {
        if (response) {
          this.valores = response.data;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
            this.formIndex = true;
            swal.close();
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

  onInitForms(){
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
    this.formUpload = false;
  }

  onInitTable() {
    this.table = $('#dataTables-example').DataTable({
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

  onNew() {
    this.formNew = true;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  onFormUpload() {
    this.onInitForms();

    this.formUpload = true;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', this.fileSelected);
    }
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.ngOnInit();
    }
  }

  onDelete(id: any) {
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
        this._VhloValorService.delete(token, id).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonColor: '#15d4be',
            })
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

  onEdit(valor: any) {
    this.valor = valor;
    this.formEdit = true;
    this.formIndex = false;
  }

  onEnviar(){
    if (this.fileSelected) {
      swal({
        title: 'Subiendo datos!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

      let token = this._loginService.getToken();

      this._VhloValorService.upload(this.file, token).subscribe(
        response => {
          if (response.code == 200) {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          } else {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
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
    } else {
      swal({
        title: 'Error!',
        text: 'Debe adjuntar el documento escaneado.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}