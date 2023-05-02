import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { CustomButton, FormField, Loader } from "components";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

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
    tags: [],
  });

  const handleFormFieldChange = (fieldName, fieldValue) => {
    setForm({ ...form, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.picture) {
        formData.append("picture", form.picture);
        formData.append("picturePath", form.picturePath);
      }

      form.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });

      const response = await fetch(
        `${process.env.REACT_APP_EXPRESS_URL}/posts`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const error = errorResponse.msg || "An error occurred";
        handleError(error);
      } else {
        const jsonResponse = await response.json();
        const { posts, savedPost } = jsonResponse;
        dispatch(setPosts({ posts }));
        navigate(`/post-detail/${savedPost._id}`)
      }
    } catch (error) {
      console.log(error);
      handleError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    alert(error);
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
            Create a Post
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <FormField
            name="title"
            labelName="Title"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e.target.value)}
          />
          <FormField
            name="tags"
            labelName="Tags"
            placeholder="Write a tags"
            inputType="tags"
            value={form.tags}
            handleChange={(e) => handleFormFieldChange("tags", e)}
          />
          <FormField
            name="picture"
            labelName="Picture"
            inputType="file"
            value={form.picture}
            handleChange={(name, file) =>
              handleFormFieldChange("picture", file)
            }
          />
          <FormField
            name="description"
            labelName="Content"
            placeholder="Write a content"
            inputType="wyswyg"
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="Submit new post"
              styles="bg-[#1dc071]"
              icon={faArrowUpFromBracket}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
