import { useQuery } from "@tanstack/react-query";


// ? Fetching Blogs Data ----------------------------------------------------------/

export const Usefetch = () => {
  return useQuery({
    queryKey: ["repoData"],
    queryFn: async () => await fetch("/api/projects").then((res) => res.json()),
    refetchInterval: 5000,
  });
};