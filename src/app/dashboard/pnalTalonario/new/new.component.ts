import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PnalTalonario } from '../pnalTalonario.modelo';
import { PnalTalonarioService } from '../../../services/pnalTalonario.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public talonario: PnalTalonario;
public organismosTransito: any;
public sedeOperativaSelected: any;
public organismoTransito: any = null;
public errorMessage;
public respuesta: any = null;

constructor(
  private _FuncionarioService: PnalTalonarioService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.talonario = new PnalTalonario(null, null, null, null, null, null, null, null);

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

  onCalcularTotal() {
    let ini, fin, rangos;
    ini = this.talonario.desde;
    fin = this.talonario.hasta;

    if (fin > ini) {
      rangos = (fin - ini) + 1;

      if (rangos < 0) {
        rangos = 0;
      }
      this.talonario.rangos = rangos;
    }else{
      swal({
        title: 'Alerta!',
        text: 'El número de inicio no puede ser superior o igual al número de finalización',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });

      this.talonario.rangos = null;
    }
  }

  onChangedOrganismoTransito(e) {
    if (e) {
      let token = this._loginService.getToken();
      this._OrganismoTransitoService.show(token, e).subscribe(
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
    let token = this._loginService.getToken();

    this._FuncionarioService.register(this.talonario,token).subscribe(
      response => {
        this.respuesta = response;
        
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
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