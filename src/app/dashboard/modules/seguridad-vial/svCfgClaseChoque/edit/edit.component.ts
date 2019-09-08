import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgClaseChoqueService } from '../../../../../services/svCfgClaseChoque.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgClaseAccidenteService } from '../../../../../services/svCfgClaseAccidente.service';

@Component({
    selector: 'app-edit-svcfgclasechoque',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() claseChoque: any = null;
    public errorMessage;
    public respuesta;

    public clasesAccidente: any;
    public claseAccidenteSelected: any;

    public formReady = false;

    constructor(
        private _ClaseChoqueService: SvCfgClaseChoqueService,
        private _loginService: LoginService,
        private _ClaseAccidenteService: SvCfgClaseAccidenteService,
    ) { }

    ngOnInit() { 
        this._ClaseAccidenteService.select().subscribe(
            response => {
                this.clasesAccidente = response;
                setTimeout(() => {
                    this.claseAccidenteSelected = [this.claseChoque.claseAccidente.id];
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

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this.claseChoque.idClaseAccidente = this.claseAccidenteSelected;
        this._ClaseChoqueService.edit(this.claseChoque, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
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