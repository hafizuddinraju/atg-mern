import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcAddImage } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthDataContext } from "../../AuthContext/AuthContext";
import AllPost from "../AllPost/AllPost";
import MediumSpinner from "../Spinner/MediumSpinner";
const Post = () => {
  const { user } = useContext(AuthDataContext);

  const { register, handleSubmit, resetField } = useForm({
    mode: "onChange",
    defaultValues: {
      // userId: user?._id,
      postContent: "",
      username: user?.displayName,
      email: user?.email,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    fetch("https://server-atg-mern.vercel.app/addPost", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        refetch();
        toast.success(result.message, { autoClose: 500 });
      })
      .catch((error) => {
        toast.error(error, { autoClose: 1000 });
      });

    resetField("postContent");
  };
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://server-atg-mern.vercel.app/allPost");
      const data = await res.json();
      return data.data;
    },
  });
  const handleDeletePost = (id) => {
    console.log(id);
    fetch(`https://server-atg-mern.vercel.app/allPost/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        refetch();
        toast.success(result.message, { autoClose: 500 });
      })
      .catch((error) => {
        toast.error(error, { autoClose: 1000 });
      });
  };

  if (isLoading) {
    return <MediumSpinner></MediumSpinner>;
  }
  return (
    <>
      <div className="max-w-screen-sm mx-auto my-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2 bg-gray-400 rounded-t-lg">
              <textarea
                rows="4"
                {...register("postContent", {
                  required: "Content is required",
                })}
                className="w-full px-2 py-1 text-sm text-gray-900 bg-gray-200 border-0"
                placeholder="What's on your mind..."
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
              <div className="flex pl-0 space-x-1 sm:pl-2">
                <button
                  type="button"
                  className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <FcAddImage className="text-2xl"></FcAddImage>
                </button>
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800"
              >
                Publish Post
              </button>
            </div>
          </div>
        </form>
      </div>
      {posts?.map((post) => (
        <AllPost
          key={post._id}
          post={post}
          handleDeletePost={handleDeletePost}
          refetch={refetch}
        ></AllPost>
      ))}
    </>
  );
};

export default Post;
