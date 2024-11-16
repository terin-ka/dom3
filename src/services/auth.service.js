import api from "./api";

const login = async (username, password) => {
  try {
    let response = await api.post("api/auth/login", {
      username,
      password,
    });
    return response.data.data;
  } catch (error) {
    // pokud se vrátí response tak je chyba v error.response.data.message kam jsem si ji uložili
    // při obecné network error (např. backend neběží a tudíž custom chyba není vyvolána) je text chyby v error.message
    // chybu pošleme dále
    throw new Error(error.response?.data.message ?? error.message);
  }
};

const logout = async () => {
  try {
    //pokud voláme a je již odhlášeno tak vrátí status 401 což mě ale nezajímá, stejně s tím nebudu nic dělat
    await api.post("api/auth/logout");
    return true;
  } catch (error) {
    return false;
  }
};

// vrací přímo promise
const register = async (username, email, password) => {
  return await api.post("api/auth/register", {
    username,
    email,
    password,
  });
};

// vrací přímo promise
const changePassword = async (username, oldPassword, newPassword) => {
  return await api.post("api/auth/changepassword", {
    username,
    oldPassword,
    newPassword,
  });
};

const AuthService = {
  register,
  login,
  logout,
  changePassword,
};

export default AuthService;
