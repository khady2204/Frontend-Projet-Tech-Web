import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-modifier-etudiant',
  imports: [FormsModule, RouterModule,
    ReactiveFormsModule, MatToolbarModule,MatCardModule,MatDividerModule,
    MatButtonModule, MatTableModule
  ],
  templateUrl: './modifier-etudiant.component.html',
  styleUrl: './modifier-etudiant.component.css'
})
export class ModifierEtudiantComponent {

  etudiantForm!: FormGroup;
  etudiantId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private userAuthService : UserAuthService
  ) {}
   

  ngOnInit(): void {
    this.etudiantForm = this.fb.group({
    userNom: ['', Validators.required],
    userPrenom: ['', Validators.required],
    dateNaissance: ['',Validators.required],
    userEmail: ['', [Validators.required, Validators.email]],
    formations: ['', Validators.required],
    promo: ['', Validators.required],
    ine: ['', Validators.required],
    niveau: ['', Validators.required],
    annee: ['', Validators.required],
    eno: ['', Validators.required],
    });
  
  // Récupération de l'ID depuis l'URL
  this.etudiantId = this.route.snapshot.paramMap.get('id') || '';

  if (this.etudiantId) {
    this.userService.getEtudiantById(this.etudiantId).subscribe(data => {
      this.etudiantForm.patchValue(data);
    });
  }
}

onSubmit(): void {
  if (this.etudiantForm.valid) {
    const token = this.userAuthService.getToken();
    this.userService.updateEtudiant(this.etudiantId, this.etudiantForm.value, token).subscribe(() => {
      alert('Étudiant modifié avec succès !');
      this.router.navigate(['/gestion-etudiant']);
    });
  }
}


logout(): void {
  this.userAuthService.logout();
  this.router.navigate(['/login']);
}

}
