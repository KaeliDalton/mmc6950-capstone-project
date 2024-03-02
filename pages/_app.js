import "../styles/globals.css";
import {ReadProvider} from '../context/read'

export default function App({ Component, pageProps }) {
  return (
    <ReadProvider>
      <div>
      <Component {...pageProps} />
      </div>

    </ReadProvider>
  )
}
