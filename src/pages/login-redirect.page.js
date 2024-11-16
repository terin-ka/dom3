import React, { useEffect } from "react";
import Body from "../components/body.component";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/user.provider";
import { toast } from "react-toastify";

const LoginRedirect = () => {
  const { setCurrentUser, clearUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  // page je volána po loginu pomocí oAuth, url obsahuje v query parametrech id + username
  // toto nechceme zobrazit v url a proto na této page provedeme načtení query parametrů a jejich uložení jako usera a
  // a okamžitě se přesměrujeme na test page (již bez query parametrů) tzn. tato page se nikdy uživateli nezobrazí
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const username = searchParams.get("username");
  const email = searchParams.get("email");
  const sessionid = searchParams.get("sessionid");
  const err = searchParams.get("err") ?? "unknown";

  useEffect(() => {
    (async () => {
      let next = "/test";
      if (id && username) {
        //console.log("id", id, "username", username, "email", email);
        // uložit usera který je přihlášen
        setCurrentUser(id, username, email, true, sessionid);
        toast.success(`Uživatel ${username} je přihlášen`);
      } else {
        clearUser();
        next = "/login";
        toast.error(`Během přihlášení došlo k chybě -  ${err}`);
      }
      if (location.state && location.state.next) {
        next = location.state.next;
      }
      navigate(next);
    })();
    // eslint-disable-next-line
  }, []); // provést pouze jednou po načtení komponenty
  // id, username, navigate, location.state, setCurrentUser, setLastRender
  return (
    <Body>
      <p>Redirecting...</p>
    </Body>
  );
};

export default LoginRedirect;
