import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { ComparendoService } from '../../../services/comparendo.service';
import { CfgComparendoEstadoService } from '../../../services/cfgComparendoEstado.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() comparendo:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public estados: any
public bancoSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _comparendoService: ComparendoService,
  private _EstadoService: CfgComparendoEstadoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){
    this._EstadoService.select().subscribe(
        response => {
          this.estados = response;
          setTimeout(() => {
            // this.bancoSelected = [this.comparendo.banco.id];
            this.formReady = true;
          });
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearch(){
    let token = this._loginService.getToken();
    this.comparendo.bancoId = this.bancoSelected;

		this._comparendoService.searchByState(this.comparendo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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