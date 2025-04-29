import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { UserService } from '../_service/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserAuthService } from '../_service/user-auth.service';

@Component({
  selector: 'app-ajouter-etudiant',
  imports: [RouterModule, FormsModule,MatToolbarModule,MatCardModule,
    MatButtonModule],
  templateUrl: './ajouter-etudiant.component.html',
  styleUrl: './ajouter-etudiant.component.css'
})
export class AjouterEtudiantComponent {

  constructor(private router: Router,
    private userService : UserService, 
    private userAuthService: UserAuthService
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

  logout(): void {
    this.userAuthService.logout();
    this.router.navigate(['/login']);
  }
  

  
}
