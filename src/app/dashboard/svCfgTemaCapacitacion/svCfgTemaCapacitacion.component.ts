import { Component, OnInit } from '@angular/core';
import { SvCfgTemaCapacitacionService } from '../../services/svCfgTemaCapacitacion.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCfgTemaCapacitacion.component.html'
})
export class SvCfgTemaCapacitacionComponent implements OnInit {
    public errorMessage;

    constructor(
        private _SvCfgTemaCapacitacionService: SvCfgTemaCapacitacionService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { }


    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
    }
}
