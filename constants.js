const APIConstants = {
  AuthenticationType: {
    BASIC: 'Basic',
    BEARER: 'Bearer',
    TOKEN: 'Token',
  },
  ContentType: {
    JSON: 'application/json',
    URLEncoded: 'application/x-www-form-urlencoded',
  },
  HTTPMethod: {
    GET: 'GET',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT',
  },
  StatusCode: {
    SUCCESS: 200,
    REDIRECTION: 300,
    CLIENT_ERROR: 400,
    SERVER_ERROR: 500,
  },
};

/* Export ==================================================================== */

module.exports = APIConstants;
module.exports.details = {
  title: 'APIConstants',
};
