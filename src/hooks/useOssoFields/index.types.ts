export enum Providers {
  Azure = 'AZURE',
  Okta = 'OKTA',
}

export interface OssoInputProps {
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
