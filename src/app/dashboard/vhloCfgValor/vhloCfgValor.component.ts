import { Component, OnInit } from '@angular/core';
import { VhloValorService } from '../../services/vholCfgValor.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloCfgValor.component.html'
})
export class VhloCfgValorComponent implements OnInit {
  public errorMessage;
  public id;
  public respuesta;
  public cfgValorVehiculos;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public txt: any[] = null;
  public table: any = null;
  public cfgValorVehiculo: any;
  public valido = true;

  constructor(
    private _VhloValorService: VhloValorService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
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
    this._VhloValorService.get().subscribe(
      response => {
        if (response) {
          this.cfgValorVehiculos = response.data;
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
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }
  deleteCfgValorVehiculo(id: any) {

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

  editCfgValorVehiculo(cfgValorVehiculo: any) {
    this.cfgValorVehiculo = cfgValorVehiculo;
    this.formEdit = true;
    this.formIndex = false;
  }

  async onUploadFile() {
    let token = this._loginService.getToken();
    
    const { value: files } = await swal({
        title: 'Seleccione el archivo .csv',
        input: 'file',
        inputAttributes: {
            'accept': 'txt/*',
            'aria-label': 'Upload your profile picture'
        }
    })

    if (files) {
        this.txt = [];
        let reader: FileReader = new FileReader();
        reader.readAsBinaryString(files);
        reader.onload = (e) => {
            let txt: string = reader.result;
            let allTextLines = txt.split(/\r\n|\n/);
            for (let i = 0; i < allTextLines.length; i++) {
                let data = allTextLines[i].split(';');
                if (data.length == 7) {
                    this.valido = false;
                } else {
                    if (data[0] != '') {
                        this.txt.push(data);
                    }
                }
            }
            console.log(this.txt);
            swal({
              title: 'Subiendo datos!',
              text: 'Solo tardara unos segundos por favor espere.',
              onOpen: () => {
                swal.showLoading()
              }
            });
            this._VhloValorService.upload(token, this.txt).subscribe(
              response => {
                swal.close();
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

    }
  }
}