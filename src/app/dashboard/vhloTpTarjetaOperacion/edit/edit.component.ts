import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloCfgClaseService } from "../../../services/vhloCfgClase.service";
import { VhloCfgServicioService } from "../../../services/vhloCfgServicio.service";
import { VhloTpAsignacionService } from "../../../services/vhloTpAsignacion.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() asignacion: any = null;
    public errorMessage;

    ngOnInit() {
        
    }
}