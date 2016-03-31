//
// https://github.com/r-park/todo-angular2-firebase
//
import {EventEmitter} from 'angular2/core';

export class AuthService {
  private authData: FirebaseAuthData;
  private emitter: EventEmitter<any> = new EventEmitter();

  constructor(private ref: Firebase) {
    this.authData = this.ref.getAuth();

    this.ref.onAuth((authData: FirebaseAuthData) => {
      this.authData = authData;
      this.emit();
    });
  }

  get authenticated(): boolean {
    return this.authData !== null && !this.expired;
  }

  get expired(): boolean {
    return !this.authData || (this.authData.expires * 1000) < Date.now();
  }

  get id(): string {
    return this.authenticated ? this.authData.uid : '';
  }

  signInWithGithub(): Promise<any> {
    return this.authWithOAuth('github');
  }

  signInWithGoogle(): Promise<any> {
    return this.authWithOAuth('google');
  }

  signInWithTwitter(): Promise<any> {
    return this.authWithOAuth('twitter');
  }
  
  // Login existing user
  signInWithEmailPassword(email, password): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.authWithPassword({"email": email, "password": password}, (error: Error) => {
        if (error) {
          console.error('ERROR @ signInWithEmailPassword :', error);
          reject(error);
        }
        else {
          //console.log("Authenticated successfully:", this.authData);
          resolve();
        }
      });
    });
  }
  
  // Create new user
  signUpWithEmailPassword(email, password): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.createUser({"email": email, "password": password}, (error: Error) => {
        if (error) {
          console.error('ERROR @ createUserWithEmailPassword :', error);
          reject(error);
        }
        else {
          //console.log("User created successfully:", this.authData);
          resolve();
        }
      });
    });
  }

  signOut(): void {
    this.ref.unauth();
  }

  subscribe(next: (authenticated: boolean) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private authWithOAuth(provider: string): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.authWithOAuthPopup(provider, (error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#authWithOAuth :', error);
          reject(error);
        }
        else {
          resolve();
        }
      });
    });
  }

  private emit(): void {
    this.emitter.next(this.authenticated);
  }
  
  getUserProfile(userUid) {
    return new Promise((resolve, reject) => {
      this.ref.child('members').child(userUid).once('value', snapshot => {
        resolve(snapshot.val());
      })
    })
  }
  
}
