import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PqoInmovilizacion } from '../pqoInmovilizacion.modelo';
import { PqoInmovilizacionService } from '../../../services/pqoInmovilizacion.service';
import { PqoCfgPatioService } from '../../../services/pqoCfgPatio.service';
import { PqoCfgGruaService } from '../../../services/pqoCfgGrua.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import { VhloCfgColorService } from '../../../services/vhloCfgColor.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public inmovilizacion: PqoInmovilizacion;
  public date: any;
  public errorMessage;
  public clases: any;
  public marcas: any;
  public lineas: any;
  public colores: any;
  public gruas: any;
  public patios: any;
  public agentesTransito: any;

constructor(
  private _InmovilizacionService: PqoInmovilizacionService,
  private _PqoCfgPatioService: PqoCfgPatioService,
  private _PqoCfgGruaService: PqoCfgGruaService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _MarcaService: VhloCfgMarcaService,
  private _LineaService: VhloCfgLineaService,
  private _ClaseService: VhloCfgClaseService,
  private _ColorService: VhloCfgColorService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.inmovilizacion = new PqoInmovilizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.date = new Date();

    this._FuncionarioService.selectAgentes().subscribe(
      response => {
        this.agentesTransito = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._MarcaService.getMarcaSelect().subscribe(
      response => {
        this.marcas = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ClaseService.select().subscribe(
      response => {
        this.clases = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ColorService.select().subscribe(
      response => {
        this.colores = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._PqoCfgPatioService.select().subscribe(
      response => {
        this.patios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._PqoCfgGruaService.select().subscribe(
      response => {
        this.gruas = response;
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

  onChangedMarca(e) {
    if (e) {
      let token = this._loginService.getToken()
      this._LineaService.searchByMarcaSelect({ 'idMarca': e }, token).subscribe(
        response => {
          this.lineas = response;
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
    
		this._InmovilizacionService.register(this.inmovilizacion,token).subscribe(
			response => {
        if(response.status == 'success'){
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
            text: 'El inmovilizacion '+  +' ya se encuentra registrado',
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