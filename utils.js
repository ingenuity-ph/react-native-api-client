import {
  AsyncStorage
} from '@ingenuity-labs/react-native-async-storage-wrapper';


const APIUtils = {

  convertQueryString: (queryParams = {}) => {
    let esc = encodeURIComponent;
    let query = Object.keys(queryParams)
      .map(k => esc(k) + '=' + esc(queryParams[k]))
      .join('&');

    return query ? `?${query}` : '';
  },

  getAccessToken: () => {
    return AsyncStorage.getObjectWithIdentifier('user.accessToken');
  },

  setAccessToken: async (token) => {
    AsyncStorage.setObjectWithIdentifier(token, 'user.accessToken');
  },

};

/* Export ==================================================================== */

module.exports = APIUtils;
module.exports.details = {
  title: 'APIUtils',
};
