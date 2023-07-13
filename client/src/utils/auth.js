// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

class AuthService {
  // get user data
  getProfile() {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = decode(token);
        console.log(decoded);
        const { id, firstName, lastName, email } = decoded;
        return new User(id, firstName, lastName, email);
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    return null;
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
    
  }

  

  login(idToken, firstName, lastName, email, callback) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    const profile = this.getProfile();
    localStorage.setItem('profile', JSON.stringify(profile));

    if(callback && this.loggedIn()) {
      callback();
      
    }
    window.location.assign('/dashboard');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
