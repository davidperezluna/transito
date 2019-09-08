import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { SvCfgSenial } from '../svCfgSenial.modelo';
import { SvCfgSenialService } from '../../../../../services/svCfgSenial.service';
import { SvCfgSenialTipoService } from '../../../../../services/svCfgSenialTipo.service';
import { SvCfgSenialColorService } from '../../../../../services/svCfgSenialColor.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-svcfgsenial',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public senial: SvCfgSenial;
public errorMessage;

public tipos: any;
public tipo: any = null;
public colores: any;

public file: any = null;
public fileSelected: File = null;

constructor(
  private _SvCfgSenialService: SvCfgSenialService,
  private _SenialTipoService: SvCfgSenialTipoService,
  private _ColorService: SvCfgSenialColorService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.senial = new SvCfgSenial(null, null, null, null, null, null);

    this._SenialTipoService.select().subscribe(
      response => {
        this.tipos = response;
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
  }
  
  onCancelar(){
    this.ready.emit(true);
  }

  onChangedTipo(e) {
    if (e) {
      let token = this._loginService.getToken();

      this._SenialTipoService.show({ 'id': e }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.tipo = response.data;
          }else{
            this.tipo = null;
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
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    this._SvCfgSenialService.register(this.file, this.senial, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];

      this.file = new FormData();
      this.file.append('file', this.fileSelected);
    }
  }
}