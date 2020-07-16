import { ApolloError } from '@apollo/client';
import { EnterpriseAccount, Providers } from './index.types';
declare const createIdentityProvider: () => {
    createProvider: (enterpriseAccountId: string, providerService: Providers) => void;
    data?: EnterpriseAccount[] | undefined;
    loading: boolean;
    error?: ApolloError | undefined;
};
export default createIdentityProvider;
