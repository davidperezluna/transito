import { Component, OnInit} from '@angular/core';
import { ImoTrazabilidadService } from '../../services/imoTrazabilidad.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-reasignacion-insumo',
  templateUrl: './imoReasignacion.component.html',
  providers: [DatePipe] 
})

export class ImoReasignacionComponent implements OnInit {
  public errorMessage;
public formIndex = true;
public formNew = false;
public formShow = false;

public reasignaciones:any;
public table: any = null;
public isCantidad=true;
public idReasignacion:any;


constructor(
  private _ImoTrazabilidadService: ImoTrazabilidadService,
  ){}

  ngOnInit() {

    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._ImoTrazabilidadService.index().subscribe(
      response => {
        this.reasignaciones = response.data; 
        let timeoutId = setTimeout(() => {
          this.onInitTable();
          swal.close();
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

  onShow(id:any){
    this.idReasignacion = id;
    this.formIndex = false;
    this.formNew = false; 
    this.formShow = true;
    this.table.destroy();
  }

  onNew(){
    this.formIndex = false;
    this.formNew = true;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formShow = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }

  onInitTable() {
    if (this.table) {
      this.table.destroy();
    }
    
    this.table = $('#dataTables-example').DataTable({
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
  }
}