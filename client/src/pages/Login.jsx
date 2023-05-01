import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { LoginForm, Loader } from "../components";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values, onSubmitProps, onSuccess, onError) => {
    setIsLoading(true);
    try {
      const loggedInResponse = await fetch(
        `${process.env.REACT_APP_EXPRESS_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (!loggedInResponse.ok) {
        // Handle non-2xx response
        const errorResponse = await loggedInResponse.json();
        const error = errorResponse.msg || "An error occurred";
        onError(error);
      } else {
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    navigate("/");
  };

  const handleLoginError = (error) => {
    alert(error);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps, handleLoginSuccess, handleLoginError);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-lato font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Login
          </h1>
        </div>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full mt-[30px] flex flex-col gap-[30px]"
            >
              <LoginForm
                isRegister={false}
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
