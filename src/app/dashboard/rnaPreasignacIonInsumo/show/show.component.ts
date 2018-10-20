import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { ImoTrazabilidadService } from '../../../services/imoTrazabilidad.service';
import { ImoAsignacionService } from '../../../services/imoAsignacion.service';
import { LoginService } from '../../../services/login.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  providers: [DatePipe]
})
export class ShowComponent implements OnInit {
@Input() reasignacionId:any = null;
@Output() ready = new EventEmitter<any>();
public errorMessage;
public respuesta;
public reasignaciones:any;
public insumoSelected:any;
public table: any = null;
public numero:any;
public isCantidad=true;

constructor(
  private _ImoTrazabilidadService: ImoTrazabilidadService,
  private _ImoAsignacionService: ImoAsignacionService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {

    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._ImoAsignacionService.showTrazabilidad(token,this.reasignacionId).subscribe(
      response => {
        this.reasignaciones = response.data;
        let timeoutId = setTimeout(() => {
          swal.close()
          this.iniciarTabla();
        }, 100);
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }
  onCancelar(){
    this.ready.emit(true);
  }
  iniciarTabla() {
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      dom: 'Bfrtip',
      buttons: [
          'pdf',
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
}