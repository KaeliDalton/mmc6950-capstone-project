//Should get all Notes for a user's account and do a really basic display of that info.
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import db from "../db";
import NoteList from "../components/noteList";
import Footer from "../components/footer";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    let notes
    if (user)
      notes = await db.note.getAll(user.id)
    if (!notes) {
      req.session.destroy()
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    return {
      props: {
        user: req.session.user,
        isLoggedIn: true,
        notes: notes,
      }
    };
  },
  sessionOptions
);

export default function Notes(props) {
  return (
    <>
      <Head>
        <title>MyReads Notes</title>
        <meta name="description" content="Your notes on MyReads" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>Your Notes</h1>
      {props.notes.length > 0 ? <NoteList notes={props.notes} /> : <p> No Notes Found.</p>}
      </main>
      <Footer />
    </>
  );
}
