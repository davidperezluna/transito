import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PnalTalonario } from '../pnalTalonario.modelo';
import { PnalTalonarioService } from '../../../../../services/pnalTalonario.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-new-pnaltalonario',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public errorMessage;

public talonario: PnalTalonario;
public organismosTransito: any;
public sedeOperativaSelected: any;
public organismoTransito: any = null;

constructor(
  private _TalonarioService: PnalTalonarioService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.talonario = new PnalTalonario(null, null, null, null, null, null, null, null);

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
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

  onCalcularTotal() {
    let ini, fin, cantidad;
    ini = Number(this.talonario.desde);
    fin = Number(this.talonario.hasta);
    
    if (fin > ini) {
      cantidad = (fin - ini) + 1;

      if (cantidad < 0) {
        cantidad = 0;
      }

      this.talonario.cantidadRecibida = cantidad;
    }else{
      swal({
        title: 'Alerta!',
        text: 'El número de inicio no puede ser superior o igual al número de finalización',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });

      this.talonario.cantidadRecibida = null;
    }
  }

  onChangedOrganismoTransito(e) {
    if (e) {
      let token = this._LoginService.getToken();

      this._OrganismoTransitoService.show({ 'id':e },token).subscribe(
        response => {
            this.organismoTransito = response.data;
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
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    swal({
      title: 'Generando consecutivos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.talonario.idOrganismoTransito = this.organismoTransito.id;

    let token = this._LoginService.getToken();

    this._TalonarioService.register(this.talonario, token).subscribe(
      response => {      
        if(response.code == 200){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          
          this.ready.emit(true);
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