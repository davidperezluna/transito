import { Component, OnInit } from '@angular/core';
import { CvLcCfgTipoRestriccionService } from '../../../../services/cvLcCfgTipoRestriccion.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvLcCfgTipoRestriccion.component.html'
})

export class CvLcCfgTipoRestriccionComponent implements OnInit {
  public errorMessage;
	public tipoRestriccion: any;
	public valorTotal: any;
	public ciudadano: any;
	public tiposRestriccion: any = null;
	public numeroIdentificacion: any;
  
  public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table: any = null;


  constructor(
    private _loginService: LoginService,
    private _CvLcCfgTipoRestriccionService: CvLcCfgTipoRestriccionService,
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
    this._CvLcCfgTipoRestriccionService.index().subscribe(
				response => {
          this.tiposRestriccion = response.data;
          let timeoutId = setTimeout(() => {
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


  iniciarTabla(){
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
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onEdit(tipoRestriccion:any){
    this.tipoRestriccion = tipoRestriccion;
    this.formEdit = true;
    this.formIndex = false;
  }
}