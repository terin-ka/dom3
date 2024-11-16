import { React, useState } from "react";
import Gravatar from "./gravatar.component";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useUser } from "../contexts/user.provider";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import * as formik from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { getDateTimeFormatted } from "../utils/date.utils";
import { useQuery } from "@tanstack/react-query";

export default function ProfileProfile() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);

  // Funkce pro načtení dat s parametrem userId
  const fetchProfileData = async ({ queryKey }) => {
    const [_key, { userId }] = queryKey; // eslint-disable-line no-unused-vars
    const row = await UserService.getUserProfile(userId);
    //setProfileData({ email: row.email, oldPassword: "", newPassword: "", confirmNewPassword: "" });
    setProfileData({ email: row.email, oldPassword: "", newPassword: "", confirmNewPassword: "" });
    return row;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["profile", { userId: user.id }],
    queryFn: fetchProfileData,
  });

  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string("Zadejte email").email(),
    oldPassword: yup.string("Zadejte staré heslo"),
    newPassword: yup.string("Zadejte nové heslo").when("oldPassword", {
      is: (oldPassword) => oldPassword && oldPassword.length > 0,
      then: () => yup.string().required("Vyplnění pole povinné").min(6, "Heslo musí mít délku minimálně 6 znaků"),
      otherwise: () => yup.string().notRequired(),
    }),
    confirmNewPassword: yup.string("Zadejte nové heslo pro kontrolu znovu").when("oldPassword", {
      is: (oldPassword) => oldPassword && oldPassword.length > 0,
      then: () =>
        yup
          .string()
          .required("Vyplnění pole povinné")
          .min(6, "Heslo musí mít délku minimálně 6 znaků")
          .oneOf([yup.ref("newPassword"), null], "Zadané hesla musí být shodná"),
      otherwise: () => yup.string().notRequired(),
    }),
  });

  if (isPending) {
    return (
      <Container>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return <Container></Container>;
  }

  return (
    <Container>
      {profileData ? (
        <>
          <Stack direction='horizontal' gap={5}>
            <Gravatar email={profileData?.email} size={96} />
            <Stack direction='vertical'>
              <h3>
                <strong>{user.username}</strong>
              </h3>
              <p>
                <strong>Identifikátor:</strong> {user.id}
              </p>
              <p>
                <strong>Vytvořeno vizualizací:</strong> {data.total ? data.total : 0}
              </p>
              <p>
                <strong>Datum posledního generování:</strong>{" "}
                {data.last_render_at ? getDateTimeFormatted(data.last_render_at) : ""}
              </p>
            </Stack>
          </Stack>
          <Formik
            validationSchema={schema}
            initialValues={profileData}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                // zkontrolujeme zda se změnil email nebo heslo
                if (values.email !== profileData.email) {
                  // resolvujeme promise a axios defaultně vyvolá chybu pro status code not 2xx
                  // data při úspěchu mě nezajímají
                  await UserService.changeEmail(user.id, values.email);
                  // vrácení status 200 signalizuje úspěšný update
                  // Resetuje ve formu zobrazený email - formiku tím sdělujeme že hodnota po změně je výchozí a form není "dirty"
                  resetForm({
                    values: {
                      ...values, // Zachování současných hodnot
                      email: values.email,
                    },
                  });
                }
                if (values.newPassword) {
                  await AuthService.changePassword(user.username, values.oldPassword, values.newPassword);
                  // Resetuje zobrazené password hodnoty na prázdné hodnoty, email zůstává zobrazen
                  resetForm({
                    values: {
                      ...values, // Zachování současných hodnot
                      oldPassword: "",
                      newPassword: "",
                      confirmNewPassword: "",
                    },
                  });
                }
                // uložíme si novou hodnotu
                setProfileData((prevState) => ({ ...prevState, email: values.email }));
                setSubmitting(false);
                toast.success(`Změna údajů uživatele ${user.username} proběhla úspěšně`);
              } catch (error) {
                // vyvolá se pokud status code not 2xx
                setSubmitting(false);
                // pokud se vrátí response tak je chyba v error.response.data.message kam jsem si ji uložili
                // při obecné network error (např. backend neběží a tudíž custom chyba není vyvolána) je text chyby v error.message
                toast.error(error.response.data.message ?? error.message);
              }
            }}
          >
            {({ handleSubmit, handleChange, handleReset, values, errors, isSubmitting, dirty }) => (
              <Form onSubmit={handleSubmit}>
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
                {!user.oauth ? (
                  <>
                    <hr></hr>
                    <Form.Group controlId='oldPassword'>
                      <Form.Label>Staré heslo</Form.Label>
                      <Form.Control
                        type='text'
                        name='oldPassword'
                        value={values.oldPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.oldPassword}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.oldPassword}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='newPassword'>
                      <Form.Label>Nové heslo</Form.Label>
                      <Form.Control
                        type='text'
                        name='newPassword'
                        value={values.newPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.newPassword}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.newPassword}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='confirmNewPassword'>
                      <Form.Label>Nové heslo pro kontrolu znovu</Form.Label>
                      <Form.Control
                        type='text'
                        name='confirmNewPassword'
                        value={values.confirmNewPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmNewPassword}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.confirmNewPassword}</Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : (
                  <></>
                )}
                <br />
                <Button variant='primary' type='submit' disabled={!dirty || isSubmitting}>
                  Uložit
                </Button>{" "}
                <Button variant='secondary' onClick={handleReset}>
                  Zpět
                </Button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
    </Container>
  );
}
