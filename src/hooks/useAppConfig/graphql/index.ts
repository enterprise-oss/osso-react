import { gql } from '@apollo/client';

export const APP_CONFIG_QUERY = gql`
  query AppConfig {
    appConfig {
      id
      name
      logoUrl
      contactEmail
    }
  }
`;

export const UPDATE_APP_CONFIG_MUTATION = gql`
  mutation UpdateAppConfig($input: UpdateAppConfigInput!) {
    updateAppConfig(input: $input) {
      appConfig {
        id
        name
        logoUrl
        contactEmail
      }
    }
  }
`;
