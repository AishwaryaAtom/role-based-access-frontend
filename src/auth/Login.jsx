import React from "react";
import { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../components/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Adjust the path as needed

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login</h1>
      <div className="col-md-5 mx-auto main-bg">
        {/* <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            login(values.email, values.password);
            setSubmitting(false);
          }}
        > */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            const errorMessage = await login(values.email, values.password);

            if (errorMessage) {
              if (errorMessage.toLowerCase().includes("email")) {
                setFieldError("email", errorMessage);
              } else if (errorMessage.toLowerCase().includes("password")) {
                setFieldError("password", errorMessage);
              } else {
                setFieldError("email", errorMessage);
              }
            } else {
              navigate("/profile");
            }

            setSubmitting(false);
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
            <div>
              Don't have an account? <Link to="/">Register</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default LoginForm;
