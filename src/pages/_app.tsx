import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@xyflow/react/dist/style.css";
import { WotNotDataProvider } from "@/context/wotnotData";
import { SideDrawer } from "@/context/wotnotSideDrawer";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SideDrawer>
        <WotNotDataProvider>
          <Component {...pageProps} />
        </WotNotDataProvider>
      </SideDrawer>
    </QueryClientProvider>
  );
}
