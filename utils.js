import {
    AsyncStorage
} from 'react-native';


const APIUtils = {

  convertQueryString: (queryParams = {}) => {
    let esc = encodeURIComponent;
    let query = Object.keys(queryParams)
      .map(k => esc(k) + '=' + esc(queryParams[k]))
      .join('&');

    return query ? `?${query}` : '';
  },

  getAccessToken: () => {
    return new Promise(async function(resolve, reject) {
      try {
        var token = await AsyncStorage.getItem('user.accessToken');

        resolve(token);
      } catch (error) {
        console.log(String.format('%s - %s', 'Error getting access token', error));

        reject();
      }
    });
  },

  setAccessToken: async (token) => {
    try {
      await AsyncStorage.setItem('user.accessToken', token);
    } catch (error) {
      console.log(String.format('%s - %s', 'Error setting access token', error));
    }
  },

};

/* Export ==================================================================== */

module.exports = APIUtils;
module.exports.details = {
  title: 'APIUtils',
};
