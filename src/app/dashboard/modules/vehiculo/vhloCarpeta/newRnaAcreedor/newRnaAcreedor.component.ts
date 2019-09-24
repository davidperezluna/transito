import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Banco } from '../../../../banco/banco.modelo';
import { VhloVehiculo } from '../../vhloVehiculo/vhloVehiculo.modelo';
import { BancoService } from '../../../../../services/banco.service';
import { VhloAcreedorService } from '../../../../../services/vhloAcreedor.service';
import { LoginService } from '../../../../../services/login.service';

import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-rna-acreedor',
  templateUrl: './newRnaAcreedor.component.html'
})
export class NewRnaAcreedorComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() identificacion:any = null;
@Input() tipoIdentificacion:any = null;
@Input() vehiculo: VhloVehiculo = null;
@Input() nombreAcreedor: any = null;

public banco: Banco;
public errorMessage;
public respuesta;
public acreedorNew = false;


constructor(
  private _BancoService: BancoService,
  private _loginService: LoginService,
  private _VhloAcreedorService: VhloAcreedorService,
){}

  ngOnInit() {
    this.banco = new Banco(null,this.nombreAcreedor);

    
  }
  onCancelar(){
    this.ready.emit(false);
  }
  onEnviar(){
    let token = this._loginService.getToken();

    var html = 'Se va a registrar el acreedor:<br>'+
               'Nombre: <b>'+this.banco.nombre+'</b><br>';

   swal({
      title: 'Creacion de acreedor',
      type: 'warning',
      html:html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Crear!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> No crear',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
        if (result.value) {
         console.log(this.banco);
    this._BancoService.register(this.banco,token).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El acreedor ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
    });
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {

        }
      })
  }
}