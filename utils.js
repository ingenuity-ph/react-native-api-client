import {
  AsyncStorage,
} from '@ingenuity-labs/react-native-async-storage-wrapper';


const APIUtils = {
  getAccessToken: () => AsyncStorage.getObjectWithIdentifier('user.accessToken'),

  setAccessToken: async (token) => {
    AsyncStorage.setObjectWithIdentifier(token, 'user.accessToken');
  },

};

/* Export ==================================================================== */

module.exports = APIUtils;
module.exports.details = {
  title: 'APIUtils',
};
