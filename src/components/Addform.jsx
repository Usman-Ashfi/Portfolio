import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Addblog = () => {
  const [tempImg, setTemImg] = useState("");
  const [loading, setLoading] = useState(false);

  var Router = useRouter();

  const catagories = [
    { name: "Tech" },
    { name: "Life Style" },
    { name: "News" },
    { name: "Crimes" },
  ];

  // react hook from -----------------------------------

  const { register, reset, handleSubmit } = useForm({});

  //  submitform function ---------------------------------

  const submitForm = async (e) => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 2000));
      const imageUrl = await UploadImageToCloudinary();
      e.img = imageUrl;
      if (imageUrl) {
        try {
          var res = await fetch("/api/projects", {
            body: JSON.stringify(e),
            method: "POST",
            headers: { "content-Type": "application/json" },
          });
          res = await res.json();
          if (res.success) {
            toast.success(res.message, {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                marginTop: "10px",
              },
            });
            reset();
            setTemImg(null);
            setLoading(false);
          } else {
            toast.error(res.message, {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                marginTop: "10px",
              },
            });
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setLoading(false);
        toast.error("Please Upload imge", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            marginTop: "10px",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // cloudnairy --------------------------------------

  const UploadImageToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("file", tempImg);
      data.append("upload_preset", "upload_img");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/onlineupload/image/upload",
        {
          body: data,
          method: "POST",
        }
      );
      const jsonimg = await res.json();
      return jsonimg.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full">
      <Toaster position="top-center" reverseOrder={true} />
      <form
        className="w-[60%] m-auto max-md:w-[95%] bg-[#101315] px-4 py-6 rounded-lg"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex justify-start items-center gap-4 mb-10 py-4 px-2">
          <div className="h-4 w-4 bg-slate-500 animate-pulse rounded-full"></div>
          <h2 className="text-4xl ">Project Form</h2>
        </div>
        <div className="space-y-8 px-2">
          <div className="col-span-full">
            <input
              disabled={loading}
              type="text"
              className="w-full bg-transparent  border-b py-1 px-2 rounded-sm capitalize font-serif focus:outline-none"
              placeholder="Title"
              {...register("title")}
            />
          </div>
          <div className="col-span-full flex gap-2">
            <input
              disabled={loading}
              type="text"
              className="w-6/12 bg-transparent border-b py-1 px-2 rounded-sm capitalize font-serif focus:outline-none"
              placeholder="Subtitle"
              {...register("subtitle")}
            />
            <select
              disabled={loading}
              label="Select a catagory"
              className="w-6/12 bg-transparent border-b py-1 px-2 rounded-sm font-serif focus:outline-none"
              {...register("catagory")}
            >
              {catagories.map((v, i) => (
                <option className="bg-[#2c2b2b]" key={i} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-full">
            <input
              disabled={loading}
              type="text"
              className="w-full bg-transparent  border-b py-1 px-2 rounded-sm capitalize font-serif focus:outline-none"
              placeholder="Project link..."
              {...register("link")}
            />
          </div>

          {tempImg ? (
            <div className="flex">
              <div className="w-full relative border aspect-video">
                <Image
                  width={700}
                  height={700}
                  alt="upload"
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(tempImg)}
                />
                <i
                  onClick={() => setTemImg(null)}
                  className="bx bx-x absolute top-2 right-2 bg-[#00000083] p-2 rounded-full"
                ></i>
              </div>
            </div>
          ) : (
            <div className="p-5 text-center border border-gray-600 rounded-md">
              <label className="block mb-3 font-medium " htmlFor="image">
                <div>
                  <i className="bx bx-cloud-upload"></i>
                </div>
                <div className="font-serif">Upload Logo</div>
              </label>
              <input
                type="file"
                hidden
                id="image"
                onChange={(e) => {
                  setTemImg(e.target.files[0]);
                }}
              />
            </div>
          )}
          <div className="col-span-full">
            <button
              disabled={loading}
              type="submit"
              className="items-center justify-center w-full px-6 py-2.5 font-serif text-center text-white duration-200 bg-[#161C20] rounded-sm line-flex hover:bg-[#1f282d] hover:border-white hover:text-white focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black disabled:bg-slate-700 disabled:border-none"
            >
              {loading ? (
                <>
                  <div className="flex justify-center gap-4 items-center">
                    <span className="block h-2 w-2 border-b-2 animate-spin rounded-full"></span>
                    Submit...
                  </div>
                </>
              ) : (
                <>Submit Project</>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Addblog;
