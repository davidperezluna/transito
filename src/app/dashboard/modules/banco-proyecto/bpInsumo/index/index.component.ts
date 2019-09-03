import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { BpCuentaService } from '../../../../../services/bpCuenta.service';
import { BpActividadService } from '../../../../../services/bpActividad.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index-insumo',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit{
    @Output() onReadyActividad = new EventEmitter<any>();
    @Input() actividad:any = null;
    public errorMessage;

    public insumos: any = null;
    public insumo: any = null;

    public table: any = null;

    public formIndex: any;
    public formNew: any;
    public formShow: any;

    constructor(
        private _CuentaService: BpCuentaService,
        private _ActividadService: BpActividadService,
        private _LoginService: LoginService,
    ){}

    ngOnInit(){
        this.onInitForms();

        swal({
        title: 'Buscando insumos registradas!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
            swal.showLoading()
        }
        });

        let token = this._LoginService.getToken();
        
        this._ActividadService.searchInsumos({ 'idActividad': this.actividad.id }, token).subscribe(
            response => {
                if (response.code = 200) {
                    this.insumos = response.data;

                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);

                    swal.close();
                } else {
                    swal({
                        title: 'Atencion!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                }

                this.formIndex = true;
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

    onInitForms(){
        this.formIndex = false;
        this.formNew = false;
        this.formShow = false;
    }

    onInitTable() {       
        this.table = $('#dataTables-insumos').DataTable({
            destroy: true,
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            }
        });
    }   

    onCancelar(){ this.onReadyActividad.emit(true); }

    onReadyInsumo(){ this.ngOnInit(); }

    onNew() {
        this.onInitForms();

        this.formNew = true;
    }

    onShow(insumo: any) {
        this.insumo = insumo;

        this.onInitForms();
        
        this.formShow = true;
    }

    onDeleteCuenta(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._LoginService.getToken();

                this._CuentaService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: response.message,
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
                        this.table.destroy();

                        this.ngOnInit();
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
        });
    }

}