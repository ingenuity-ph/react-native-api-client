import _ from 'lodash';

import APIConstants from './constants';
import APIUtils from './utils';

function convertQueryString(queryParams = {}) {
  const esc = encodeURIComponent;
  const query = Object.keys(queryParams)
    .map(key => `${esc(key)}=${esc(queryParams[key])}`)
    .join('&');

  return query ? `?${query}` : '';
}

function fetchRequest(url, fetchParams, resolve, reject) {
  fetch(url, fetchParams)
    .then((response) => {
      if (!response.ok) {
        const errorMessages = {
          status_message: response.statusText,
          server_message: response._bodyText,
        };

        throw Error(JSON.stringify(errorMessages));
      }

      return response;
    })
    .then(response => response.json())
    .then((responseData) => {
      resolve(responseData);
    })
    .catch((error) => {
      reject(error);
    });
}

function performRequest(headers, params, authorize, authType = null) {
  return new Promise(async (resolve, reject) => {
    const fetchParams = {
      method: this.method,
      headers,
    };

    if (_.size(params) > 0) {
      switch (this.method) {
        case APIConstants.HTTPMethod.GET:
        case APIConstants.HTTPMethod.DELETE:
          this.url = this.url + convertQueryString(params);

          break;
        case APIConstants.HTTPMethod.PATCH:
        case APIConstants.HTTPMethod.POST:
        case APIConstants.HTTPMethod.PUT:
          fetchParams.body = JSON.stringify(params);

          break;
        default:
          break;
      }
    }

    if (authorize) {
      APIUtils.getAccessToken().then((token) => {
        fetchParams.headers.Authorization = `${authType} ${token}`;

        fetchRequest(this.url, fetchParams, resolve, reject);
      });
    } else {
      fetchRequest(this.url, fetchParams, resolve, reject);
    }
  });
}

class APIClient {
  constructor(url, method) {
    this.url = url;
    this.method = method;
  }

  sendAuthenticatedRequest(authType, headers = {}, params = {}) {
    return performRequest.bind(this)(headers, params, true, authType);
  }

  sendRequest(headers = {}, params = {}) {
    return performRequest.bind(this)(headers, params, false);
  }
}

/* Export ==================================================================== */

module.exports = APIClient;
module.exports.details = {
  title: 'APIClient',
};
