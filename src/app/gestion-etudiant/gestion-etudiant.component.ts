import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../_service/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { UserAuthService } from '../_service/user-auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsEtudiantComponent } from '../details-etudiant/details-etudiant.component';

@Component({
  selector: 'app-gestion-etudiant',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,MatToolbarModule,MatCardModule,MatDividerModule,
    MatDialogModule,MatButtonModule, MatTableModule],
  templateUrl: './gestion-etudiant.component.html',
  styleUrl: './gestion-etudiant.component.css'
})
export class GestionEtudiantComponent {

  etudiants: any[] = [];
  displayedColumns: string[] = ['userNom', 'userPrenom', 'userEmail', 'formations', 'actions'];


  constructor(private userService: UserService,
    private router:Router, private userAuthService: UserAuthService,private dialog: MatDialog 
  ) {}

  choose(){
    this.router.navigate(['/ajouter-etudiant']);
  }

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.userService.getEtudiants().subscribe(
      (data) => {
        this.etudiants = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des étudiants', error);
      }
    );
  }

  voirDetails(etudiant: any) {
    this.dialog.open(DetailsEtudiantComponent, {
      width: '400px',
      data: etudiant
    });
  }

  supprimerEtudiant(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
        this.userService.deleteEtudiant(id).subscribe(() => {
          alert("Étudiant supprimé avec succès ✅");
          this.loadEtudiants(); // Recharge la liste après suppression
        }, error => {
          console.error("Erreur lors de la suppression :", error);
          alert("Une erreur est survenue lors de la suppression ");
        });
      }
    }

    logout() {
      // Supprimer le token JWT du localStorage
      localStorage.removeItem('jwtToken');
      this.router.navigate(['/login']);
    }

  }

