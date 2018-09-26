import { Component, OnInit } from '@angular/core';
import { SvCfgFuncionCriterioService } from '../../services/svCfgFuncionCriterio.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCfgFuncionCriterio.component.html'
})
export class SvCfgFuncionCriterioComponent implements OnInit {
    public errorMessage;

    constructor(
        private _SvCfgFuncionCriterioService: SvCfgFuncionCriterioService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { }


    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
    }
}
