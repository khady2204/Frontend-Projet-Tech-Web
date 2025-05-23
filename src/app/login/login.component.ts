import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule,MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

  hidePassword: boolean = true;

  constructor(private router: Router,
    private userService : UserService,
    private userAuthService : UserAuthService){}
    login(loginForm: NgForm) {
      this.userService.login(loginForm.value).subscribe(
        (Response: any) => {
          if (!Response.user || !Response.user.role) {
            alert('Erreur : Rôle utilisateur non défini');
            return;
          }
    
          this.userAuthService.setRoles([Response.user.role]); // transforme en tableau si besoin
          this.userAuthService.setToken(Response.jwtToken);
          this.userAuthService.setUserId(Response.user.userEmail);
    
          const role = Response.user.role;
          if (role === 'ADMIN') {
            this.router.navigate(['/dashbord-admin']);
          } else {
            this.router.navigate(['/dashbord-etudiant']);
          }
        },
        (error) => {
          console.log(error);
          alert('Email ou Mot de passe incorrect. Veuillez réessayer.');
        }
      );
    }
    
  

  
  

}
