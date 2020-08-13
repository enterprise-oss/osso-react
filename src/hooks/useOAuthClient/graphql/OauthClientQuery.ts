import { gql } from '@apollo/client';

export default gql`
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
