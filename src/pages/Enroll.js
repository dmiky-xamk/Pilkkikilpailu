import classes from "./Enroll.module.css";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import RadioButtons from "../components/Form/RadioButtons";

const ERROR_MESSAGES = Object.freeze({
  FIRST_NAME_MISSING: "Syötä etunimi.",
  LAST_NAME_MISSING: "Syötä sukunimi.",
  NAME_TOO_SHORT: "Nimen täytyy sisältää vähintään kaksi kirjainta.",
  PHONE_INVALID: "Puhelinnumeron täytyy sisältää vähintään viisi numeroa.",
  PHONE_MISSING: "Syötä puhelinnumero.",
  EMAIL_INVALID: "Sähköpostiosoitteen täytyy sisältää @ -merkki.",
  EMAIL_MISSING: "Syötä sähköpostiosoite.",
  CATEGORY_MISSING: "Valitse kategoria.",
});

const INPUT_NAMES = Object.freeze({
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  LOCALITY: "locality",
  PHONE: "phone",
  EMAIL: "email",
  CATEGORY: "category",
});

const CONTACT_ERRORS = Object.freeze({
  MISSING: 0,
  INVALID: 1,
});

const defaultFormValues = {
  firstName: { htmlName: INPUT_NAMES.FIRST_NAME, value: "" },
  lastName: { htmlName: INPUT_NAMES.LAST_NAME, value: "" },
  locality: { htmlName: INPUT_NAMES.LOCALITY, value: "" },
  phone: { htmlName: INPUT_NAMES.PHONE, value: "" },
  email: { htmlName: INPUT_NAMES.EMAIL, value: "" },
  category: { htmlName: INPUT_NAMES.CATEGORY, value: "" },
};

