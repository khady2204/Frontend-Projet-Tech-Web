import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

PATH_OF_API = "http://localhost:8080";

RequestHeader=new HttpHeaders({
  "No-Auth":"True"
})
  constructor(private httpclient: HttpClient,
    private userAuthService: UserAuthService) { }

    public register(userData:{}){
      return this.httpclient.post(
        this.PATH_OF_API + "/api/auth/register", userData);
    }
    
    getEtudiants(): Observable<any[]> {
      const token = localStorage.getItem('jwtToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpclient.get<any[]>(`${this.PATH_OF_API}/api/users/etudiants`, { headers });
    }

    public login(connectionData: { userEmail: string; userPassword: string }) : Observable<any>{
  
    
        // Récupère le token JWT du localStorage (si déjà connecté)
        const token = localStorage.getItem('jwtToken');
    
        // Ajoute le token à l'en-tête 'Authorization' si il existe
        if (token) {
          this.RequestHeader = this.RequestHeader.set('Authorization', `Bearer ${token}`);
        }
         return this.httpclient.post(
          this.PATH_OF_API + "/api/auth/login", connectionData,
          {headers: this.RequestHeader}).pipe(
            // Lorsque la réponse arrive, on l'utilise pour stocker le token dans le localStorage
            tap((response: any) => {
              if (response && response.token) {
                localStorage.setItem('jwtToken', response.token);
              }
            })
          );
        }
      
    
    public roleMatch(allowedRoles: string[]): boolean {
      let isMatch = false;
      const userRoles: any = this.userAuthService.getRoles(); // Récupération des rôles de l'utilisateur
    
      if (userRoles !== null && userRoles) {
        for (let i = 0; i < userRoles.length; i++) {
          if (allowedRoles.includes(userRoles[i].roleName)) {
            isMatch = true;
            break; // Si un rôle autorisé est trouvé, on sort de la boucle
          }
        }
      }
      return isMatch;
    }
    getEtudiantById(id: string): Observable<any> {
      const token = localStorage.getItem('jwtToken');
      const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
  });

      return this.httpclient.get<any>(`${this.PATH_OF_API}/api/users/etudiants/${id}`, { headers });
    }
  
   // Update user information (firstName, lastName, email)
   updateEtudiant(id: string, userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpclient.put<any>(`${this.PATH_OF_API}/api/users/etudiants/${id}`, userData, { headers });
   }
}