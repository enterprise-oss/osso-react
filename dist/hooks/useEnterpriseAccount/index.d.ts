import { ApolloError } from '@apollo/client';
import { EnterpriseAccount } from './index.types';
export declare const ACCOUNT_QUERY: import("@apollo/client").DocumentNode;
declare const useEnterpriseAccount: (domain: string) => {
    data: {
        enterpriseAccount?: EnterpriseAccount;
    };
    loading: boolean;
    error?: ApolloError | undefined;
};
export default useEnterpriseAccount;
