import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaTransporteService } from '../../../services/userEmpresaTransporte.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() empresa: any = null;

    public errorMessage;
    
    constructor(
        private _EmpresaTransporteService: UserEmpresaTransporteService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
    }

    onCancelar() {
        this.ready.emit(true);
    }
}