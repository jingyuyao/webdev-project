import { Injectable, NgZone } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Handles integration with Google sign-in. Exposes functionalities as observables.
 * Fails silently when the API could not be loaded or when third-party cookies are blocked.
 *
 * References:
 * - https://stackoverflow.com/a/42782430
 * - https://stackoverflow.com/a/50616780
 */
@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private static readonly CLIENT_ID = '941505616508-7942kmf4veq3rh8apuqj8itjch246rgb.apps.googleusercontent.com';
  private static readonly SCOPE = 'profile email openid';

  currentUser$ = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  isSignedIn$ = this.currentUser$.pipe(map(user => user.isSignedIn()));
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
            user => this.zone.run(() => this.currentUser$.next(user)));

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

  render(elementId: string) {
    this.auth2$.subscribe(() => gapi.signin2.render(elementId, {
      scope: IdentityService.SCOPE,
    }));
  }

  logOut() {
    this.auth2$.subscribe(auth2 => {
      auth2.signOut();
    });
  }
}
