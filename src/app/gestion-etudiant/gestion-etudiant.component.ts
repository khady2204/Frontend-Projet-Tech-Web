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

   

}
