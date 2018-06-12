export interface Identity {
  identityProvider: IdentityProvider;
  signedIn: boolean;
  name?: string;
  email?: string;
  idToken?: string;
}

export enum IdentityProvider {
  GOOGLE = 'GOOGLE',
}
