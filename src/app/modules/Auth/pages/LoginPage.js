import React, { useState } from "react";
import { Formik, Field } from "formik";
import { notification } from "antd";
import {connect} from "react-redux";
import "../../../../_theme/css/style.css";
import "../../../../_theme/css/bootstrap.min.css";
import "../../../../_theme/fonts/icomoon/style.css";
import { Link } from "react-router-dom";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import { Input } from "../../../../_theme/_partials/controls";

const LoginPage = (props) => {
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };
  const openNotification = (res) => {
    notification.open({
      message: res.message,
      description: 
      res.status ? "New Account has been Created Successfully" : "",
      onClick: () => {
        console.log('Notification Clicked!');
      },
      className: res.status ? "bg-success" : "",
      style: { backgroundColor: !res.status ? "#410000" : "" }
    });
  };

  const disableLoading = () => {
    setLoading(false);
  };
  return (
    <>
      <div className="d-lg-flex half">
        <div className="bg order-1 order-md-2" style={{ backgroundImage: "url(/images/cinema.jpg)" }}></div>
        <div className="contents order-2 order-md-1">

          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7 text-center">
               
                <h3 className="text-white h2 text-center">Login to findyourfilms</h3>
                
                <br />
                <Formik
                  initialValues={{
                    Email: "",
                    Password: "",
                  }}
                  validate={values => {
                    const errors = {};

                    if (!values.Email) {
                      errors.Email = "Required Fields";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)
                    ) {
                      errors.Email = "Invalid Value";
                    }
                    if (!values.Password) {
                      errors.Password = "Required Fields";
                    }

                    return errors;
                  }}
                  onSubmit={(values, { setStatus, setSubmitting }) => {
                    enableLoading();
                    setTimeout(() => {
                      login(values.Email, values.Password)
                        .then(({ data }) => {
                          // openNotification({ status: true, message: "Login Successfully" })
                          disableLoading();
                          props.login(data.token);

                        })
                        .catch((err) => {
                          openNotification({ status: false, message: err.response.data.message, })
                          disableLoading();
                          setSubmitting(false);
                          setStatus(
                            "Required Fields"
                          );
                        });
                    }, 1000);
                  }}
                >
                  {({
                    values,
                    status,
                    errors,
                    touched,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      autoComplete="off"
                      className="form"
                    >
                      <div className="form-group first">
                        <Field type="email" name="Email" label="Email" >
                          {({ field }) => (
                            <div>
                              <input
                                type="email" {...field}
                                className="form-control"
                                placeholder="enter your email" />
                              {touched.Email &&
                                errors.Email && <div className="text-white">{errors.Email}</div>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="form-group last mb-3">
                        <Field type="password" name="Password" label="Password">
                          {({ field }) => (
                            <div>
                              <input
                                type="password" {...field}
                                className="form-control"
                                placeholder="enter your Password" />
                              {touched.Password &&
                                errors.Password && <div className="text-white">{errors.Password}</div>}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div className="d-flex mb-5 align-items-center">
                        <label className="control control--checkbox mb-0"><span className="caption"></span>
                          {/* <input type="checkbox" defaultChecked />
                          <div className="control__indicator"></div> */}
                        </label>
                        {/* <span className="ml-auto"><a href="/" className="forgot-pass">Forgot Password</a></span> */}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-block btn-primary" id="btn"
                      >
                        {loading?<span className="spinner-border text-light"></span>:<span className={`${loading ? "pr-3" : ""}`}>Log In</span>}
                      </button>
                      <p className="text-white mt-2" style={{fontWeight:'bold'}}><span className="text-center">OR</span></p>
                      <Link to="/auth/register"><input type="button" value="Create a new account" className="btn btn-block btn-primary" id="btn2" /></Link>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(null, auth.actions)(LoginPage);