import { Component, inject } from '@angular/core';
import { GrupoReporteService } from '../../services/gruporeportes.service';
import { GrupoReportes } from '../../interfaces/gruporeporte';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-listadogrupos',
  imports:  [TableModule, ToolbarModule],
  templateUrl: './listadogrupos.component.html',
})
export class ListadogruposComponent {

public listadogrupos: GrupoReportes[] = [];
public loading: boolean = true;
public grupServ= inject(GrupoReporteService);

constructor() {
  this.grupServ.getGruposById('99');
  }
  ngOnInit() {

      console.log('Lista de Grupos:', this.grupServ.grupos());
    };

    editar(id: string) {
      console.log('ID:', id);
    }
      // Aquí puedes implementar la lógica para editar el grupo con el ID proporcionado
      // Por ejemplo, redirigir a una página de edición o abrir un formulario de edición}

}
