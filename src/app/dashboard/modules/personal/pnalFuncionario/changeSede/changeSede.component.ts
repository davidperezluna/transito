import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { CfgOrganismoTransitoService } from 'app/services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-change-sede',
    templateUrl: './changeSede.component.html'
})

export class ChangeSedeComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() funcionario: any = null;
    public errorMessage;

    public organismosTransito: any;
    public organismoTransitoSelected: any;
    public datos = {
        'idOrganismoTransito': null,
        'idFuncionario' : null,
    }

    constructor(
        private _LoginService: LoginService,
        private _FuncionarioService: PnalFuncionarioService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
    ) { }

    ngOnInit() {
        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
              this.organismosTransito = response;

              setTimeout(() => {
                this.organismoTransitoSelected = [this.funcionario.organismoTransito.id];
              })
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

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        this.datos.idFuncionario = this.funcionario.id;

        if(this.organismoTransitoSelected == this.datos.idOrganismoTransito) {
            swal({
                title: "Error!!!",
                text: 'El organismo al que intenta trasladar al funcionario es el mismo organismo de transito actual al que pertence.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            })
        } else {
            this._FuncionarioService.changeSede(this.datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.ready.emit(true);
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        })
                    } else {

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
}