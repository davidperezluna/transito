import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloVehiculoService } from '../../../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../../../services/vhloPropietario.service'
import { LoginService } from '../../../../../services/login.service';
import { forEach } from '@angular/router/src/utils/collection';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show-vhlobuscar',
  templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit {
@Input() vehiculo:any;
@Output() onClose = new EventEmitter<any>();

public maquinaria: any = null;
public remolque: any = null;
public propietarios: any;

constructor(
  private _loginService: LoginService,
  private _VehiculoService: VhloVehiculoService,
  private _PropietarioService: VhloPropietarioService,
  
  ){}

  ngOnInit() {
    let token = this._loginService.getToken();

    this._VehiculoService.showMaquinariaOrRemolque({ 'idVehiculo': this.vehiculo.id },token).subscribe(
      response => {               
        if(response.code == 200){
          if(response.data.maquinaria){
            this.maquinaria = response.data.maquinaria;
            this.remolque = null;
          }else if(response.data.remolque) {
            this.remolque = response.data.remolque;
            this.maquinaria = null;
          }
        }
        else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    );
    
    this._PropietarioService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.propietarios = response.data;
        }else{
          this.propietarios = null;
        }
      }
    );   
  }  
  
  onCancelar(){
      this.onClose.emit();
  }
}