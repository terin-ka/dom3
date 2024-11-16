import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();
function UserProviderSimple({ children }) {
  const userList = [
    { id: "u1", name: "Aragorn", email: "aragorn@gmail.com" },
    { id: "u2", name: "Legolas", email: "legolas@gmail.com" },
    { id: "u3", name: "Gimli", email: "gimli@gmail.com" },
    { id: "u4", name: "Galadriel", email: "galadriel@gmail.com" },
    { id: "u5", name: "Gandalf", email: "gandalf@gmail.com" },
    { id: "u6", name: "Balrog", email: "balrog@gmail.com" },
  ];
  const [loggedInUser, setLoggedInUser] = useState(null);

  const value = {
    userList: userList,
    loggedInUser: loggedInUser,
    setLoggedInUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export default UserProviderSimple;
