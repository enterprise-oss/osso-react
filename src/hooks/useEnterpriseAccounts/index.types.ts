import { Providers } from '../useOssoFields/index.types';

interface IdentityProvider {
  id: string;
  service: Providers;
  acsUrl?: string;
  [value: string]: string | Providers | undefined;
}

enum Status {
  new = 'new',
  active = 'ACTIVE',
}

export interface EnterpriseAccount {
  id?: string;
  key: string;
  name: string;
  domain: string;
  status: Status;
  identityProviders: IdentityProvider[];
}

export interface EnterpriseAccountData {
  enterpriseAccounts: EnterpriseAccount[];
}
