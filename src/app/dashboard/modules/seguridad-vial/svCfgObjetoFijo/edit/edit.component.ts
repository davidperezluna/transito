import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SvCfgObjetoFijoService } from '../../../../../services/svCfgObjetoFijo.service';
import { SvCfgClaseChoqueService } from '../../../../../services/svCfgClaseChoque.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() objetoFijo: any = null;
  
  public clasesChoque;
  public claseChoqueSelected;
  
  public errorMessage;

  constructor(
    private _ObjetoFijoService: SvCfgObjetoFijoService,
    private _ClaseChoqueService: SvCfgClaseChoqueService,
    private _LoginService: LoginService,
  ) {
   
  }

  ngOnInit() { 
    this._ClaseChoqueService.select().subscribe(
      response => {
        this.clasesChoque = response;
        setTimeout(() => {
          this.claseChoqueSelected = [this.objetoFijo.claseChoque.id];
        });
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


  onCancelar() {
    this.ready.emit(true);
  }
  
  onEnviar() {
    let token = this._LoginService.getToken();

    this.objetoFijo.idClaseChoque = this.claseChoqueSelected;

    this._ObjetoFijoService.edit(this.objetoFijo, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });
  }

}