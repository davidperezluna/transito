import { Component, OnInit } from '@angular/core';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { VhloCfgPlacaService } from '../../../../../services/vhloCfgPlaca.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-delivered',
  templateUrl: './delivered.component.html'
})
export class DeliveredComponent implements OnInit {
  public errorMessage;

  public funcionario: any;
  public fabricadas: any;

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _PlacaService: VhloCfgPlacaService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Buscando placas fabricadas!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data;

          let datos = {
            'idOrganismoTransito': this.funcionario.organismoTransito.id,
            'estado': 'FABRICADA',
          }

          this._PlacaService.searchByOrganismoTransitoAndEstado(datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this.funcionario = response.data;

                swal.close();
              } else {
                this.funcionario = null;

                swal({
                  title: 'Error!',
                  text: 'Usted no tiene permisos para realizar tramites',
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert('Error en la petición');
                }
              }
            }
          );
        } else {
          this.funcionario = null;

          swal({
            title: 'Error!',
            text: 'Usted no tiene permisos para realizar tramites',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );
  }
}
