import React, { useState } from "react";
import { Formik, Field } from "formik";
import { notification } from "antd";
import { connect } from "react-redux";
import "../../../../_theme/css/style.css";
import "../../../../_theme/css/bootstrap.min.css";
import "../../../../_theme/fonts/icomoon/style.css";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";
import { Input } from "../../../../_theme/_partials/controls"
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@material-ui/core";

const SignUpPage = (props) => {
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
      <div className="d-lg-flex half" style={{ Height: '100vh' }}>
        <div className="bg order-1 order-md-2" style={{ backgroundImage: "url(/images/cinema.jpg)" }}></div>
        <div className="contents order-2 order-md-1" style={{ backgroundAttachment: 'fixed' }}>

          <div className="container" style={{ marginTop: '-60px' }} >
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <h3 className="text-white text-center h2" >Create A New Account</h3><br />

                <Formik
                  initialValues={{
                    FirstName: "",
                    LastName: "",
                    Email: "",
                    Password: "",
                    Genre: "",
                    Age: '',
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

                    if (!values.LastName) {
                      errors.LastName = "Required Fields";
                    }

                    if (!values.FirstName) {
                      errors.FirstName = "Required Fields";
                    }

                    if (!values.Password) {
                      errors.Password = "Required Fields";
                    }
                    if (values.Genre.length < 3) {
                      errors.Genre = "Required Fields";
                    }
                    if (values.Age <= 1) {
                      errors.Age = "Required Fields ";
                    }

                    return errors;
                  }}
                  onSubmit={(values, { setStatus, setSubmitting }) => {
                    enableLoading();
                    register(
                      values.Email,
                      values.FirstName,
                      values.LastName,
                      values.Password,
                      values.Genre,
                      values.Age
                    )
                      .then(({ data }) => {
                        openNotification({ status: true, message: "SignUp Successfully" })
                        console.log(data)
                        props.register(data.token);
                        disableLoading();
                      })
                      .catch((err) => {
                        openNotification({ status: false, message: err.response.data.message, })
                        setSubmitting(false);
                        setStatus(
                          "Required Fields"
                        );
                        disableLoading();
                      });
                  }}
                >
                  {({
                    values,
                    status,
                    errors,
                    touched,
                    setFieldValue,
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

                        <Field type="text" name="FirstName" component={Input} label="First Name" >
                          {({ field }) => (
                            <div>
                              <input
                                type="text" {...field}
                                className="form-control"
                                placeholder="enter your first name" />
                              {touched.FirstName &&
                                errors.FirstName && <div className="text-white">{errors.FirstName}</div>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="form-group last mb-3">
                        <Field type="text" name="LastName" component={Input} label="Last Name" >
                          {({ field }) => (
                            <div>
                              <input
                                type="text" {...field}
                                className="form-control"
                                placeholder="enter your last name" />
                              {touched.LastName &&
                                errors.LastName && <div className="text-white">{errors.LastName}</div>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="form-group first">
                        <Field type="email" name="Email" component={Input} label="Email" >
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
                        <Field type="password" name="Password" component={Input} label="Password">
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
                      <div className="form-group last mb-3">
                        <Autocomplete
                          multiple
                          options={['action','adventure','biography','comedy','crime','documentary','fantasy','history','horror','mystery','romance','sci_fi','thriller']}
                          className="form-control my-3"
                          getOptionLabel={(option) => option}
                          limitTags={2}
                          getOptionDisabled={() => (values.Genre.length > 2 ? true : false)}
                          filterSelectedOptions
                          onChange={(e, value) => setFieldValue("Genre", value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Genre"
                            />
                          )}
                        />
                        {touched.Genre &&
                          errors.Genre && <div className="text-white">{errors.Genre}</div>}
                      </div>
                      <div className="form-group last mb-3">
                        <Field type="string" name="Age" component={Input} label="Age">
                          {({ field }) => (
                            <div>
                              <input
                                type="string" {...field}
                                className="form-control"
                                placeholder="enter your Age" />
                              {touched.Age &&
                                errors.Age && <div className="text-white">{errors.Age}</div>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="d-flex mb-5 align-items-center">
                        {/* <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                          <input type="checkbox" defaultChecked />
                          <div className="control__indicator"></div>
                        </label> */}
                        <span className="ml-auto"><a href="/auth/login" className="forgot-pass"> Login to your account </a></span>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-block btn-primary" id="btn"
                      >
                        <span className={`${loading ? "pr-3" : ""}`}>Sign up</span>
                        {loading && (
                          <span className="spinner-border text-light"></span>
                        )}

                      </button>
                      {/* <p className="text-white mt-2" style={{fontWeight:'bold'}}><center>OR</center></p>
                      <Link to="/auth/login "><input type="button" value="login" className="btn btn-block btn-primary" id="btn2" /></Link>
                   */}
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
export default connect(null, auth.actions)(SignUpPage);