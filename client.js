import APIConstants from './constants';
import APIUtils from './utils';

import _ from 'lodash';


function _convertQueryString(queryParams = {}) {
  let esc = encodeURIComponent;
  let query = Object.keys(queryParams)
    .map(key => esc(key) + '=' + esc(queryParams[key]))
    .join('&');

  return query ? `?${query}` : '';
};

function _fetchRequest(url, fetchParams, resolve, reject) {
  fetch(url, fetchParams)
  .then((response) => {
    if (!response.ok) {
      let errorMessages = {
        'status_message': response.statusText,
        'server_message': response._bodyText
      };

      throw Error(JSON.stringify(errorMessages));
    }

    return response;
  })
  .then((response) => response.json())
  .then((responseData) => {
    resolve(responseData);
  })
  .catch((error) => {
    reject(error);
  });
}

function _performRequest(headers, params, authorize, authType = null) {
  return new Promise(async (resolve, reject) => {
    let fetchParams = {
      method: this.method,
      headers: headers
    };

    if (_.size(params) > 0) {
      switch (this.method) {
        case APIConstants.HTTPMethod.GET:
        case APIConstants.HTTPMethod.DELETE:
          this.url = this.url + _convertQueryString(params);

          break;
        case APIConstants.HTTPMethod.POST:
        case APIConstants.HTTPMethod.PUT:
          fetchParams.body = JSON.stringify(params);

          break;
      }
    }

    if (authorize) {
      APIUtils.getAccessToken().then((token) => {
        fetchParams.headers.Authorization = `${authType} ${token}`;

        _fetchRequest(this.url, fetchParams, resolve, reject);
      });
    } else {
      _fetchRequest(this.url, fetchParams, resolve, reject);
    }
  });
}

class APIClient {

  constructor(url, method) {
    this.url = url;
    this.method = method;
  }

  sendAuthenticatedRequest(authType, headers = {}, params = {}) {
    return _performRequest.bind(this)(headers, params, true, authType);
  }

  sendRequest(headers = {}, params = {}) {
    return _performRequest.bind(this)(headers, params, false);
  }

}

/* Export ==================================================================== */

module.exports = APIClient;
module.exports.details = {
  title: 'APIClient',
};
