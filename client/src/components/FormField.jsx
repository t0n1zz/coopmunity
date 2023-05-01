import React from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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
}) => {
  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      outline: "none",
      border: "1px solid #3a3a43",
      backgroundColor: "transparent",
      fontFamily: "lato",
      fontSize: "14px",
      color: "white",
      borderRadius: "10px",
      minWidth: "300px",
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
          required
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      );
    } else if (inputType === "select") {
      return (
        <Select
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          options={selectOptions}
          styles={customStyles}
        />
      );
    } else if (inputType === "file") {
      return (
        <div
          className={`border border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder-[#4b5264] rounded-[10px] min-w-[300px] p-3 ${
            isDragActive ? "bg-gray-800" : ""
          }`}
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
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
          required
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] "
        />
      );
    }
  };

  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
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
