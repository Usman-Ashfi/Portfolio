import { Usefetch } from "@/hooks/queryfetchProjects";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsCards({ setImg }) {
  var loadskeleton = [1, 2, 3, 4, 5];

  const { isLoading, error, data } = Usefetch();
  if (isLoading) {
    return (
      <div className="flex gap-6 flex-wrap justify-between">
        {loadskeleton.map((i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="animate-pulse bg-gray-500 h-12 w-12 rounded-full"></div>
            <div className="space-y-2">
              <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]"></div>
              <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]"></div>
            </div>
          </div>
        ))}
      </div>
    );
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

  return (
    <>
      <div className="flex flex-col gap-4">
        {data?.message?.map((v, i) => (
          <div
            key={i}
            className="bg-[#161616] flex justify-center max-h-[140px] aspect-video rounded-2xl px-6"
          >
            <div className="grid place-content-center">
              <Image
                width={80}
                height={80}
                className="h-auto w-[100px] object-cover"
                src={v.img}
                alt="projectimg"
              />
            </div>
            <div className="flex justify-between items-center w-full pl-6">
              <div>
                <h2>{v.title}</h2>
                <p>{v.subtitle}</p>
              </div>
              <Link
                href={v.link}
                target="_blank"
                className="bg-[#323232] rounded-lg py-2 px-4"
              >
                <i className="bx bx-right-top-arrow-circle"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
