import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserMedidaCautelarService } from '../../../services/userMedidaCautelar.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  providers: [DatePipe]
})

export class DeleteComponent implements OnInit{
  @Output() onReady = new EventEmitter<any>();
  @Input() medidaCautelar:any = null;
  public errorMessage;

  public table: any = null;
  public formShow = false;

  constructor(
    private _MedidaCautelarService: UserMedidaCautelarService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() { }

  onDelete(medidaCautelar:any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se levantar la medida cautelar!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();
        
        this._MedidaCautelarService.delete({ 'id': medidaCautelar.id }, token).subscribe(
          response => {
            if (response.status == 'success') {
              swal({
                title: 'Perfecto!',
                text: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
    
              this.onReady.emit(true);
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
    });
  }

  onCancelar() {
    this.onReady.emit(true);
  }
}