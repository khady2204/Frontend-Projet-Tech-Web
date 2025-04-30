import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-details-etudiant',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './details-etudiant.component.html',
  styleUrl: './details-etudiant.component.css'
})
export class DetailsEtudiantComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
