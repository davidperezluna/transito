import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvRegistroIpatService } from '../../../services/msvRegistroIpat.service';
import { MsvExportIpat } from '../msvExportIpat.modelo';

import { CfgGravedadService } from '../../../services/cfgGravedad.service';
import { SvCfgTipoVictimaService } from '../../../services/svCfgTipoVictima.service';
import { MunicipioService } from '../../../services/municipio.service';
import { ClaseService } from '../../../services/clase.service';
import { CfgClaseAccidenteService } from '../../../services/cfgClaseAccidente.service';
import { CfgChoqueConService } from '../../../services/cfgChoqueCon.service';
import { CfgObjetoFijoService } from '../../../services/cfgObjetoFijo.service';
import { GeneroService } from '../../../services/genero.service';


import swal from 'sweetalert2';
import { Utils } from 'ng2-bootstrap';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './export.component.html'
})
export class ExportComponent implements OnInit {
    //@Output() ready = new EventEmitter<any>();
    public errorMessage;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any = false;
    public ipat = false;
    
    public file: any;
    public txt: any[];
    public valido = true;

    public date: any;
    
    public exportIpat: MsvExportIpat;

    public ipats: any;
    public gravedades: any;
    public tiposVictima: any;
    public municipios: any;
    public clases: any;
    public clasesAccidente: any;
    public choquesCon: any;
    public objetosFijos: any;
    public generos: any;
    public diasSemana = [ 
        { value: 'LUNES', label:'LUNES' },
        { value: 'MARTES', label:'MARTES' },
        { value: 'MIERCOLES', label:'MIERCOLES' },
        { value: 'JUEVES', label:'JUEVES' },
        { value: 'VIERNES', label:'VIERNES' },
        { value: 'SABADO', label:'SABADO' },
        { value: 'DOMINGO', label:'DOMINGO' },
        { value: 'FESTIVOS', label:'FESTIVOS' },
    ];
    
    public gruposEdad = [
        {value: '0', label:'0 a 4'},
        {value: '5', label:'5 a 9'},
        {value: '10', label:'10 a 14'},
        {value: '15', label:'15 a 19'},
        {value: '20', label:'20 a 24'},
        {value: '25', label:'25 a 29'},
        {value: '30', label:'30 a 34'},
        {value: '35', label:'35 a 39'},
        {value: '40', label:'40 a 44'},
        {value: '45', label:'45 a 49'},
        {value: '50', label:'50 a 54'},
        {value: '55', label:'55 a 59'},
        {value: '60', label:'60 a 64'},
        {value: '65', label:'65 a 69'},
        {value: '70', label:'70 a 74'},
        {value: '75', label:'75 a 79'},
        {value: '80', label:'80 a 84'},
        {value: '85', label:'85 a 90'},
    ];

    constructor(
        private _IpatService: MsvRegistroIpatService,
        private _LoginService: LoginService,
        private _GravedadService: CfgGravedadService,
        private _TipoVictimaService: SvCfgTipoVictimaService,
        private _MunicipioService: MunicipioService,
        private _ClaseService: ClaseService,
        private _ClaseAccidenteService: CfgClaseAccidenteService,
        private _ChoqueCon: CfgChoqueConService,
        private _ObjetoFijo: CfgObjetoFijoService,
        private _GeneroService: GeneroService,
        private _MsvRegistroIpat: MsvRegistroIpatService,
    ) { }

    ngOnInit() {
        this.exportIpat = new MsvExportIpat(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        
        this._GravedadService.getGravedadSelect().subscribe(
            response => {
                this.gravedades = response;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._TipoVictimaService.getTipoVictimaSelect().subscribe(
            response => {
                this.tiposVictima = response;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._MunicipioService.getMunicipioSelect().subscribe(
            response => {
                this.municipios = response;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._ClaseService.getClaseSelect().subscribe(
            response => {
                this.clases = response;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._ClaseAccidenteService.getClaseAccidenteSelect().subscribe(
            response => {
                this.clasesAccidente = response;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._ChoqueCon.getChoqueConSelect().subscribe(
            response => {
                this.choquesCon = response;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._ObjetoFijo.getObjetoFijoSelect().subscribe(
            response => {
                this.objetosFijos = response;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._GeneroService.getGeneroSelect().subscribe(
            response => {
                this.generos = response;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
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
    iniciarTabla() {
        if (this.table) {
            this.table.destroy();
        }
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                'excel', 'pdf'
            ],
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

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const fileSelected: File = event.target.files[0];

            this.file = new FormData();
            this.file.append('file', fileSelected);
        }
    }

    async ngAbrirInput() {
        const { value: files } = await swal({
            title: 'Seleccione el archivo .txt',
            input: 'file',
            inputAttributes: {
                'accept': 'txt/*',
                'aria-label': 'Upload your profile picture'
            }
        })

        if (files) {
            this.txt = [];
            let reader: FileReader = new FileReader();
            reader.readAsBinaryString(files);
            reader.onload = (e) => {
                let txt: string = reader.result;
                let allTextLines = txt.split(/\r\n|\n/);
                for (let i = 0; i < allTextLines.length; i++) {
                    let data = allTextLines[i].split(',');
                    if (data.length < 35) {
                        this.valido = false;
                    } else {
                        if (data[0] != '') {
                            this.txt.push(data);
                            console.log(this.txt);
                        }
                    }
                }
            }
        }
    }

    onEnviar(){
        let token = this._LoginService.getToken();
        this.exportIpat.documento = this.file;
        this._IpatService.buscarIpat(this.txt, this.exportIpat, token).subscribe(
            
            response => {
                this.ipats = response.data;
                console.log(this.ipats);
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

    onCancelar() {
        this.valido = false;
    } 
}