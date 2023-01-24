import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from "../components/Navbar";
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
        <Head>
          <title>ODU - Accidentologie à Vélo</title>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <link rel="icon" href="/bicycle.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
    </div>
  )
}