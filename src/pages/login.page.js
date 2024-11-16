import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Body from "../components/body.component";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Gravatar from "../components/gravatar.component";
import { useUser } from "../contexts/user.provider";
import * as formik from "formik";
import * as yup from "yup";
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import Icon from "@mdi/react";
import { toast } from "react-toastify";
import AuthService from "../services/auth.service";

// tlačítka pro oAuth jsou z https://www.npmjs.com/package/react-social-login-buttons

export default function Login() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const schema = yup.object().shape({
    username: yup.string().required("Vyplnění pole je povinné"),
    password: yup.string().required("Vyplnění pole je povinné"),
  });

  // volání url pro oAuth provedu jako volání linku a nikoliv přes axios
  // na konci requestu dochází totiž k redirectu a při použití axiosu vzniká cors error
  // axios volá svoje requesty jako XMLHttpRequest který se liší od requestu zasílaném browserem
  const providerUrl = (provider) => {
    const suffix = `/login/${provider}`;
    return `${process.env.REACT_APP_BACKEND_API_URL}${suffix}`;
  };

  return (
    <Body>
      <Card style={{ width: "60%" }}>
        <Container>
          <Row xs={2} md={4} lg={6} className='justify-content-md-center'>
            <Gravatar size={128} />
          </Row>
        </Container>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Formik
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // přihlásíme se
                const usr = await AuthService.login(values.username, values.password);
                // uložíme hodnoty do user providera a local storage
                setCurrentUser(usr.id, usr.username, usr.email, false, usr.sessionid);
                setSubmitting(false);
                toast.success(`Uživatel ${values.username} je přihlášen`);
                let next = "/test";
                if (location.state && location.state.next) {
                  next = location.state.next;
                }
                navigate(next);
              } catch (error) {
                setSubmitting(false);
                toast.error(error.message);
              }
            }}
            initialValues={{
              username: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='username'>
                  <Form.Label>Jméno</Form.Label>
                  <Form.Control
                    type='text'
                    name='username'
                    value={values.username}
                    autoComplete='username'
                    onChange={handleChange}
                    isValid={touched.username && !errors.username}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Label>Heslo</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name='password'
                      value={values.password}
                      autoComplete='current-password'
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Button variant='outline-secondary' onClick={togglePasswordVisibility}>
                      {showPassword ? <Icon path={mdiEyeOff} size={1} /> : <Icon path={mdiEye} size={1} />}
                    </Button>
                    <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <br />
                <Button variant='primary' type='submit' disabled={isSubmitting}>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <br />
          <p>
            Nemáte dosud účet ? <Link to='/register'>Registrujte se zde</Link>!
          </p>
          <p>
            Můžete se také přihlásit pomocí jiného poskytovatele <br />
            <GoogleLoginButton onClick={() => (window.location.href = providerUrl("google"))}>
              <span>Přihlašte se pomocí Google účtu</span>
            </GoogleLoginButton>
            <FacebookLoginButton onClick={() => (window.location.href = providerUrl("facebook"))}>
              <span>Přihlašte se pomocí Facebook účtu</span>
            </FacebookLoginButton>
          </p>
        </Card.Body>
      </Card>
    </Body>
  );
}
