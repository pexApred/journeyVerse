// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './localStorage';

class AuthService {
  // get user data
  getProfile() {
    const token = getFromLocalStorage('id_token');
    if (token) {
      try {
        const decodedToken = decode(token);
        return decodedToken.data;
      } catch (err) {
        console.log('Error decoding token', err);
        return null;
      }
    }
    return null;
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getTokenFromStorage();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      console.log('Error decoding token', err);
      return true;
    }
  }

  getTokenFromStorage() {
    // Retrieves the user token from localStorage
    return getFromLocalStorage('id_token');
  }
  
  login(idToken, callback) {
    // Saves user token to localStorage
    saveToLocalStorage('id_token', idToken);
    const profile = this.getProfile();
    
    if (profile) {
      saveToLocalStorage('profile', JSON.stringify(profile));
      if (profile.savedJourneys) {
        saveToLocalStorage('journeys', JSON.stringify(profile.savedJourneys));
      }
    }

    if(callback && this.loggedIn()) {
      callback();
    }
  }

  logout() {
    // Clear user token and profile data from localStorage
    removeFromLocalStorage('id_token');
    removeFromLocalStorage('profile');
    removeFromLocalStorage('journeys');
    removeFromLocalStorage('journeyData');
    // clearLocalStorage();
  }

  isAuthenticated() {
    const token = this.getTokenFromStorage();
    if (!token) return false;
    try {
      const { exp } = decode(token);
      // Check if token is expired
      if (Date.now() >= exp * 1000) {
        console.log('Token has expired.');
        this.logout(); // this will remove the expired token from localStorage
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log('Error in isAuthenticated(): ', err);
      return false;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
