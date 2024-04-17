import Head from "next/head";
import Header from "../components/header";
import sessionOptions from '../config/session'
import { useReadContext } from "../context/read";
import NovelList from "../components/novelList";
import * as actions from '../context/read/actions'
import {useState, useRef} from 'react'
import {withIronSessionSsr} from 'iron-session/next'
import styles from '../styles/search.module.css'
import Footer from "../components/footer";

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({req}) {
//     const {user} = req.session
//     const props = {}
//     if (user){
//       props.user = req.session.user
//     }
//     props.isLoggedIn = !!user
//     return { props }
//   },
//   sessionOptions
// )

export default function Search() {
  const [{novelSearchResults}, dispatch] = useReadContext()
  const [query, setQuery] = useState("")
  const [previousQuery, setPreviousQuery] = useState()
  const inputRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    if ( !query.trim() || query === previousQuery) return
    setPreviousQuery(query)
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?langRestrict=en&q=${query}&maxResults=8`
    )
    if (res.status !== 200) return
    const data = await res.json()
    dispatch({
      action: actions.SEARCH_NOVELS,
      payload: data?.items
      ?.map(({id, volumeInfo}) => ({
        ...volumeInfo,
        googleId: id,
        image: volumeInfo?.imageLinks?.thumbnail
      }))
    })
  }

  return (
    <>
      <Head>
        <title>MyReads Search</title>
        <meta name="description" content="MyReads Search Page" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* <Header isLoggedIn={props.isLoggedIn} /> */}
      <main>
        <h1 className={styles.title}>MyReads Book Search</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.blocks}>
          <label className={styles.label} htmlFor="novel-search">Search by author, title, and/or keywords:</label>
          <div>
            <input
              type="text"
              name="novel-search"
              id="novel-search"
              value={query}
              autoFocus={true}
              onChange={e => setQuery(e.target.value)}
              ClassName={styles.input}/>
            <button type="submit">Search</button>
          </div>
          </div>
        </form>
        {/* {
           novelSearchResults?.length
           ? <NovelList books={novelSearchResults} className={styles.results}/>
           : <NoResults {...{inputRef, previousQuery}} clearSearch={() => setQuery("")} />
        } */}
      </main>
      <Footer/>
    </>
  )
}

// function NoResults({inputRef, previousQuery, clearSearch}){
//   function handleSearch(){
//     inputRef.current.focus()
//     if (previousQuery) clearSearch()
//   }
// return (
//   <div>
//     <p>{previousQuery ? `No Results for "${previousQuery}"` : "No Results"}</p>
//     <button onClick={handleSearch}>
//       {
//         previousQuery
//         ? `Try another search?`
//         : `Enter a term to search`
//       }
//     </button>
//   </div>
// )
// }