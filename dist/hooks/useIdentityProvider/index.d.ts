import { ApolloError } from '@apollo/client';
import { IdentityProvider } from './index.types';
declare const useProvider: (providerId: string) => {
    data?: {
        identityProvider: IdentityProvider;
    } | undefined;
    loading: boolean;
    error?: ApolloError | undefined;
};
export default useProvider;
