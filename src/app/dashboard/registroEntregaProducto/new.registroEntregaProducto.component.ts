import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";



import swal from 'sweetalert2';


@Component({
    selector: 'app-registroEntregaProducto',
    templateUrl: './new.registroEntregaProducto.html',
})
export class NewRegistroEntregaProductoComponent implements OnInit {
    public errorMessage;
    public respuesta;
    public colores: any;
    public tramiteFacturaSelected: any;
    public tipoProducto: any;
    public tipoConsulta: any;
    public ciudadano: any;
    public apoderadoSelected: any;
    public empresa: any;
    public empresaSelected: any;
    public identificacion: any;
    public identificacionApoderado: any;
    public ciudadanoEncontrado = 1;
    public apoderadoEncontrado = 1;
    public empresaEncontrada = 1;
    public nit: any;
    public tipoIdentificacionSelected = null;
    public listaPropietariosCiudadanos = false;
    public listaPropietariosEmpresas = false;
    public ciudadanoNew = false;
    public propietario = true;
    public propietarioPresente = false;
    public ciudadanoSelected: any;
    public apoderado = 'false';
    public tipoIdentificaciones = [];
    public datos = {
        'propietariosEmpresas': [],
        'propietariosCiudadanos': [],
        'solidario': false,
        'vehiculo': null,
        'sustrato': null,
        'numeroLicencia': null,
        'tramiteFactura': null,
        'tipoConsulta': null,
    };

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    buscarVehiculo(){
    }

    onCancelar() {
    }
}