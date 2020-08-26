import faker from 'faker';

export const id = faker.random.uuid();

export default {
  appConfig: {
    id,
    name: 'SaaS App',
    logoUrl: 'https://s3.aws.example.com/logo.png',
    contactEmail: 'support@saasapp.com',
    __typename: 'AppConfig',
  },
};
