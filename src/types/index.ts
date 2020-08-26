import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ReactElement } from 'react';

export type AppConfig = {
  name?: string;
  logoUrl?: string;
  contactEmail?: string;
};

export enum Providers {
  Azure = 'AZURE',
  Okta = 'OKTA',
}

export type ProviderOption = {
  value: Providers;
  label: string;
  icon: string;
};

export type OssoButtonComponentProps = {
  children: ReactElement | string;
  onClick: () => void;
};

export type OssoLinkComponentProps = {
  children: ReactElement | string;
  href?: string;
  label: string;
};

export interface OssoInputProps {
  accept?: string;
  id: string;
  label: string;
  name?: string;
  value?: string;
  type: 'text' | 'textarea' | 'file';
  readOnly: boolean;
  copyable?: boolean;
  onChange?: (value: string) => void; // TODO:
}

export interface OssoInput {
  name: string;
  inputProps: OssoInputProps;
}

export type ProviderMap<T extends string> = { [key in T]: OssoProvider };

export type OssoGeneratedFieldKeys = 'manual' | 'documentationPdfUrl';
export type OssoGeneratedFields<T extends OssoGeneratedFieldKeys> = {
  manual: OssoInput[];
  documentationPdfUrl: OssoInputProps;
};

export type IdpGeneratedFieldKeys = 'metadataXml' | 'metadataUrl' | 'manual';

export type IdpGeneratedFields<T extends IdpGeneratedFieldKeys> = {
  [key in T]?: OssoInputProps | OssoInput[];
};

export type OssoProvider = {
  value: Providers;
  label: string;
  icon: string;
  ossoGeneratedFields: OssoGeneratedFields<Partial<OssoGeneratedFieldKeys>>;
  idpGeneratedFields: IdpGeneratedFields<Partial<IdpGeneratedFieldKeys>>;
  serviceProviderMetadata: boolean;
};

export enum IdentityProviderStatus {
  pending = 'Pending',
  configured = 'Configured',
  active = 'Active',
  error = 'Error',
}

export interface IdentityProvider {
  id: string;
  domain: string;
  documentationPdfUrl?: string;
  service: Providers;
  acsUrl?: string;
  ssoCert?: string;
  ssoUrl: string;
  status: IdentityProviderStatus;
  __typename?: 'IdentityProvider';
}

export interface ConfiguredIdentityProvider {
  acsUrl: string;
  domain: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseAccountData {
  enterpriseAccounts: {
    totalCount: number;
    edges: { node: EnterpriseAccount }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor?: string;
    };
  };
}

export type IdentityProviderFormState = {
  service?: Providers;
  ssoUrl?: string;
  ssoCert?: string;
};

export type OssoClientOptions = {
  uri: string;
  cors?: string;
};

export type OssoContextValue = {
  client?: ApolloClient<NormalizedCacheObject>;
  currentUser?: OssoUser;
};

export type OssoProviderProps = {
  children: ReactElement;
  client?: OssoClientOptions;
};

export type RedirectUri = {
  id: string;
  uri: string;
  primary: boolean;
};

export interface OauthClient {
  id?: string;
  name: string;
  clientId: string;
  clientSecret: string;
  redirectUris: RedirectUri[];
  createdAt: string;
  updatedAt: string;
}
export interface OAuthClientsData {
  oauthClients: OauthClient[];
}

export type OssoUser = {
  id: string;
  email: string;
  scope: 'admin' | 'internal' | 'end-user';
  oauthClientId?: string;
};
