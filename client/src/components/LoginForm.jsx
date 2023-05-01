// YourForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, CustomButton } from "components";
import { countries } from "countries-list";

const LoginForm = ({
  isRegister,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFieldValue("location", selectedOption.value);
    setSelectedLanguage(""); // Reset language when country changes
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setFieldValue("language", selectedOption.value);
  };

  const countryLanguages = selectedCountry
    ? countries[selectedCountry.value].languages.map((language) => ({
        value: language,
        label: language,
      }))
    : [];

  const countryOptions = Object.keys(countries).map((countryCode) => ({
    value: countryCode,
    label: countries[countryCode].name,
  }));

  return (
    <>
      {isRegister && (
        <>
          <div className="flex flex-wrap gap-4 lg:flex-row lg:gap-2">
            <FormField
              name="firstName"
              labelName="First Name*"
              placeholder="Type your firstname"
              inputType="text"
              value={values.firstName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <FormField
              name="lastName"
              labelName="Last Name*"
              placeholder="Type your lastname"
              inputType="text"
              value={values.lastName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </div>
          <FormField
            name="location"
            labelName="Location*"
            inputType="select"
            value={selectedCountry}
            handleChange={handleCountryChange}
            handleBlur={handleBlur}
            selectOptions={countryOptions}
            error={Boolean(touched.location) && Boolean(errors.location)}
            helperText={touched.location && errors.location}
          />
          <FormField
            name="language"
            labelName="Langugage*"
            inputType="select"
            value={selectedLanguage}
            handleChange={handleLanguageChange}
            handleBlur={handleBlur}
            selectOptions={countryLanguages}
          />
          <div className="flex flex-wrap gap-4 lg:flex-row lg:gap-2">
            <FormField
              name="creditUnion"
              labelName="Credit Union*"
              placeholder="Type your credit union name"
              inputType="text"
              value={values.creditUnion}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={Boolean(touched.creditUnion) && Boolean(errors.creditUnion)}
              helperText={touched.creditUnion && errors.creditUnion}
            />
            <FormField
              name="occupation"
              labelName="Occupation*"
              placeholder="Type your occupation"
              inputType="text"
              value={values.occupation}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
            />
          </div>
          <FormField
            name="picture"
            labelName="Profile Picture"
            inputType="file"
            value={values.picture}
            handleChange={(name, file) => setFieldValue(name, file)}
            handleBlur={handleBlur}
          />
        </>
      )}
      <FormField
        name="email"
        labelName="Email*"
        placeholder="Type your email"
        inputType="text"
        value={values.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={Boolean(touched.email) && Boolean(errors.email)}
        helperText={touched.email && errors.email}
      />
      <FormField
        name="password"
        labelName="Password*"
        placeholder="Type your password"
        inputType="password"
        value={values.password}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={Boolean(touched.password) && Boolean(errors.password)}
        helperText={touched.password && errors.password}
      />

      <div className="flex flex-col justify-center items-center gap-5 ">
        <CustomButton
          btnType="submit"
          title={isRegister ? "REGISTER" : "LOGIN"}
          styles={isRegister ? "bg-[#1dc071] w-1/2" : "bg-[#3e3e63] w-1/2"}
        />
        <CustomButton
          btnType="button"
          title={
            isRegister
              ? "Already have an account? Login here."
              : "Don't have an account? Sign Up here."
          }
          styles="w-1/2"
          handleClick={() => {
            if (isRegister) navigate("/login");
            else navigate("/register");
          }}
        />
      </div>
    </>
  );
};

export default LoginForm;
