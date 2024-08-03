import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../components/AuthContext"; // Adjust the path as needed

const RegistrationForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Register</h1>
      <div className="col-md-5 mx-auto main-bg">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Required"),
            role: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            const errorMessage = await register(
              values.email,
              values.password,
              values.role
            );

            if (errorMessage) {
              setFieldError("email", errorMessage);
            } else {
              navigate("/login");
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <Field name="role" as="select" className="form-control">
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary btn-block w-50 loginbtn"
              >
                Register
              </button>
            </div>
            <div className="text-center mt-2">
              Already Registered ?{" "}
              <Link to="/login">
                {" "}
                <b>Login</b>{" "}
              </Link>{" "}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
