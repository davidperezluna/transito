import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CvCdoComparendoService } from '../../services/cvCdoComparendo.service';
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
  public comparendosSelect: any = [];
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
    private _loginService: LoginService,
    private _ComparendoService: CvCdoComparendoService,
  ){}
    
  ngOnInit() {  }

  onSearch() {
    if (this.comparendosSelect.length > 0) {
      this.comparendosSelect.splice(0, this.comparendosSelect.length);
    }

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });

    this.formIndex = false;

    let token = this._loginService.getToken();

    this._ComparendoService.searchByFiltrosFactura(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.comparendos = response.data.comparendos;
          this.formIndex = true;

          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
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

  onSelect(idComparendo: any, eve: any) {
    if (eve.target.checked) {
      this.comparendosSelect.push(idComparendo);
    } else {
      let index = this.comparendosSelect.indexOf(idComparendo);
      if (index > -1) {
        this.comparendosSelect.splice(index, 1);
      }
    }
  }


  iniciarTabla(){
    if (this.table) {
      this.table.destroy();
    }

    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
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
   this.table = $('#dataTables-example').DataTable();
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