export default function Enroll() {
  // Käytin statea refin sijasta, sillä ref lisäsi käyttäjän antamat tiedot "default" -objektiin
  // ja halusin pitää sen muuttumattomana. Default -objektin "value" kentät olisi pitänyt myös
  // nollata jokaisen formin lähetyksen jälkeen, sillä vaikka syöttökentät näyttivät käyttäjälle tyhjiltä,
  // niin form onnistui lähettää uudelleen ilman kenttiin mitään syöttämistä, sillä "valuet"
  // olivat samat mitä käyttäjä antoi aiemmalla lähetyskerralla.
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const validateInputs = (inputs) => {
    const setNewError = (name, message) => {
      errors[name] = message;
    };

    const validateName = (name) => {
      // Tunnistetaan onko etu- vai sukunimi
      const errorMsgType =
        name.htmlName === INPUT_NAMES.FIRST_NAME
          ? ERROR_MESSAGES.FIRST_NAME_MISSING
          : ERROR_MESSAGES.LAST_NAME_MISSING;

      if (!name.value.trim()) {
        setNewError(name.htmlName, errorMsgType);
      } else if (name.value.trim().length < 2) {
        setNewError(name.htmlName, ERROR_MESSAGES.NAME_TOO_SHORT);
      }
    };

    const validateCategory = (category) => {
      if (!category.value) {
        setNewError(category.htmlName, ERROR_MESSAGES.CATEGORY_MISSING);
      }
    };

    const checkPreferredContactType = (phone, email) => {
      const validatePhone = (phone) => {
        if (!phone.value.trim()) {
          return CONTACT_ERRORS.MISSING;
        }

        if (phone.value.trim().length < 5) {
          return CONTACT_ERRORS.INVALID;
        }
      };

      const validateEmail = (email) => {
        if (!email.value.trim()) {
          return CONTACT_ERRORS.MISSING;
        }

        if (!email.value.includes("@")) {
          return CONTACT_ERRORS.INVALID;
        }
      };

      const typeValidity = {};

      typeValidity.phone = validatePhone(phone);
      typeValidity.email = validateEmail(email);

      // Jos molemmat kentät ovat tyhjiä -> molemmat kentät saavat virheilmoituksen.
      if (
        typeValidity.phone === CONTACT_ERRORS.MISSING &&
        typeValidity.email === CONTACT_ERRORS.MISSING
      ) {
        setNewError(phone.htmlName, ERROR_MESSAGES.PHONE_MISSING);
        setNewError(email.htmlName, ERROR_MESSAGES.EMAIL_MISSING);
      }

      // Syöte on väärin -> kenttä saa virheilmoituksen
      // ESIM: Jos käyttäjä haluaa antaa puhelinnumeron, mutta syöte on väärin,
      // niin turhaan annetaan virheilmoitusta että sähköposti puuttuu.
      // Halutessaan käyttäjä voi myös antaa molemmat, ja virheilmoitukset
      // toimivat näin molemmissa kentissä.
      else {
        if (typeValidity.phone === CONTACT_ERRORS.INVALID)
          setNewError(phone.htmlName, ERROR_MESSAGES.PHONE_INVALID);

        if (typeValidity.email === CONTACT_ERRORS.INVALID)
          setNewError(email.htmlName, ERROR_MESSAGES.EMAIL_INVALID);
      }
    };

    const { firstName, lastName, phone, email, category } = inputs;
    const errors = {};

    validateName(firstName);
    validateName(lastName);
    checkPreferredContactType(phone, email);
    validateCategory(category);

    if (Object.entries(errors).length > 0) {
      setErrorMessages({ ...errors });
      return false;
    } else {
      setErrorMessages({});
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputsValid = validateInputs(formValues);

    if (inputsValid) {
      navigate("../kiitos", { replace: true, state: { formValues } });
    }
  };

  const handleFormInputChange = (event) => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [event.target.name]: {
          htmlName: event.target.name,
          value: event.target.value,
        },
      };
    });
  };

  return (
    <section className={classes["section-enroll"]}>
      <h1 className="heading-primary">Ilmoittautuminen</h1>
      <form className={classes["enroll-form"]} onSubmit={handleSubmit}>
        <TextField
          name={INPUT_NAMES.FIRST_NAME}
          type="text"
          id="first-name"
          label="Etunimi"
          onChange={handleFormInputChange}
          error={Boolean(errorMessages.firstName)}
          helperText={errorMessages.firstName}
        />
        <TextField
          name={INPUT_NAMES.LAST_NAME}
          type="text"
          id="last-name"
          label="Sukunimi"
          onChange={handleFormInputChange}
          error={Boolean(errorMessages.lastName)}
          helperText={errorMessages.lastName}
        />
        <TextField
          name={INPUT_NAMES.LOCALITY}
          type="text"
          id="locality"
          label="Paikkakunta"
          helperText="Vapaaehtoinen"
          onChange={handleFormInputChange}
        />
        <p className={`${classes.contact} ${classes["grid-middle"]}`}>
          Haluamasi yhteydenottotapa (ilmoita vähintään yksi):
        </p>
        <TextField
          className={classes["phone"]}
          name={INPUT_NAMES.PHONE}
          type="tel"
          id="phone"
          label="Puhelinnumero"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={handleFormInputChange}
          error={Boolean(errorMessages.phone)}
          helperText={errorMessages.phone}
        />
        <TextField
          className={classes.email}
          name={INPUT_NAMES.EMAIL}
          type="text"
          id="email"
          label="Sähköpostiosoite"
          onChange={handleFormInputChange}
          error={Boolean(errorMessages.email)}
          helperText={errorMessages.email}
        />
        <RadioButtons
          name={INPUT_NAMES.CATEGORY}
          errorMessage={errorMessages.category}
          onChange={handleFormInputChange}
        />
        <Button
          sx={{ width: "40rem" }}
          type="submit"
          className={classes["grid-middle"]}
          variant="contained"
        >
          Lähetä ilmoittautuminen
        </Button>
      </form>
    </section>
  );
}
