import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

import { CustomButton, FormField } from "components";
import { checkIfImage } from "utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [form, setForm] = useState({
    title: "",
    description: "",
    picture: null,
    picturePath: null,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.picture) {
      formData.append("picture", form.picture);
      formData.append("picturePath", form.picturePath);
    }

    const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setForm({
      title: "",
      description: "",
      picture: null,
      picturePath: null,
    });
    setIsLoading(false);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loader..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1
          className="font-lato font-bold sm:text-[25px] text-[18px] leading-[38px] text-white
        "
        >
          Create a Post
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <FormField
          labelName="Title"
          placeholder="Write a title"
          inputType="text"
          value={form.title}
          handleChange={(e) => handleFormFieldChange("title", e)}
        />
        <FormField
          labelName="Tag"
          placeholder="Write a tag"
          inputType="text"
          value={form.tag}
          handleChange={(e) => handleFormFieldChange("tag", e)}
        />
        <FormField
          name="picture"
          labelName="Picture"
          inputType="file"
          value={form.picture}
          handleChange={(name, file) => handleFormFieldChange('picture', file)}
        />
        <FormField
          labelName="Content"
          placeholder="Write a content"
          inputType="textarea"
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new post"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
