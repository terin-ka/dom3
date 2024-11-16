import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Test from "./pages/test.page";
import ListDetailProvider from "./contexts/listDetail.provider";
import UserProviderSimple from "./contexts/userProviderSimple";
import ListOverwievProvider from "./contexts/listOverview.provider";
import CustomThemeProvider from "./contexts/themeProvider";
import Header from "./components/listDetail/Header";
import Overview from "./components/overview/Overview";
import ListDetail from "./components/listDetail/ListDetail";

export default function App() {
  return (
    <Container fluid className="App" style={{ height: "100vh" }}>
      {" "}
      <BrowserRouter>
        <CustomThemeProvider>
          <UserProviderSimple>
            <ListOverwievProvider>
              <ListDetailProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<Test />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="listDetail/:id" element={<ListDetail />} />
                  <Route path="/test" element={<Test />} />
                </Routes>
              </ListDetailProvider>
            </ListOverwievProvider>
          </UserProviderSimple>
        </CustomThemeProvider>
      </BrowserRouter>
    </Container>
  );
}

/*
//import PrivateRoute from "./components/private-route.component";
//import ApiProvider from "./contexts/api.provider";
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
//import UserProvider from "./contexts/user.provider";
//import Header from "./components/header.component";
//import Login from "./pages/login.page";
//import LoginRedirect from "./pages/login-redirect.page";
//import Register from "./pages/register.page";
//import Profile from "./pages/profile.page";
<Route path="/login" element={<Login />} />
<Route path="/loginredirect" element={<LoginRedirect />}/>
<Route path="/register" element={<Register />} />
<Route path="/profile" element={<Profile />} />

<ToastContainer position="bottom-center" theme="colored" draggable />
*/
