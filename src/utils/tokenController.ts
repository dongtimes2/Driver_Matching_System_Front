export class TokenController {
  ACCESS_TOKEN_KEY: string;

  TOKEN_EXPIRY_TIME_KEY: string;

  constructor() {
    this.ACCESS_TOKEN_KEY = "access_token_key";
    this.TOKEN_EXPIRY_TIME_KEY = "token_expiry_time_key";
  }

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getTokenExpiryTime() {
    return localStorage.getItem(this.TOKEN_EXPIRY_TIME_KEY);
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  setTokenExpiryTime() {
    const oneHourLater = new Date()
      .setHours(new Date().getHours() + 1)
      .toString();
    localStorage.setItem(this.TOKEN_EXPIRY_TIME_KEY, oneHourLater);
  }

  isTokenExpired() {
    const time = this.getTokenExpiryTime();
    return !time || time < new Date().getTime().toString();
  }

  clear() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_TIME_KEY);
  }
}
