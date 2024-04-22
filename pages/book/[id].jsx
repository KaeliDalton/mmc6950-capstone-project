
import Head from 'next/head'
import { useRouter } from "next/router"
import { useEffect } from 'react'
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import { useReadContext } from "../../context/read"
import db from '../../db'
import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from '../../styles/info.module.css'
import Image from 'next/image';


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
    const { user } = req.session;
    const props = {};
    if (user) {
      props.user = req.session.user;
      const book = await db.book.getByGoogleId(req.session.user.id, params.id)
      if (book)
        props.book = book
    }
    props.isLoggedIn = !!user;
    return { props };
  },
  sessionOptions
);

function NovelInfo({
  title,
  authors,
  image,
  description,
  isRead,
  year,
}) {
  return (
    <>
     <html lang="en">
      <div>
        <div>
          <h1 className={styles.title}>{title}{isRead}</h1>
          {
            authors && authors.length > 0 &&
            <h2 className={styles.title}>By: {authors.join(", ").replace(/, ([^,]*)$/, ', and $1')}</h2>
          }
        </div>
        <img
            src={image}
            width={102}
            height={182}
            alt={title}
            />
      </div>
      <p>Description:<br/>{description}</p>
      {/* <p>Published: {year}</p> */}
    </html>
    </>
  )
}



export default function FindBook(props) {
  const router = useRouter()
  const bookId = router.query.id
  const {isLoggedIn} = props
  const [{novelSearchResults}] = useReadContext()

  let isRead = false
  let book
  if (props.book) {
    book = props.book
    isRead = true
  } else
    book = novelSearchResults.find(book => book.googleId === bookId)

  useEffect(() => {
    if (!props.book && !book)
      router.push('/')
  }, [props.book, novelSearchResults, book, router])

  async function markRead() {
    const res = await fetch('/api/book', {
      method: "POST",
      body: JSON.stringify(book)
    })
    if (res.status === 200){
      router.replace(router.asPath)
    }
  }

  return (
    <>
      <Head>
        <title>MyReads Book Information</title>
        <meta name="description" content="View a book on MyReads" />
        <link rel="icon" href="/favicon.png" />
        
      </Head>
      <Header isLoggedIn={isLoggedIn} />

      {
        book &&
        <main className={styles.main}>
          <NovelInfo isReadBook={isRead} {...book}/>
          <div>
            {
              <button onClick={markRead} className={styles.button}>
                  Mark as Read
                </button>
            }
          </div>
        </main>
      }
      <Footer />
    </>
  )
}
