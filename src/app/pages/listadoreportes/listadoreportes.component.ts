import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReporteService } from '../../services/reportes.service';
import { Reportes } from '../../interfaces/reportes';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-listadogrupos',
  imports:  [TableModule, ToolbarModule, DialogModule],
  templateUrl: './listadoreportes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadoReportesComponent {

public reportes: Reportes[] = [];
public loading: boolean = true;
public repServ= inject(ReporteService);

constructor() {
  this.repServ.getGruposById('0');
  }
  ngOnInit() {

      console.log('Lista de Grupos:', this.repServ.reportes());
    };

    editar(id: string) {
      console.log('ID:', id);
    }
      // Aquí puedes implementar la lógica para editar el grupo con el ID proporcionado
      // Por ejemplo, redirigir a una página de edición o abrir un formulario de edición}

}
