import Head from "next/head";
import Header from '../components/header'
import Link from 'next/link'
import sessionOptions from '../config/session'
import { withIronSessionSsr } from "iron-session/next";
import styles from '../styles/Home.module.css'
import Footer from "../components/footer";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({req}){
      const {user} = req.session
      const props = {}
      if (user){
          props.user = req.session.user
      }
      props.isLoggedIn = !!user
      return {props}
  },
  sessionOptions
)

export default function Home() {
  return (
    <>
      <Head>
        <title>MyReads</title>
        <meta name="description" content="MyReads Homepage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />
      <main className={styles.main}>
        <h1 className={styles.title}>MyReads Home</h1>
        <p>With MyReads you can search for books, add them to your read list, write notes, and view your notes.</p>
        <Link href="/login">Login</Link>
        <p>or</p>
        <Link href="/signup" >Sign Up</Link>

        <p>If you have already logged in, try</p>
        <Link href='/search'>Searching,</Link>
        <p> </p>
        <Link href='/books'>Viewing your read list,</Link>
        <p>or</p>
        <Link href='/create'>Creating a note!</Link>
      </main>
      <Footer />
    </>
  );
}
