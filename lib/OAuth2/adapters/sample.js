OAuth2.adapter('sample', {
  /**
   * @return {URL} URL to the page that returns the authorization code
   */
  authorizationCodeURL: function(config) {
    return ("https://integrate.37signals.com/" +
      "client_id={{CLIENT_ID}}&" +
      "redirect_uri={{REDIRECT_URI}}&" +
      "scope={{API_SCOPE}}&" +
      "access_type=offline&" +
      "response_type=code")
        .replace("{{CLIENT_ID}}", config.clientId)
        .replace("{{REDIRECT_URI}}", this.redirectURL(config))
        .replace("{{API_SCOPE}}", config.apiScope);
  },

  /**
   * @return {URL} URL to the page that we use to inject the content
   * script into
   */
  redirectURL: function(config) {
    return "http://nicoworkspace.free.fr/";
  },

  /**
   * @return {String} Authorization code for fetching the access token
   */
  parseAuthorizationCode: function(url) {
    return "";
  },

  /**
   * @return {URL} URL to the access token providing endpoint
   */
  accessTokenURL: function() {
    return "https://launchpad.37signals.com/authorization/token";
  },

  /**
   * @return {String} HTTP method to use to get access tokens
   */
  accessTokenMethod: function() {
    return "POST";
  },

  /**
   * @return {Object} The payload to use when getting the access token
   */
  accessTokenParams: function(authorizationCode, config) {
    return {
      code: authorizationCode,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: this.redirectURL(config),
      grant_type: "authorization_code"
    };
  },

  /**
   * @return {Object} Object containing accessToken {String},
   * refreshToken {String} and expiresIn {Int}
   */
  parseAccessToken: function(response) {
    return {
      accessToken: "",
      refreshToken: "",
      expiresIn: Number.MAX_VALUE
    };
  }
});
