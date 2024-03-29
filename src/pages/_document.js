import { Html, Head, NextScript, Main } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
