import { IdentityProvider } from './identity.model';

export interface User {
  id: number;
  identityProvider: IdentityProvider;
  providedId: string;
  name: string;
  email: string;
  roles: Role[];
}

export enum Role {
  ADMIN = 'ADMIN',
}
