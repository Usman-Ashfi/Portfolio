import React from "react";
import Link from "next/link";
const layoutd = ({ children }) => {
  const navlink = [
    { name: "Dashboard", link: "/dashboard", i: "bx bxs-dashboard" },
    { name: "Form", link: "/dashboard/form", i: "bx bxs-add-to-queue" },
    { name: "List ", link: "/dashboard/list", i: "bx bx-table" },
  ];

  function clear() {}

  return (
    <>
      <div className="flex max-md:flex-col gap-2 md:gap-5 h-screen max-md:p-3 p-4 ">
        <aside className="flex max-md:hidden flex-col justify-between px-6 py-12   h-full bg-[#161C20] rounded-3xl ">
          <div className="flex flex-col gap-20">
            <span className="text-3xl leading-loose tracking-wider">
              PORTal
            </span>
            <ul className="text-2xl flex flex-col gap-10 ">
              {navlink?.map((v, i) => (
                <li key={i}>
                  <Link className="font-[Modren]" href={v.link}>
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <Link
              className="flex justify-center items-center w-max gap-2 bg-slate-600 py-2 px-4 rounded-lg"
              href={"/login"}
            >
              <i className="bx bx-log-out-circle"></i>
              Logout
            </Link>
          </div>
        </aside>

        <main className="h-full overflow-auto w-full max-md:rounded-lg rounded-3xl bg-[#161C20] p-4">
          {children}
        </main>

        <div className="py-2 md:hidden backdrop-blur-xl rounded-lg w-full bg-[#111315] ">
          <ul className="text-xl flex justify-evenly items-center gap-10">
            {navlink?.map((v, i) => (
              <li key={i}>
                <Link href={v.link}>
                  <i className={v.i}></i>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default layoutd;
