import Head from 'next/head';
import {withIronSessionSsr} from 'iron-session/next';
import sessionOptions from '../config/session';
import Header from '../components/header'
import styles from '../styles/signup.module.css'
import Footer from '../components/footer';


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }){
        const { user } = req.session;
        const props = {};
        if (user){
            props.user = req.session.user;
        }
        props.isLoggedIn = !!user;
        return { props };
    },
    sessionOptions
);
export default function Favorites(props) {
    return (
      <>
        <Head>
          <title>MyReads Notes</title>
          <meta name="description" content="Your favorite books on MyReads" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header isLoggedIn={props.isLoggedIn} />
  
        <main className={styles.main}>
          <h1 className={styles.title}>Notes</h1>
         <p>See Your Notes Here!</p>
        </main>
        <Footer />
      </>
    );
  }
  