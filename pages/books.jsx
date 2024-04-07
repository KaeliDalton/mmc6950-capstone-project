// Should get books on user's list of books read
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import db from "../db";
import NovelList from "../components/novelList";
import Link from 'next/link'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    let books
    if (user)
      books = await db.book.getAll(user.id)
    if (!books) {
      req.session.destroy()
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    return {
      props: {
        user: req.session.user,
        isLoggedIn: true,
        readBooks: books,
      }
    };
  },
  sessionOptions
);

export default function Favorites(props) {
  return (
    <>
      <Head>
        <title>MyReads Favorites</title>
        <meta name="description" content="Your favorite books on MyReads" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>Favorite Books</h1>
        {props.readBooks.length > 0 ? <NovelList books={props.readBooks} /> : <NoNovelsFound />}
      </main>
    </>
  );
}

function NoNovelsFound() {
  return (
    <div>
      <p>No books found in your list.</p>
      <p>If you <Link href="/search">search</Link> you can add new books!</p>
    </div>
  )
}