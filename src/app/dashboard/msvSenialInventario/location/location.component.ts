import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'; 
import { MsvSenialInventarioService } from '../../../services/msvSenialInventario.service';
import { MsvSenialUbicacionService } from '../../../services/msvSenialUbicacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() inventario: any = null;
    @Input() tipoDestinoSelected: any = null;
    public seniales: any = null;

    public errorMessage;
    public formIndex = true;
    public table: any = null;

    constructor(
        private _SenialInventarioService: MsvSenialInventarioService,
        private _SenialUbicacionService: MsvSenialUbicacionService,
        private _loginService: LoginService
    ) { }

    ngOnInit() {
        let token = this._loginService.getToken();
        
        if (this.tipoDestinoSelected == 1) {
            this._SenialUbicacionService.searchByDestino({ 'inventario': this.inventario, 'tipoDestino': this.tipoDestinoSelected }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.seniales = response.data;
                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    } else {
                        swal({
                            title: 'Alerta!',
                            text: response.message,
                            type: 'warning',
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
        } else {
            this._SenialUbicacionService.searchByDestino({ 'inventario': this.inventario, 'tipoDestino': this.tipoDestinoSelected }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.seniales = response.data;
                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    } else {
                        swal({
                            title: 'Alerta!',
                            text: response.message,
                            type: 'warning',
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
    }

    iniciarTabla() {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    }

    onCancelar() {
        this.ready.emit(true);
    }
}