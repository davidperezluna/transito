import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserMedidaCautelarService } from '../../../services/userMedidaCautelar.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { CfgDepartamentoService } from '../../../services/cfgDepartamento.service';
import { CfgEntidadJudicialService } from '../../../services/cfgEntidadJudicial.service';
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

  public entidadesJudiciales;
  public municipios;
  public departamentos;

  public table: any = null;

  public datos = {
    'fechaLevantamiento': null,
    'numeroOficioLevantamiento': null,
    'observacionesLevantamiento': null,
    'idMedidaCautelar': null,
    'idEntidadJudicialLevantamiento': null,
    'idDepartamentoLevantamiento': null,
    'idMunicipioLevantamiento': null,
  }

  constructor(
    private _MedidaCautelarService: UserMedidaCautelarService,
    private _DepartamentoService: CfgDepartamentoService,
    private _MunicipioService: CfgMunicipioService,
    private _EntidadJuducialService: CfgEntidadJudicialService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() { 
    this._DepartamentoService.select().subscribe(
      response => {
        this.departamentos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._EntidadJuducialService.select().subscribe( 
      response => {
        this.entidadesJudiciales = response;
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
    this.onReady.emit(true);
  }

  onChangedDepartamento(e) {
    if (this.medidaCautelar.idDepartamento) {
      let token = this._LoginService.getToken();
      this._MunicipioService.selectByDepartamento({ 'idDepartamento':this.medidaCautelar.idDepartamento }, token).subscribe(
        response => {
          this.municipios = response;
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
        
        this._MedidaCautelarService.delete(this.datos, token).subscribe(
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
}