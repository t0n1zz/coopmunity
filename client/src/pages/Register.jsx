import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginForm, Loader } from "../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  birthDate: yup.string().required("required"),
  gender: yup.string().required("required"),
  language: yup.string().required("required"),
  creditUnion: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().optional(),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  birthDate: "",
  gender: "",
  language: "",
  creditUnion: "",
  occupation: "",
  picture: "",
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values, onSubmitProps, onSuccess, onError) => {
    setIsLoading(true);
    try {
      // this allows us to send form info with image
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      if (values.picture) {
        formData.append("picturePath", values.picture.name);
      }

      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_EXPRESS_URL}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!savedUserResponse.ok) {
        // Handle non-2xx response
        const errorResponse = await savedUserResponse.json();
        const error = errorResponse.msg || "An error occurred";
        onError(error);
      } else {
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
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

  const handleRegisterSuccess = () => {
    navigate("/login");
  };

  const handleRegisterError = (error) => {
    toast.error(error);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(
      values,
      onSubmitProps,
      handleRegisterSuccess,
      handleRegisterError
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1
            className="font-lato font-bold sm:text-[25px] text-[18px] leading-[38px] text-white
        "
          >
            Register
          </h1>
        </div>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full mt-[30px] flex flex-col gap-[30px]"
            >
              <LoginForm 
                isRegister={true}
                values={values}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
