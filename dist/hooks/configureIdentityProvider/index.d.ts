import { ApolloError } from '@apollo/client';
import { IdentityProvider, IdentityProviderFormState } from './index.types';
declare const configureIdentityProvider: () => {
    configureProvider: (id: string, providerData: IdentityProviderFormState) => void;
    data?: IdentityProvider | undefined;
    loading: boolean;
    error?: ApolloError | undefined;
};
export default configureIdentityProvider;
