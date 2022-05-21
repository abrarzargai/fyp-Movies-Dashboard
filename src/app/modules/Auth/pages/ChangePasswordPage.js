import React, { useState } from "react";
import { Formik, Field } from "formik";
import { notification } from "antd";
import axios from "axios";
import { Input } from "../../../../_theme/_partials/controls"
import "../../../../_theme/css/style.css";
import "../../../../_theme/css/bootstrap.min.css";
import "../../../../_theme/fonts/icomoon/style.css";

const ChangePasswordPage = () => {
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
  return (
    <>
      <div className="container" style={{ marginTop: '-60px' }} >
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5">
            <h3 className="text-white text-center h2" >Change Password</h3><br />

            <Formik
              initialValues={{
                OldPassword: "",
                NewPassword: "",
                ConfirmNewPassword: "",
              }}
              validate={values => {
                const errors = {};

                if (!values.OldPassword) {
                  errors.OldPassword = "Required Fields";
                }

                if (!values.NewPassword) {
                  errors.NewPassword = "Required Fields";
                }

                if (!values.ConfirmNewPassword) {
                  errors.ConfirmNewPassword = "Required Fields";
                }
                else if (values.ConfirmNewPassword !== values.NewPassword) {
                  errors.ConfirmNewPassword = "Does Not Match With New Password";
                }

                return errors;
              }}
              onSubmit={(values, { setStatus, setSubmitting }) => {
                console.log(values)
                enableLoading();
                axios.patch("/user/updatepassword", values)
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
                  <div className="form-group first">
                    <Field type="password" name="OldPassword" component={Input} label="Old Password" >
                      {({ field }) => (
                        <div>
                          <input
                            type="password" {...field}
                            value={values.OldPassword}
                            className="form-control"
                            placeholder="enter your old password" />
                          {touched.OldPassword &&
                            errors.OldPassword && <div className="text-white">{errors.OldPassword}</div>}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="form-group last mb-3">
                    <Field type="password" name="NewPassword" component={Input} label="New Password" >
                      {({ field }) => (
                        <div>
                          <input
                            type="password" {...field}
                            value={values.NewPassword}
                            className="form-control"
                            placeholder="enter your new password" />
                          {touched.NewPassword &&
                            errors.NewPassword && <div className="text-white">{errors.NewPassword}</div>}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="form-group last mb-3">
                    <Field type="password" name="ConfirmNewPassword" component={Input} label="Confirm New Password" >
                      {({ field }) => (
                        <div>
                          <input
                            type="password" {...field}
                            value={values.ConfirmNewPassword}
                            className="form-control"
                            placeholder="confirm your new password" />
                          {touched.ConfirmNewPassword &&
                            errors.ConfirmNewPassword && <div className="text-white">{errors.ConfirmNewPassword}</div>}
                        </div>
                      )}
                    </Field>
                  </div>
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="btn btn-block btn-primary" id="btn"
                  >
                    <span className={`${loading ? "pr-3" : ""}`}>Save Password</span>
                    {loading && (
                      <span className="spinner-border text-light"></span>
                    )}

                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>)
}

export default ChangePasswordPage;