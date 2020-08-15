import { gql } from '@apollo/client';

const DELETE_OAUTH_CLIENT_MUTATION = gql`
  mutation DeleteRedirectUri($input: DeleteOauthClientInput!) {
    deleteOauthClient(input: $input) {
      oauthClient {
        id
      }
    }
  }
`;

const OAUTH_CLIENT_QUERY = gql`
  query OAuthClient($id: ID!) {
    oauthClient(id: $id) {
      id
      name
      clientId
      clientSecret
      redirectUris {
        id
        uri
        primary
      }
      createdAt
      updatedAt
    }
  }
`;

const REGENERATE_CREDENTIALS_MUTATION = gql`
  mutation RegenerateOauthCredentials($input: RegenerateOauthCredentialsInput!) {
    regenerateOauthCredentials(input: $input) {
      oauthClient {
        id
        name
        clientId
        clientSecret
        redirectUris {
          id
          uri
          primary
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const SET_REDIRECT_URIS = gql`
  mutation SetRedirectUris($input: SetRedirectUrisInput!) {
    setRedirectUris(input: $input) {
      oauthClient {
        id
        name
        clientId
        clientSecret
        redirectUris {
          id
          uri
          primary
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export { DELETE_OAUTH_CLIENT_MUTATION, OAUTH_CLIENT_QUERY, REGENERATE_CREDENTIALS_MUTATION, SET_REDIRECT_URIS };
