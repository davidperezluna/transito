import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PnalAsignacion } from '../pnalAsignacion.modelo';
import { PnalAsignacionService } from '../../../services/pnalAsignacion.service';
import { LoginService } from '../../../services/login.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() funcionario:any = null;

public apiUrl = environment.apiUrl + 'personal/pnalasignacion';
public asignacion: PnalAsignacion;
public errorMessage;

public organismosTransito: any;

constructor(
  private _AsignacionService: PnalAsignacionService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.asignacion = new PnalAsignacion(null, null, null, null, null, null, null);

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }
  
  onCancelar(){
    this.ready.emit(true);
  }

  onCalcularTotal() {
    let ini, fin, cantidad;
    ini = Number(this.asignacion.desde);
    fin = Number(this.asignacion.hasta);

    if (fin > ini) {
      cantidad = (fin - ini) + 1;

      if (cantidad < 0) {
        cantidad = 0;
      }
      this.asignacion.cantidadRecibida = cantidad;
    }else{
      swal({
        title: 'Alerta!',
        text: 'El número de inicio no puede ser superior o igual al número de finalización',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });

      this.asignacion.cantidadRecibida = null;
    }
  }
  
  onEnviar(){
    swal({
      title: 'Asignando consecutivos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._AsignacionService.register(this.asignacion, token).subscribe(
      response => {        
        if(response.status == 'success'){
          this.asignacion = response.data;
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
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
}