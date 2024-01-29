import Link from "next/link";
import ProjectsCards from "@/components/ProjectCards";
import { Usefetchme } from "@/hooks/aboutme";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Loading = () => {
  return (
    <div className="terminal-loader">
      <div className="terminal-header">
        <div className="terminal-title">Status</div>
        <div className="terminal-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
      </div>
      <div className="text">Loading...</div>
    </div>
  );
};

const Index = () => {
  // Loading message ================================
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  // Copy message ================================

  const copy = (text) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Copied", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          marginTop: "10px",
        },
      });
    }
  };

  // Copy message ================================

  const { isLoading, error, data } = Usefetchme();
  if (isLoading) {
    return <></>;
  }

  if (error)
    return (
      <div className="grid place-content-center h-[30vh]">
        <div className="flex justify-between items-center gap-4 text-yellow-300">
          <i className="bx bx-error"></i>
          <span>Somthing Went Wrong</span>
        </div>
      </div>
    );

  let me = data?.data?.message;

  const { twitter, lk, insta, git, upw, phone } = me;
  const social = [
    {
      herf: lk,
      i: "bx bxl-linkedin-square group-hover:text-blue-500",
    },
    {
      herf: upw,
      i: "bx bxl-upwork group-hover:text-green-500",
    },
    {
      herf: git,
      i: "bx bxl-github group-hover:text-white",
    },
    {
      herf: insta,
      i: "bx bxl-instagram-alt group-hover:bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] group-hover:bg-clip-text group-hover:text-transparent",
    },
    {
      herf: twitter,
      i: "bx bxl-xing group-hover:text-white",
    },
    {
      herf: `tel:${phone}`,
      i: "bx bxl-whatsapp group-hover:text-green-500",
    },
  ];

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />

      {showLoading ? (
        <Loading />
      ) : (
        <>
          <section className="h-[300px]">
            {/* <video
                className="w-full h-full aspect-video blur-sm object-cover"
                autoPlay
                loop
                muted
              >
                <source src="/bg.mp4" />
              </video> */}
          </section>

          <section className="max-w-[550px] px-4 m-auto">
            {/* intro Section -------------------------------------------- */}
            <section className="mb-4">
              <div className="w-full flex justify-center ">
                <Image
                  width={300}
                  height={300}
                  className="w-[150px] h-[150px] border-4 border-gray-700 rounded-full object-cover bg-[#0000007a]"
                  src="/me.png"
                  alt="usman"
                />
              </div>
              <div className="text-center flex flex-col gap-4">
                <h2 className="text-4xl py-4 md">{me?.Name}</h2>

                <div className="flex justify-center gap-4 flex-wrap">
                  {social?.map((v, i) => (
                    <Link
                      className="group text-gray-300"
                      key={i}
                      target="_blank"
                      href={v.herf}
                    >
                      <i className={`${v.i} mr-4 text-3xl max-md:text-lg `}></i>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center gap-2 flex-wrap-reverse">
                  <button className="bg-slate-200 text-black rounded-lg flex-auto">
                    <i className="bx bx-upload text-xl py-3 px-4"></i>
                  </button>
                  <button
                    onClick={() => copy(me?.email)}
                    className="bg-slate-200 max-md:text-sm text-black rounded-lg h-full py-1 px-4 flex-auto w-[80%]"
                  >
                    <span>{me?.email}</span>
                    <i className="bx bx-copy  py-3 pl-4"></i>
                  </button>
                </div>
              </div>
            </section>
            {/* About Section ---------------------------------------------*/}
            <section>
              <h2 className="text-3xl py-4 border-b-2 font-[Modren]">About</h2>

              <div className="py-4">
                <p className="text-gray-400 ">{me?.description}</p>
              </div>
            </section>
            {/* Project Section ------------------------------------------ */}
            <section>
              <h2 className="text-3xl py-4 border-b-2 font-[Modren]">
                Projects
              </h2>
              <div className="py-4">
                <ProjectsCards />
              </div>
            </section>
          </section>
        </>
      )}
    </>

  );
};

export default Index;
