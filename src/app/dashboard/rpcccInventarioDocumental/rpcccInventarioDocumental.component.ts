import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import { CfgComparendoEstadoService } from '../../services/cfgComparendoEstado.service';
import { ComparendoService } from '../../services/comparendo.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'rpcccInventarioDocumental',
  templateUrl: './rpcccInventarioDocumental.component.html'
})
export class rpcccInventarioDocumentalComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
  public table:any;   
  public agentes;
  public tipoComparendos;
  public comparendos;
  public comparendosSelected;
  public agenteSelected;
  public datos = {'fechaDesde': null,
                  'fechaHasta': null,
                  'agenteId': null,
                  'comparendosId': null};

  constructor(
    private _loginService: LoginService,
    private _MpersonalFuncionarioService: MpersonalFuncionarioService,
    private _CfgComparendoEstadoService: CfgComparendoEstadoService,
    private _ComparendoService: ComparendoService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })

    this._MpersonalFuncionarioService.selectAgentes().subscribe(
      response => {
        this.agentes = response;        
    },
    error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
        }
    }
    );

    this._CfgComparendoEstadoService.select().subscribe(
      response=>{
        this.tipoComparendos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
        }
    }
    );
    

  }
  iniciarTabla(){
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
  
  onNew(){
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  buscarComparendos(){
      this.datos.comparendosId = this.comparendosSelected;
      this.datos.agenteId = this.agenteSelected;
      let token = this._loginService.getToken();
      this._ComparendoService.searchByParametros(this.datos, token).subscribe(
        response=>{

          if(response.code == 200){
            this.comparendos = response.data;
            console.log(this.comparendos);
            
          }
          else if(response.code == 400){
            console.log(this.errorMessage);
            alert('Error en la petición');              
          }
                  
        }
      );
      
      
  }

}