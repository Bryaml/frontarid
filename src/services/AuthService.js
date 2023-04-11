import axios from 'axios';

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      }, error => {
        throw error.response.data;
      })
      .then(data => {
        if (data.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }
        return data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    if (user && user.roles) {
      user.rol = Array.isArray(user.roles) ? user.roles[0].nombre : user.roles;
    }
    return user;
  }
  
  
  async recoverPassword(email) {
    try {
      const response = await axios.post(API_URL + "recuperar-contrasena", { email });
      return response.data;
    } catch (error) {
      console.error("Error al recuperar contraseña:", error);
      throw error.response.data;
    }
  }
 
}

export function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token;
}

export function loadUser() {
  const authService = new AuthService();
  return authService.getCurrentUser();
}

export default new AuthService();