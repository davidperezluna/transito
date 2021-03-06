import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './froAcuerdoPago.component.html'
})

export class FroAcuerdoPagoComponent implements OnInit {
  public errorMessage;
	public acuerdoPago: any;
	public valorTotal: any;
	public ciudadano: any;
	public comparendos: any = null;
  public comparendoSelect: any = null;
	public numeroIdentificacion: any;
  
  public formIndex = false;
  public formNew = false;
  public formEdit = false;
  public formSearch = true;
  public table: any = null;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '2', 'label': 'Identificación' },
    { 'value': '4', 'label': 'No. de comparendo' },
  ];

  constructor(
    private _LoginService: LoginService,
    private _ComparendoService: CvCdoComparendoService,
  ){}
    
  ngOnInit() { 
    swal.close(); 
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.formIndex = false;

    let token = this._LoginService.getToken();

    this._ComparendoService.searchByFiltrosForFactura(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.comparendos = response.data.comparendos;
          this.formIndex = true;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'info',
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
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

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 10,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
  }
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = false;
      this.formSearch = true;
      this.ngOnInit();
    }
  }

  onEdit(acuerdoPago:any){
    this.acuerdoPago = acuerdoPago;
    this.formEdit = true;
    this.formIndex = false;
  }
}