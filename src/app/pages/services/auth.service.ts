import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<string | null>(this.getCurrentUser());
  public currentUserObservable$ = this.currentUser$.asObservable();

  constructor() { }

  private getCurrentUser(): string | null {
    return sessionStorage.getItem('currentUser');
  }

  login(username: string) {
    sessionStorage.setItem('currentUser', username);
    this.currentUser$.next(username);
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUser$.next(null);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUserValue(): string | null {
    return this.currentUser$.getValue();
  }
}
