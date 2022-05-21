import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import { notification } from "antd";
import axios from "axios";
import { Input } from "../../../../_theme/_partials/controls"
import "../../../../_theme/css/style.css";
import "../../../../_theme/css/bootstrap.min.css";
import "../../../../_theme/fonts/icomoon/style.css";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@material-ui/core";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const openNotification = (res) => {
    notification.open({
      message: res.message,
      description: "",
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
  const getProfileData = () => {
    axios.get("/user/getOne")
      .then(response => {
        console.log(response.data)
        setProfile(response.data)
      })
  }
  useEffect(() => {
    getProfileData();
  }, [])
  return (
    <>
      <div className="container" style={{ marginTop: '-60px' }} >
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5">
            <h3 className="text-white text-center h2" >Profile</h3><br />

            {profile && <Formik
              initialValues={profile}
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
              
                if (values.Age <= 1) {
                  errors.Age = "Required Fields ";
                }

                return errors;
              }}
              onSubmit={(values, { setStatus, setSubmitting }) => {
                console.log(values)
                enableLoading();
                axios.put("/user/update", values)
                  .then(response => {
                    openNotification({ status: response.data.success, message: response.data.message })
                    disableLoading();
                  })
                  .catch((err) => {
                    disableLoading();
                    openNotification({
                      status: false,
                      message: err.response.data.message,
                    });
                    console.log(err.response);
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
                  <div className="form-group first">{console.log(values)}
                    <Field type="text" name="FirstName" component={Input} label="First Name" >
                      {({ field }) => (
                        <div>
                          <input
                            type="text" {...field}
                            value={values.FirstName}
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
                            value={values.LastName}
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
                            readOnly
                            value={values.Email}
                            className="form-control"
                            placeholder="enter your email" />
                          {touched.Email &&
                            errors.Email && <div className="text-white">{errors.Email}</div>}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="form-group last mb-3">
                    <Autocomplete
                      multiple
                      options={["Action", "Comedy", "Thriller", "Adventure", "Rommantic", "Fantacy", "Horror", "Crime", "Science Fiction"]}
                      className="form-control my-3"
                      getOptionLabel={(option) => option}
                      defaultValue={values.Genre}
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
                            value={values.Age}
                            className="form-control"
                            placeholder="enter your Age" />
                          {touched.Age &&
                            errors.Age && <div className="text-white">{errors.Age}</div>}
                        </div>
                      )}
                    </Field>
                  </div>
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="btn btn-block btn-primary" id="btn"
                  >
                    <span className={`${loading ? "pr-3" : ""}`}>Save Changes</span>
                    {loading && (
                      <span className="spinner-border text-light"></span>
                    )}

                  </button>
                </form>
              )}
            </Formik>}
          </div>
        </div>
      </div>
    </>)
}

export default ProfilePage;