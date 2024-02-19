// Should get books on user's list of books read
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import db from "../db";

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
        <title>Booker Favorites</title>
        <meta name="description" content="Your favorite books on Booker" />
      </Head>

      <main>
        <h1>Favorite Books</h1>
        <h2> {props.readBooks.title}</h2>
        <h3>{props.readBooks.author} </h3>
        <img src="${props.readBooks.imageLink}"/>
        <h4>{props.readBooks.pubYear}</h4>
        <p>{props.readBooks.description}</p>
      </main>
    </>
  );
}