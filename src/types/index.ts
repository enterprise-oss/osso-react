import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { CSSProperties, ReactElement } from 'react';

export type AppConfig = {
  name?: string;
  logoUrl?: string;
  contactEmail?: string;
};

export enum Providers {
  Azure = 'AZURE',
  Okta = 'OKTA',
  OneLogin = 'ONELOGIN',
  Google = 'GOOGLE',
  Ping = 'PING',
  Salesforce = 'SALESFORCE',
}

export type ProviderOption = {
  value: Providers;
  label: string;
  iconUrl: string;
};

export type OssoButtonComponentProps = {
  children: ReactElement | string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
};

export type OssoLinkComponentProps = {
  children: ReactElement | string;
  href?: string;
  label: string;
};

export type OssoPdfProps = {
  x: number;
  y: number;
  size?: number;
};

export type OssoPdfField = {
  name: string;
  pdfProps: OssoPdfProps;
};

export interface OssoInputProps {
  accept?: string;
  id: string;
  label: string;
  name?: string;
  value?: string;
  error?: any;
  style?: CSSProperties;
  autoComplete?: 'email' | 'password';
  type: 'text' | 'textarea' | 'file' | 'password' | 'email';
  readOnly?: boolean;
  copyable?: boolean;
  onChange?: (value: string) => void; // TODO:
  required?: boolean;
}

export interface OssoInput {
  name: string;
  inputProps: OssoInputProps;
  pdfProps: OssoPdfProps;
}

export type ProviderMap<T extends string> = { [key in T]: OssoProvider };

export type OssoGeneratedFieldKeys = 'manual' | 'appFields';
export type OssoGeneratedFields<_T extends OssoGeneratedFieldKeys> = {
  manual: OssoInput[];
  appDetails: OssoPdfField[];
};

export type IdpGeneratedFieldKeys = 'metadataXml' | 'metadataUrl' | 'manual';

export type IdpGeneratedFields<T extends IdpGeneratedFieldKeys> = {
  [key in T]?: OssoInputProps | OssoInput[];
};

export type OssoProvider = {
  value: Providers;
  label: string;
  iconUrl: string;
  ossoGeneratedFields: OssoGeneratedFields<Partial<OssoGeneratedFieldKeys>>;
  idpGeneratedFields: IdpGeneratedFields<Partial<IdpGeneratedFieldKeys>>;
  serviceProviderMetadata: boolean;
  oauthClient?: OauthClient;
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
  service: Providers;
  acsUrl?: string;
  acsUrlValidator?: string;
  ssoCert?: string;
  ssoIssuer?: string;
  ssoUrl: string;
  status: IdentityProviderStatus;
  // oauthClient?: OauthClient;
  __typename?: 'IdentityProvider';
}

export interface ConfiguredIdentityProvider {
  acsUrl: string;
  domain: string;
  ssoIssuer: string;
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
  usersCount: number;
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
  baseUrl?: string;
  cors?: string;
  jwt?: string;
  onUnauthorized?: () => void;
};

export type OssoContextValue = {
  baseUrl?: string;
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

export type AdminUser = {
  id: string;
  email: string;
  role: 'admin' | 'internal' | 'end-user';
  oauthClientId?: string;
};

export interface AdminUsersData {
  adminUsers: AdminUser[];
}
