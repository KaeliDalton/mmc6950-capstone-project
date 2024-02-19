//BOOKER STARTER CODE, LOOK AT 'PLAGIARIZED' CODE FOR SOLUTION AND AGAIN CHANGE TO FIT NEEDS
import Head from 'next/head'
import { useRouter } from "next/router"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import db from '../../db'
import styles from '../../styles/Book.module.css'

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

export default function findBook(props) {
  const router = useRouter()
  const bookId = router.query.id

  let isRead = false
  let book
  if (props.book) {
    book = props.book
    isRead = true
  } else
    book = bookSearchResults.find(book => book.googleId === bookId)

  useEffect(() => {
    if (!props.book && !book)
      router.push('/')
  }, [props.book, bookSearchResults, book, router])

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
        
      </Head>
      {
        book &&
        <main>
          <BookInfo isReadBook={isRead} {...book}/>
          <div>
            {
              <button onClick={markRead}>
                  Mark as Read
                </button>
            }
          </div>
        </main>
      }
    </>
  )
}

function BookInfo({
  title,
  author,
  imageLink,
  description,
  isRead,
  pubYear,
}) {
  return (
    <>
      <div>
        <div>
          <h1>{title}{isRead}</h1>
          {
            author && author.length > 0 &&
            <h2>By: {author.join(", ").replace(/, ([^,]*)$/, ', and $1')}</h2>
          }
        </div>
        
          <img src={imageLink}/>
      </div>
      <p>Description:<br/>{description}</p>
      <p>Published: {pubYear}</p>
    </>
  )
}
