import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserAuthService } from '../_service/user-auth.service';

@Component({
  selector: 'app-dashbord-etudiant',
  standalone : true,
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatButtonModule,MatDividerModule, MatIconModule,
    MatCardModule],
  templateUrl: './dashbord-etudiant.component.html',
  styleUrl: './dashbord-etudiant.component.css'
})
export class DashbordEtudiantComponent {
  etudiant: any;

  constructor(private userService: UserService, private router: Router,
    private userAuthService: UserAuthService
    
  ) {}

  ngOnInit() {
    this.userService.getMonProfilEtudiant().subscribe(
      (data) => {
        this.etudiant = data;
        console.log("Étudiant reçu :", data);
      },
      (error) => {
        console.error('Erreur lors du chargement du profil étudiant', error);
      }
    );
  }

    
    logout(): void {
      this.userAuthService.logout();
      this.router.navigate(['/login']);
    }

}