import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ReactElement } from 'react';
export declare enum Providers {
    Azure = "AZURE",
    Okta = "OKTA"
}
export interface OssoInputProps {
    id: string;
    label: string;
    value?: string;
    type: 'text' | 'textarea' | 'file';
    readOnly: boolean;
    copyable?: boolean;
    onChange?: (value: string) => void;
}
export interface OssoInput {
    name: string;
    inputProps: OssoInputProps;
}
export declare type ProviderMap<T extends string> = {
    [key in T]: OssoProvider;
};
export declare type IdpGeneratedFieldKeys = 'metadataXml' | 'metadataUrl' | 'manual';
export declare type IdpGeneratedFields<T extends IdpGeneratedFieldKeys> = {
    [key in T]?: OssoInputProps | OssoInput[];
};
export declare type OssoProvider = {
    value: Providers;
    label: string;
    ossoGeneratedFields: OssoInput[];
    idpGeneratedFields: IdpGeneratedFields<Partial<IdpGeneratedFieldKeys>>;
    serviceProviderMetadata: boolean;
};
export interface IdentityProvider {
    id: string;
    service: Providers;
    acsUrl?: string;
    [value: string]: string | Providers | undefined;
}
declare enum Status {
    new = "new",
    active = "ACTIVE"
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
export declare type IdentityProviderFormState = {
    service?: Providers;
    ssoUrl?: string;
    ssoCert?: string;
};
export declare type OssoClientOptions = {
    uri: string;
    cors?: string;
};
export declare type OssoContextValue = {
    client?: ApolloClient<NormalizedCacheObject>;
};
export declare type OssoProviderProps = {
    children: ReactElement;
    client?: OssoClientOptions;
};
export {};
