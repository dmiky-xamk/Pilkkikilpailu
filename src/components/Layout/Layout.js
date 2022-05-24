import classes from "./Layout.module.css";
import Navigation from "./Navigation";
import { Fragment } from "react";

export default function Layout(props) {
  return (
    <Fragment>
      <Navigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
}
