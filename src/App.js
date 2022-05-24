import "./App.css";
import { Routes, Route } from "react-router";
import { Fragment } from "react";
import Layout from "./components/Layout/Layout";
import Rules from "./pages/Rules";
import Home from "./pages/Home";
import Enroll from "./pages/Enroll";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Success from "./pages/Success";
const theme = createTheme({
  typography: {
    htmlFontSize: 8,
  },
});

function App() {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="saannot" element={<Rules />} />
            <Route path="ilmoittaudu" element={<Enroll />} />
            <Route path="kiitos" element={<Success />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
