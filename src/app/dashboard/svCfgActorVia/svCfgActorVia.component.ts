
import { Component, OnInit } from '@angular/core';
import { SvCfgClaseActorViaService } from '../../services/svCfgClaseActorVia.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCfgClaseActorVia.component.html'
})
export class SvCfgClaseActorViaComponent implements OnInit {
    public errorMessage;

    constructor(
        private _SvCfgClaseActorViaService: SvCfgClaseActorViaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { }


    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
    }
}
