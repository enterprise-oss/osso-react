import { ApolloError } from '@apollo/client';
import { EnterpriseAccount } from './index.types';
declare const createEnterpriseAccount: () => {
    createAccount: (name: string, domain: string) => void;
    data?: EnterpriseAccount | undefined;
    loading: boolean;
    error?: ApolloError | undefined;
};
export default createEnterpriseAccount;
