import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-ajouter-etudiant',
  imports: [RouterModule, FormsModule],
  templateUrl: './ajouter-etudiant.component.html',
  styleUrl: './ajouter-etudiant.component.css'
})
export class AjouterEtudiantComponent {

  constructor(private router: Router,
    private userService : UserService
   ) {}
  


  form(signupForm: NgForm) {
    if(signupForm.valid){
      const userData = signupForm.value; //Récupère les données du formulaire
      this.userService.register(userData).subscribe(
        (response) => {
          console.log('Inscription réussie', response);
          alert('Inscription réussie !');
          this.router.navigate(['/gestion-etudiant'])
        },
        (error) => {
          console.log('Erreur lors de l\'inscription', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      );
    }else{
      alert('Veillez remplir tous les champs correctement')
    }
  }
  

  
}
