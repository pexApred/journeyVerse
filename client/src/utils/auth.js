// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

class AuthService {
  // get user data
  getProfile() {
    const token = localStorage.getItem('id_token');
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
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return true;
    }
  }

  getTokenFromStorage() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }
  
  login(idToken, callback) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    const profile = this.getProfile();
    
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
    const journeys = localStorage.getItem('journeys');
    localStorage.setItem('journeyData', journeys);

    if(callback && this.loggedIn()) {
      callback();
    }
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('journeyData');
  }

  isAuthenticated() {
    const token = this.getTokenFromStorage();
    if (!token) return false;
    try {
      const { exp } = decode(token);
      // Check if token is expired
      const tokenExpired = Date.now() >= exp * 1000;
      if (tokenExpired) {
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
