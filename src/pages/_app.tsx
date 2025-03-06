import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@xyflow/react/dist/style.css';
import { WotNotDataProvider } from '@/context/wotnotData';
import { SideDrawer } from '@/context/wotnotSideDrawer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SideDrawer>
      <WotNotDataProvider>
        <Component {...pageProps} />
      </WotNotDataProvider>
    </SideDrawer>
  );
}
