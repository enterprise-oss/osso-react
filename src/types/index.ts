export enum Providers {
  Azure = 'AZURE',
  Okta = 'OKTA',
}

export interface OssoInputProps {
  id: string;
  label: string;
  value?: string;
  type: 'text' | 'file';
  readOnly: boolean;
  copyable?: boolean;
}

export interface OssoInput {
  name: string;
  inputProps: OssoInputProps;
}

export type ProviderMap<T extends string> = { [key in T]: OssoProviderDetails };

export type OssoProviderDetails = {
  value: Providers;
  label: string;
  ossoGeneratedFields: OssoInput[];
  idpGeneratedFields: OssoInput[];
  serviceProviderMetadata: boolean;
  idpMetadata: boolean;
};

export interface IdentityProvider {
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
