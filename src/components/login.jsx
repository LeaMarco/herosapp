import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./login.module.css";
import Button from "react-bootstrap/Button";


const Login = () => {
  const redirect = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Log in</h1>
        {!window.localStorage.getItem("alkemyToken") ? (
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              await axios
                .post("http://challenge-react.alkemy.org/", {
                  email: values.email,
                  password: values.password,
                })
                .then((response) => {
                  window.localStorage.setItem(
                    "alkemyToken",
                    response.data.token
                  );
                })
                .then(() => redirect.push("/"))
                .catch(() =>
                  toast.error("Invalid email or password", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                );
            }}
          >
            {({ isSubmitting }) => (
              <Form className={styles.formik}>
                <h3>Email:</h3>
                <Field className={styles.input} type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <h3>Password:</h3>
                <Field
                  className={styles.input}
                  type="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <h5>you are already singed in</h5>
            <Link to="/">
              <Button variant="primary">Return home</Button>
            </Link>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
