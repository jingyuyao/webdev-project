export interface Identity {
  loggedIn: boolean;
  identityProvider?: IdentityProvider;
  name?: string;
  email?: string;
  idToken?: string;
}

export enum IdentityProvider {
  GOOGLE = 'GOOGLE',
}
