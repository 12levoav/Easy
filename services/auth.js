import Http from '../utils/Http';

export const jwtAuth = (email, password) =>
  Http.post('some-url', {
    email: email,
    password: password,
  });

export const userRegister = (email, password, random_number) =>
  Http.post('some-url', {
    email: email,
    password: password,
    verification_code: random_number,
  });

export const getCompanyOffers = (page) =>
  Http.get('some-url', {params: {page: page}});

  //Much More API-s exist here, for all of the possible cases