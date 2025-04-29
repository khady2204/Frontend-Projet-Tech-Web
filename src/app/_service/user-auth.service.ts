import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private readonly userIdkey = 'userId'; // Stocker l'userId dans le localStorage

  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('jwtToken');
    }
  }
  
  removeRoles(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('roles');
    }
  }
  
  removeEmail(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('userEmail');
    }
  }

  logout(): void {
    this.removeUserId();
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('userEmail');
  }
  
  // Vérifie si l'environnement est un navigateur
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  public setRoles(roles: string[]): void {
    if (this.isBrowser()) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }

  public getRoles(): any[] {
    if (this.isBrowser()) {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  public setToken(jwtToken: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string {
    if (this.isBrowser()) {
      const token = localStorage.getItem('jwtToken');
      return token ? token : '';
    }
    return '';
  }

  public clear(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  public isLoggedIn(): boolean {
    return this.getRoles().length > 0 && this.getToken().length > 0;
  }

  // Stocke l'ID de l'utilisateur
  public setUserId(userId: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.userIdkey, userId);
    }
  }

  // Récupère l'ID de l'utilisateur
  public getUserId(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.userIdkey);
    }
    return null;
  }

  // Supprime l'ID de l'utilisateur
  public removeUserId(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.userIdkey);
    }
  }
}


