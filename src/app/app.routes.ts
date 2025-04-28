import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { GestionEtudiantComponent } from './gestion-etudiant/gestion-etudiant.component';
import { DashbordEtudiantComponent } from './dashbord-etudiant/dashbord-etudiant.component';
import { AjouterEtudiantComponent } from './ajouter-etudiant/ajouter-etudiant.component';
import { ModifierEtudiantComponent } from './modifier-etudiant/modifier-etudiant.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashbord-admin', component: DashbordAdminComponent },
    { path: 'gestion-etudiant' , component: GestionEtudiantComponent},
    { path: 'ajouter-etudiant' , component: AjouterEtudiantComponent},
    { path: 'dashbord-etudiant' , component: DashbordEtudiantComponent},
    { path: 'etudiants/modifier/:id', component: ModifierEtudiantComponent},
];
