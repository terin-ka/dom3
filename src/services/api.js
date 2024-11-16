import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BACKEND_API_URL;
// withCredentials: true,   zajistí aby docházelo spolu s requestem k odesílání cookies
// response pak musí obsahovat v headeru Access-Control-Allow-Credentials: true - nutno nastavit v backendu (jinak dojde ke cors chybě)
// více https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// https://www.dhiwise.com/post/managing-secure-cookies-via-axios-interceptors
const instance = axios.create({
  baseURL: BASE_API_URL,
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/*pomocí interceptor načteme uložený autorizační token*/
const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.sessionid;
};

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response && [301, 302,303].includes(err.response.status)) {
      const redirectUrl = err.response.headers.location;
      return instance.get(redirectUrl);
    }

    return Promise.reject(err);
  }
);
*/

export default instance;
