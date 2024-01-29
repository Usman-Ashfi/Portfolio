import "@/styles/form.css";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Layout from "./layout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <SpeedInsights />
      </QueryClientProvider>
    </Layout>
  );
}
