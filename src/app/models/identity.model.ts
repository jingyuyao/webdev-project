export interface Identity {
  identityProvider: IdentityProvider;
  loggedIn: boolean;
  name?: string;
  email?: string;
  idToken?: string;
}

export enum IdentityProvider {
  GOOGLE = 'GOOGLE',
}
