import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public errorMessage;

  public search: any = {
    'fechaInicial': null,
    'fechaFinal': null,
  }

  constructor(
    private _ComparendoService: CvCdoComparendoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    swal.close();
  }

  onCancelar() {
    this.ready.emit(true);
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ComparendoService.createExcelInventory(this.search, token).subscribe(
      response => {
        if (response.type) {
          var fileURL = URL.createObjectURL(response);
          window.open(fileURL);
        } else {
          swal({
            title: 'Error!',
            text: 'No existen registros para la generación de reportes en el rango de las fechas estipuladas.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
          
          error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      }
    );
  }  
}
