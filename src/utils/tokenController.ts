export class TokenController {
  ACCESS_TOKEN_KEY: string;

  TOKEN_EXPIRY_TIME_KEY: string;

  constructor() {
    this.ACCESS_TOKEN_KEY = "access_token_key";
    this.TOKEN_EXPIRY_TIME_KEY = "token_expiry_time_key";
  }

  getAccessToken() {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getTokenExpiryTime() {
    return sessionStorage.getItem(this.TOKEN_EXPIRY_TIME_KEY);
  }

  setAccessToken(accessToken: string) {
    sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  setTokenExpiryTime() {
    const oneHourLater = new Date()
      .setHours(new Date().getHours() + 1)
      .toString();
    sessionStorage.setItem(this.TOKEN_EXPIRY_TIME_KEY, oneHourLater);
  }

  isTokenExpired() {
    const time = this.getTokenExpiryTime();
    return !time || time < new Date().getTime().toString();
  }

  clear() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_EXPIRY_TIME_KEY);
  }
}
