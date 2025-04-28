import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashbord-etudiant',
  standalone : true,
  imports: [MatSidenavModule, MatToolbarModule, MatButtonModule,
    MatCardModule],
  templateUrl: './dashbord-etudiant.component.html',
  styleUrl: './dashbord-etudiant.component.css'
})
export class DashbordEtudiantComponent {

}
