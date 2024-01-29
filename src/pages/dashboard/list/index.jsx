import { Usefetch } from "@/hooks/queryfetchProjects";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layoutd from "../layoutd";

export default function App() {
  var [selectedKey, setkey] = useState([]);
  var [checks, setcheck] = useState(false);

  // * Selecting From the List through checkbox---------------------

  const handleSelect = (i) => {
    var id = i;
    if (!selectedKey.includes(id)) {
      var copy = selectedKey;
      copy.push(id);
      setkey(copy);
      console.log(selectedKey);
    } else {
      const index = selectedKey.indexOf(id);
      selectedKey.splice(index, 1);
      console.log(selectedKey);
    }
  };
  // * Selecting From the List through checkbox---------------------

  // ! Deleting From the List --------------------------------------
  const deleting = async (id) => {
    var res = await axios.delete(`/api/projects?_id=${id}`);
    if (res.data.success) {
      toast.success(res.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          marginTop: "10px",
        },
      });
    }
  };
  const del = async (arr) => {
    if (!arr.length > 0) {
      toast.error("Please select item to Delete", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          marginTop: "10px",
        },
      });
    }
    arr?.map(async (v) => {
      console.log(v);
      deleting(v);
    });
  };

  const checkin = () => {
    if (checks == true) {
      setcheck(false);
    } else {
      setcheck(true);
    }
  };
  // ! Deleting From the List --------------------------------------
  // ? Fetching Data -----------------------------------------------

  const { isLoading, error, data } = Usefetch();

  if (isLoading) return <p className="text-white">Loading....</p>;

  if (error) return <p className="text-white">Error {error.message} </p>;
  // ? Fetching Data -----------------------------------------------

  return (
    <Layoutd>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="px-4">
        <div className="text-sm flex flex-wrap justify-between items-center gap-4 pt-10 md:py-10 px-4">
          <div className="flex gap-4 text-2xl">
            <div className="w-min animate-spin-slower">⌔</div>
            <h2 className=" font-extrabold text-white font-[Modren]">
              PROJECTS
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => checkin()}
              className="bg-orange-400 py-1 px-2 rounded-sm flex items-center justify-between gap-1"
            >
              <i className="bx bxs-select-multiple"></i>
              Select All
            </button>
            <button
              onClick={() => del(selectedKey)}
              className="bg-red-500 py-1 px-2 rounded-sm flex items-center justify-between gap-1"
            >
              <i className="bx bxs-trash-alt"></i>
              Delete
            </button>
          </div>
        </div>

        {/* table ------------------------------------------------ */}
        <section className="data-table overflow-x-auto py-4 w-full">
          <table className="min-w-[1000px] w-full">
            <thead className="bg-[#202325]">
              <tr>
                <th className="w-1">Action</th>
                <th className="text-left px-4">Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody items={data.message}>
              {data?.message?.map((v, i) => (
                <tr className="bg-[#2f3336]" key={i}>
                  <td>
                    <input
                      type="checkbox"
                      id="check"
                      onChange={() => {
                        handleSelect(v._id);
                      }}
                    />
                  </td>
                  <td>{v.title}</td>
                  <td>
                    <div className="flex justify-around">
                      <button>
                        <i className="bx bxs-edit-alt"></i>
                      </button>
                      <button onClick={() => deleting(v._id)}>
                        <i className="bx bxs-trash-alt text-red-600"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* table ------------------------------------------------ */}
      </div>
    </Layoutd>
  );
}
