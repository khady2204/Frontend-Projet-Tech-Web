import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../_service/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-etudiant',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-etudiant.component.html',
  styleUrl: './gestion-etudiant.component.css'
})
export class GestionEtudiantComponent {

  etudiants: any[] = [];

  constructor(private userService: UserService,
    private router:Router
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

  voirDetails(etudiant: any){
    alert(`Nom: ${etudiant.userNom}\nPrénom: ${etudiant.userPrenom}\nEmail: ${etudiant.userEmail}\nFormation: ${etudiant.formations}
          \nPromo: ${etudiant.promo}\nINE: ${etudiant.ine}\nNiveau: ${etudiant.niveau}\nAnnee: ${etudiant.annee}\nENO: ${etudiant.eno}`
    );
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

