import { Injectable, NgZone } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

/**
 * Handles integration with Google sign-in. Exposes functionalities as
 * observables. Fails silently when the API could not be loaded or when
 * third-party cookies are blocked.
 *
 * References:
 * - https://stackoverflow.com/a/42782430
 * - https://stackoverflow.com/a/50616780
 */
@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private static readonly CLIENT_ID =
    '941505616508-7942kmf4veq3rh8apuqj8itjch246rgb.apps.googleusercontent.com';
  private static readonly SCOPE = 'profile email openid';

  private currentIdentity$ = new ReplaySubject<Identity>(1);
  private auth2$ = new ReplaySubject<gapi.auth2.GoogleAuth>(1);

  constructor(private zone: NgZone) {
    if (gapi) {
      gapi.load('auth2', {
        callback: () => {
          const auth2 = gapi.auth2.init({
            client_id: IdentityService.CLIENT_ID,
            scope: IdentityService.SCOPE,
          });

          auth2.currentUser.listen(
            user => this.zone.run(
              () => this.currentIdentity$.next(this.convert(user))));

          this.zone.run(() => {
            this.auth2$.next(auth2);
            this.auth2$.complete();
          });
        },
        onerror: () => this.zone.run(() => {
          console.error('unable to load gapi.auth2');
          this.auth2$.complete();
        }),
      });
    } else {
      console.error('gapi does not exist');
      this.auth2$.complete();
    }
  }

  getCurrentIdentity(): Observable<Identity> {
    return this.currentIdentity$.asObservable();
  }

  renderSignInButton(elementId: string) {
    this.auth2$.subscribe(() => gapi.signin2.render(elementId, {
      scope: IdentityService.SCOPE,
    }));
  }

  logOut() {
    this.auth2$.subscribe(auth2 => {
      auth2.signOut();
    });
  }

  private convert(user: gapi.auth2.GoogleUser): Identity {
    const signedIn = user.isSignedIn();
    const profile = user.getBasicProfile();
    const authResponse = user.getAuthResponse();
    return {
      signedIn: signedIn,
      name: signedIn ? profile.getName() : null,
      email: signedIn ? profile.getEmail() : null,
      idToken: signedIn ? authResponse.id_token : null,
    };
  }
}

export interface Identity {
  signedIn: boolean;
  name?: string;
  email?: string;
  idToken?: string;
}
