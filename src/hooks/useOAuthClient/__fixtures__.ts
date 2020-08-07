import faker from 'faker';

export const id = faker.random.uuid();

export default {
  oauthClient: {
    id,
    name: 'Production',
    clientId: '9b0b0925c44a0e0f20e8c62a5af9f6b7',
    clientSecret: '5122f0afe7c7a28ff53b87667756c734d83824b129c7f12a24ddb3b3a522d176',
    createdAt: '2020-08-07T13:50:37Z',
    updatedAt: '2020-08-07T13:50:37Z',
    redirectUris: [],
    __typename: 'OauthClient',
  },
};
