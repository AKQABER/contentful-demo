import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.css';
import '../styles/recipe.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="#e74c3c"
        startPosition={0.3}
        stopDelayMs={100}
        height="2"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
