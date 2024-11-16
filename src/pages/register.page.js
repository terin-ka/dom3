import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Body from "../components/body.component";
import Row from "react-bootstrap/Row";
import Gravatar from "../components/gravatar.component";
import * as formik from "formik";
import * as yup from "yup";
import AuthService from "../services/auth.service";
import { useUser } from "../contexts/user.provider";

export default function Register() {
  const { setCurrentUser } = useUser();

  const { Formik } = formik;
  const navigate = useNavigate();
  const location = useLocation();

  const schema = yup.object().shape({
    username: yup
      .string("Zadejte uživatelské jméno")
      .required("Vyplnění pole je povinné")
      .min(5, "Jméno musí mít délku alespoň 5 znaků"),
    email: yup.string("Enter your email").required("Vyplnění pole je povinné").email(),
    password: yup
      .string("Zadejte heslo")
      .required("Vyplnění pole je povinné")
      .min(6, "Heslo musí mít délku alespoň 6 znaků"),
    confirmPassword: yup
      .string("Zadejte pro kontrolu heslo znovu")
      .required("Vyplnění pole je povinné")
      .oneOf([yup.ref("password"), null], "Zadaná hesla musí být stejná"),
    acceptTerms: yup.bool().oneOf([true], "Akceptování podmínek je povinné"),
  });

  return (
    <Body>
      <Card style={{ width: "60%" }}>
        <Container>
          <Row xs={2} md={4} lg={6} className='justify-content-md-center'>
            <Gravatar size={128} />
          </Row>
        </Container>
        <Card.Body>
          <Card.Title>Registrace</Card.Title>
          <Formik
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // registrujeme
                await AuthService.register(values.username, values.email, values.password);
                // okamžitě přihlásíme
                const usr = await AuthService.login(values.username, values.password);
                // uložíme hodnoty do user providera a local storage
                setCurrentUser(usr.id, usr.username, usr.email, false, usr.sessionid);
                setSubmitting(false);
                toast.success(`Uživatel ${values.username} je přihlášen`);
                // přejdeme na test page
                let next = "/test";
                if (location.state && location.state.next) {
                  next = location.state.next;
                }
                navigate(next);
              } catch (error) {
                // vyvolá se pokud status code not 2xx
                setSubmitting(false);
                // pokud se vrátí response tak je chyba v error.response.data.message kam jsem si ji uložili
                // při obecné network error (např. backend neběží a tudíž custom chyba není vyvolána) je text chyby v error.message
                toast.error(error.response.data.message ?? error.message);
              }
            }}
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
              email: "",
              acceptTerms: false,
            }}
          >
            {(
              { handleSubmit, handleChange, values, touched, errors, isSubmitting } // eslint-disable-line no-unused-vars
            ) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='username'>
                  <Form.Label>Uživatelské jméno</Form.Label>
                  <Form.Control
                    type='text'
                    name='username'
                    value={values.username}
                    autoComplete='username'
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='text'
                    name='email'
                    value={values.email}
                    autoComplete='email'
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Label>Heslo</Form.Label>
                  <Form.Control
                    type='text'
                    name='password'
                    autoComplete='new-password'
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Heslo znovu pro kontrolu</Form.Label>
                  <Form.Control
                    type='text'
                    name='confirmPassword'
                    autoComplete='new-password'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='acceptTerms'>
                  <Form.Check
                    name='acceptTerms'
                    label='Přečetl jsem podmínky a souhlasím s nimi'
                    value={values.acceptTerms}
                    onChange={handleChange}
                    isInvalid={!!errors.acceptTerms}
                    feedback={errors.acceptTerms}
                    feedbackType='invalid'
                  />
                </Form.Group>
                <br />
                <Button variant='primary' type='submit' disabled={isSubmitting}>
                  Registruj
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Body>
  );
}
