import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { BpProyectoService } from '../../../services/bpProyecto.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
})
export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() proyecto: any = null;
    public errorMessage;

    public datos = {
        'nombre': null,
        'unidadMedida': null,
        'cantidad': null,
        'costoUnitario': null,
        'costoTotal': null,
        'idProyecto': null,
    };

    constructor(
        private _ProyectoService: BpProyectoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { }

    onCancelar() {
        this.ready.emit(true);
    }

    onRegister() {
        let token = this._loginService.getToken();
        
        this.datos.idProyecto = this.proyecto.id;

        this._ProyectoService.register(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
                
                this.ready.emit(true);
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
}