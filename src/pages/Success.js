import classes from "./Success.module.css";
import { useLocation } from "react-router";

export default function Success() {
  const location = useLocation();
  const userInputs = location.state.formValues;

  //   console.log(userInputs);

  return (
    <section className={classes["section-success"]}>
      <h1 className="heading-primary">Kiitos ilmoittautumisesta!</h1>
      <h2 className={classes["success-list--heading"]}>Antamasi tiedot:</h2>
      <table className={classes["success-table"]}>
        <tbody>
          <tr>
            <th>Nimi:</th>
            <td>{`${userInputs.firstName.value} ${userInputs.lastName.value}`}</td>
          </tr>
          <tr>
            <th>Sähköposti:</th>
            <td>{userInputs.email.value}</td>
          </tr>
          <tr>
            <th>Puhelinnumero:</th>
            <td>{userInputs.phone.value}</td>
          </tr>
          <tr>
            <th>Asuinpaikkakunta:</th>
            <td>{userInputs.locality.value}</td>
          </tr>
          <tr>
            <th>Ikäsarja:</th>
            <td>{userInputs.category.value}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
