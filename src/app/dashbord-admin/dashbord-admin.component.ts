import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserAuthService } from '../_service/user-auth.service';

@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,MatToolbarModule,MatCardModule,
    MatButtonModule],
  templateUrl: './dashbord-admin.component.html',
  styleUrl: './dashbord-admin.component.css'
})
export class DashbordAdminComponent {

  constructor(
    private userAuthService: UserAuthService,
    private router : Router){}

  choose(){
  this.router.navigate(['/gestion-etudiant']);
  }
  
  logout(): void {
    this.userAuthService.logout();
    this.router.navigate(['/login']);
  }

}