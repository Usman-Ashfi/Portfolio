import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Layoutd from "./layoutd";

const Index = () => {
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/about?_id=6584c38162d394616ef0bc8d"
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: user?.message || {}, // Set defaultValues to user.message if available
  });

  useEffect(() => {
    if (user?.message) {
      Object.keys(user.message).forEach((key) => {
        setValue(key, user.message[key]);
      });
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      if (!isDirty) {
        toast.error("Data is Same", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            marginTop: "10px",
          },
        });
        return;
      }

      const res = await axios.put("/api/about?_id=6584c38162d394616ef0bc8d", {
        ...data,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setDisable(true);
        !isDirty;
      }
    } catch (error) {
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          marginTop: "10px",
        },
      });
      console.error("Error submitting form:", error);
    }
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    setDisable(false);
  };

  const handleCancelClick = (event) => {
    event.preventDefault(); // Prevents the form submission
    setDisable(true);
  };
  return (
    <>
      <Layoutd>
        <Toaster position="top-center" reverseOrder={true} />
        <form className="h-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 h-full ">
            <section className=" flex flex-col bg-[#111111] rounded-xl">
              <div className=" flex justify-center py-10">
                <Image
                  width={150}
                  height={150}
                  className="w-[150px] h-[150px] border-4 border-gray-700 rounded-full object-cover opacity-90"
                  src="/me.png"
                  alt="me"
                />
              </div>
              <fieldset className="w-full  flex flex-col  gap-10 py-10 px-10  rounded-lg">
                <div className="flex flex-col justify-start">
                  <label className="text-lg font-semibold" htmlFor="">
                    Name :
                  </label>
                  <input
                    disabled={disable}
                    required
                    {...register("Name")}
                    className="bg-transparent text-lg border-b py-2 disabled:border-none "
                    placeholder="Name"
                    type="text"
                    defaultValue={user?.message?.Name || ""}
                  />
                </div>

                <div className="flex flex-col ">
                  <label className="text-lg font-semibold" htmlFor="">
                    Email :
                  </label>
                  <input
                    disabled={disable}
                    required
                    {...register("email")}
                    className="bg-transparent border-b py-2 text-lg disabled:border-none "
                    placeholder="Email Address"
                    type="email"
                    defaultValue={user?.message?.email || ""}
                  />
                </div>

                <div className="flex flex-col ">
                  <label className="text-lg font-semibold" htmlFor="">
                    Phone :
                  </label>
                  <input
                    disabled={disable}
                    required
                    {...register("phone")}
                    className="bg-transparent border-b py-2 text-lg disabled:border-none "
                    placeholder="Phone Number"
                    type="tel"
                    defaultValue={user?.message?.phone || ""}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-lg font-semibold" htmlFor="">
                    Skills :
                  </label>
                  <ul className="text-lg ">
                    {user?.message?.tech?.map((v, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <i className="bx bxl-nodejs"></i>
                        <input
                          disabled={disable}
                          required
                          // {...register("tech")}
                          className="bg-transparent border-b py-2 text-lg disabled:border-none "
                          placeholder="Skill"
                          type="text"
                          defaultValue={v.name || ""}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </fieldset>
            </section>

            <section className="bg-[#111111] rounded-xl col-span-2">
              <fieldset className="w-full  flex flex-col  gap-10 py-10 px-10  rounded-lg">
                <div className="flex flex-col gap-3 md:col-span-2">
                  <h1 className="py-6 text-xl uppercase font-semibold">
                    About Me
                  </h1>
                  <textarea
                    disabled={disable}
                    required
                    {...register("description")}
                    className="bg-transparent border-b py-2 text-lg  h-[80px] disabled:border-none "
                    placeholder="Description"
                    type="text"
                    defaultValue={user?.message?.description || ""}
                  />
                </div>
                <div>
                  <h1 className="py-6 text-xl uppercase font-semibold">
                    Social Links
                  </h1>

                  <div className="flex  items-center gap-2">
                    <label
                      className="text-lg font-semibold whitespace-nowrap "
                      htmlFor=""
                    >
                      Linkdien :
                    </label>
                    <input
                      disabled={disable}
                      required
                      {...register("lk")}
                      className="bg-transparent border-b w-full py-2 text-lg disabled:border-none "
                      placeholder="Linkdien Links"
                      type="text"
                      defaultValue={user?.message?.lk || ""}
                    />
                  </div>

                  <div className="flex  items-center gap-2">
                    <label
                      className="text-lg font-semibold whitespace-nowrap "
                      htmlFor=""
                    >
                      GitHub :
                    </label>
                    <input
                      disabled={disable}
                      required
                      {...register("git")}
                      className="bg-transparent border-b py-2 w-full text-lg disabled:border-none "
                      placeholder="GitHub Links"
                      type="text"
                      defaultValue={user?.message?.git || ""}
                    />
                  </div>

                  <div className="flex  items-center gap-2">
                    <label
                      className="text-lg font-semibold whitespace-nowrap "
                      htmlFor=""
                    >
                      Upwork :
                    </label>
                    <input
                      disabled={disable}
                      required
                      {...register("upw")}
                      className="bg-transparent border-b py-2 w-full text-lg disabled:border-none "
                      placeholder="Upwork Links"
                      type="text"
                      defaultValue={user?.message?.upw || ""}
                    />
                  </div>

                  <div className="flex  items-center gap-2">
                    <label
                      className="text-lg font-semibold whitespace-nowrap "
                      htmlFor=""
                    >
                      Instagram :
                    </label>
                    <input
                      disabled={disable}
                      required
                      {...register("insta")}
                      className="bg-transparent border-b py-2 w-full text-lg disabled:border-none "
                      placeholder="Instagram Links"
                      type="text"
                      defaultValue={user?.message?.insta || ""}
                    />
                  </div>

                  <div className="flex  items-center gap-2">
                    <label
                      className="text-lg font-semibold whitespace-nowrap "
                      htmlFor=""
                    >
                      Twitter :
                    </label>
                    <input
                      disabled={disable}
                      required
                      {...register("tw")}
                      className="bg-transparent border-b py-2 w-full text-lg disabled:border-none "
                      placeholder="Twitter Links"
                      type="text"
                      defaultValue={user?.message?.tw || ""}
                    />
                  </div>
                </div>

                <div className="w-full flex justify-end gap-4 md:col-span-2">
                  {disable ? (
                    <button
                      className="bg-green-700 py-2 px-4 rounded-lg"
                      onClick={handleEditClick}
                    >
                      <i className="bx bxs-edit-alt mr-4"></i>Edit
                    </button>
                  ) : (
                    <>
                      <button
                        className="bg-red-700 py-2 px-4 rounded-lg"
                        onClick={handleCancelClick}
                      >
                        <i className="bx bx-x mr-4"></i>Cancel
                      </button>
                      <div className="relative">
                        <i className="bx bx-check-double absolute bottom-3 left-3"></i>
                        <input
                          disabled={!isDirty}
                          className="bg-blue-700 py-2 px-4 pl-10 rounded-lg cursor-pointer disabled:bg-gray-600 disabled:opacity-50 duration-200"
                          type="submit"
                        />
                      </div>
                    </>
                  )}
                </div>
              </fieldset>
            </section>
          </div>
        </form>
      </Layoutd>
    </>
  );
};

export default Index;
