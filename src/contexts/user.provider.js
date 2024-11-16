import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserService from "../services/user.service";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser()); /*aktivní uživatel*/

  useEffect(() => {
    (async () => {
      // načtu aktuálního uživatele z local storage
      setUser(getCurrentUser());
    })();
  }, [user?.id]);

  // provést při načtení aplikace - ověříme že uživatel existuje
  useEffect(() => {
    (async () => {
      // načtu aktuálního uživatele z local storage
      const usr = getCurrentUser();
      if (usr) {
        try {
          //pokouším se načíst uloženého usera, pokud není nalezen tak přesměruji na login
          //může se to stát hlavně při vývoji pokud měním databáze apod tak v local storage je user ale není v databázi, vyvolám login
          await UserService.getUser(usr.id);
        } catch {
          clearUser(); // smažeme data v local storage + providerovi
          // přesměrovat na login page
          let next = "/login";
          if (location.state && location.state.next) {
            next = location.state.next;
          }
          navigate(next);
        }
      }
    })();
  }, []); // eslint-disable-line  react-hooks/exhaustive-deps

  const refreshUser = () => {
    setUser(getCurrentUser());
  };

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const setCurrentUser = (id, username, email, oauth, sessionid) => {
    // 1. aktualizujeme state varaible
    // nelze měnit přímo user - je nutno o něm uvažovat jako read only, nutno použít setter funkci
    setUser({
      id: id,
      username: username,
      email: email ?? "",
      oauth: oauth ?? false,
      sessionid: sessionid ?? "",
    });
    // 2. uložíme hodnoty do local storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: id,
        username: username,
        email: email ?? "",
        oauth: oauth ?? false,
        sessionid: sessionid ?? "",
      })
    );
  };

  return (
    <UserContext.Provider value={{ user, setCurrentUser, clearUser, refreshUser }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
