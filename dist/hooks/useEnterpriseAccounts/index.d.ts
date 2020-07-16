import { ApolloError } from '@apollo/client';
import { EnterpriseAccountData } from './index.types';
export declare const ACCOUNTS_QUERY: import("@apollo/client").DocumentNode;
declare const useEnterpriseAccounts: () => {
    data: EnterpriseAccountData | null;
    loading: boolean;
    error?: string | ApolloError | undefined;
};
export default useEnterpriseAccounts;
