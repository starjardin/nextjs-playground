import "../styles/globals.css";
import { SessionProvider, session } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
