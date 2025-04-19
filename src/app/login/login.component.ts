import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router,
    private userService : UserService,
    private userAuthService : UserAuthService){}

  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (Response: any) => {
        if (!Response.user || !Array.isArray(Response.user.role) || Response.user.role.length === 0) {
          alert('Erreur : Rôle utilisateur non défini');
          return;
      }
        this.userAuthService.setRoles(Response.user.role);
        this.userAuthService.setToken(Response.jwtToken);
        this.userAuthService.setUserId(Response.user.userEmail);

        const role = Response.user.role[0].roleName;
        if(role === 'Admin'){
          this.router.navigate(['']);
        } else {
          this.router.navigate(['']);
        }
      },
      (error)=>{
        console.log(error);
        alert('Email ou Mot de passe incorrect. Veuillez réessayer.');
      }
    );
  }

  
  

}
