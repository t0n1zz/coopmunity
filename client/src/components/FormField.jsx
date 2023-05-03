import React, { useState } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTags from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "../style/reactTag.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Import the default styles for React Quill

const FormField = ({
  name,
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  handleBlur,
  error,
  helperText,
  selectOptions,
  required = false,
}) => {
  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      outline: "none",
      border: "1px solid #3a3a43",
      backgroundColor: "transparent",
      fontFamily: "lato",
      fontSize: "18px",
      color: "white",
      borderRadius: "10px",
      minWidth: "300px",
      pt: "15px",
      pb: "15px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4b5264" : "transparent",
      color: state.isSelected ? "white" : "#4b5264",
    }),
  };

  const handleDrop = (acceptedFiles) => {
    handleChange(name, acceptedFiles[0]);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    handleChange(name, null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".jpg, .jpeg, .png",
    multiple: false,
    onDrop: handleDrop,
    noClick: true,
  });

  const renderInput = () => {
    if (inputType === "textarea") {
      return (
        <textarea
          required={required}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-lato text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      );
    } else if (inputType === "wyswyg") {
      return (
        <div className="bg-transparent text-white">
          <ReactQuill
            required={required}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
          />
        </div>
      );
    } else if (inputType === "date") {
      return (
        <DatePicker
          selected={value}
          onChange={handleChange}
          dateFormat="yyyy-MM-dd"
          className="border border-[#3a3a43] px-3 py-2 rounded-md w-full bg-transparent"
          placeholderText={placeholder}
        />
      );
    } else if (inputType === "select") {
      return (
        <Select
          required={required}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          options={selectOptions}
          styles={customStyles}
        />
      );
    } else if (inputType === "tags") {
      return (
        <ReactTags
          required={required}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          addOnBlur={true}
          addKeys={[9, 13, 188]} // Add tags on Tab, Enter, or comma key press
        />
      );
    } else if (inputType === "file") {
      return (
        <div
          className={`border border-[#3a3a43] bg-transparent font-lato text-white text-[14px] placeholder-[#4b5264] rounded-[10px] min-w-[300px] p-3 ${
            isDragActive ? "bg-gray-800" : ""
          }`}
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} required={required} />
            {!value ? (
              <p>Add Picture Here</p>
            ) : (
              <div className="flex items-center justify-between">
                <p>{value.name}</p>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="mr-2 cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="cursor-pointer"
                    onClick={handleRemoveFile}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <input
          required={required}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-lato text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] "
        />
      );
    }
  };

  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-lato font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {renderInput()}
      {error && <p className="text-red-500">{error}</p>}
      {helperText && <p className="text-gray-500">{helperText}</p>}
    </label>
  );
};

export default FormField;
