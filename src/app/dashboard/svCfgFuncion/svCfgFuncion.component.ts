import { Component, OnInit } from '@angular/core';
import { SvCfgFuncionService } from '../../services/svCfgFuncion.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCfgFuncion.component.html'
})
export class SvCfgFuncionComponent implements OnInit {
    public errorMessage;

    constructor(
        private _SvCfgFuncionService: SvCfgFuncionService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { }


    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
    }
}
