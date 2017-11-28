# react-native-api-client-wrapper [![NPM version](https://badge.fury.io/js/react-native-api-client-wrapper.svg)](https://npmjs.org/package/react-native-api-client-wrapper) [![Build Status](https://travis-ci.org/jasonjonecarreos/react-native-api-client-wrapper.svg?branch=master)](https://travis-ci.org/jasonjonecarreos/react-native-api-client-wrapper)

> An API client wrapper for React Native only projects thru the initiative of Ingenuity Labs.

## Installation

To install the package, enter the command in your terminal:
```sh
$ npm install --save react-native-api-client-wrapper
```

## Usage
### APIClient
The `APIClient` is a class that requires two(2) parameters for its constructor: `url` and `method`. Initializing a new instance is as follows:

```js
import { APIClient, APIConstants } from 'react-native-api-client-wrapper';

let url = 'https://www.sample.com/contents/';
let client = new APIClient(url, APIConstants.HTTPMethod.GET);
```

The `client` instance then has access to the `sendAuthenticatedRequest` and `sendRequest` methods.

Both `sendAuthenticatedRequest` and `sendRequest` takes two(2) arguments: `headers` and `params`. `headers` is where request-specific headers are provided in the form of a dictionary, while `params` represents the body (if provided for a `POST` or `PUT` request), or appended to the url as a querystring (if provided for a `GET` or `DELETE` request).

A sample use case of its implementation is as such:
```
let url = 'https://www.sample.com/login';
let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
let params = {
  email: email,
  password: password,
};
let client = new APIClient(url, APIConstants.HTTPMethod.POST);

return client.sendRequest(headers, params);
```

`sendAuthenticatedRequest` has the same set of arguments to the `sendRequest` method, with the addition of the `authType`. It defines the `Authorization` type of the stored API access token to be used as addition to the request header.

```
let url = 'https://www.sample.com/contents/';
let client = new APIClient(url, APIConstants.HTTPMethod.GET);

return client.sendAuthenticatedRequest('Token');
```

In this sample, the `authType` is defined as `Token`. As such, the request's `Authorization` header value is: `Token <access_token>`. Also, no headers and params are provided to the function, which all defaults to empty dictionaries.

These two methods returns a `Promise` object, to allow case-specific handling of its success and error states.

Both `success` and `error` responses contain the ff. properties:
> * headers
> * ok
> * status
> * statusText
> * type
> * url
> * _bodyInit
> * _bodyText

When the response's `ok` property is `true`, it means that it is within range of the recognized success status codes, thus, the API client returns the response as is.

For error responses however, error messages are either in the `statusText` or as a JSON string dictionary in the `_bodyText`. The API client will return both these properties in the form of a JSON string dictionary with the ff. structure:

```
let errorMessages = {
  'status_message': response.statusText,
  'server_message': response._bodyText
};
```

This will allow the option to select the proper error message to display to users.

### APIConstants
Contains the dictionary `AuthenticationType`, `ContentType`, `HTTPMethod`, and `StatusCode`, which is used within the client.
```
AuthenticationType: {
  BASIC: 'Basic',
  BEARER: 'Bearer',
  TOKEN: 'Token',
}
```
> Values used for the ```Authorization: <AuthenticationType> <Token>``` header.
```
ContentType: {
  JSON: 'application/json',
  URLEncoded: 'application/x-www-form-urlencoded'
},
```
> Values used for the ```Accept: <ContentType>``` and/or ```Content-Type: <ContentType>``` header(s).
```
HTTPMethod: {
  GET: 'GET',
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT'
}
```
> Values used for specifying the method of the specified request.
```
StatusCode: {
  SUCCESS: 200,
  REDIRECTION: 300,
  CLIENT_ERROR: 400,
  SERVER_ERROR: 500
}
```
> Values used for checking the status code of the request.

### APIUtils

A collection of functions that can be used outside of the main `APIClient`. These methods are the ff:

```
convertQueryString: (queryParams = {}) => {
  // Creates a string formatted as a queryString given the provided dictionary, for it to be appended in a url.
}
```
```
getAccessToken: () => {
  // Retrieves the currently stored access token to be used for the Authorization header value.
}
```
```
setAccessToken: async (token) => {
  // Stores the access token to be used for the Authorization header value.
}
```

## License

ISC © [Jason Jon E. Carreos]()
