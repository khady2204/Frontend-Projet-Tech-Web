import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private readonly userIdkey = 'userId'; // Stocker l'userId dans le localStorage

  constructor() { }
  public setRoles(roles:[]){
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles() : any[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  public setToken(jwtToken: string) : void{
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string{
    const token = localStorage.getItem('jwtToken');
    return token ? token : '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  // Stocke l'ID de l'utilisateur
  public setUserId(userId: string): void {
    localStorage.setItem(this.userIdkey, userId);
  }

  // Récupère l'ID de l'utilisateur
  public getUserId(): string | null {
    return localStorage.getItem(this.userIdkey);
  }

  // Supprime l'ID de l'utilisateur
  public removeUserId(): void {
    localStorage.removeItem(this.userIdkey);
  }
}


