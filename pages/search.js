// should get info from external API and return search results in most basic form

import Head from "next/head";

export default function Search() {
  const [query, setQuery] = useState("")
  const [previousQuery, setPreviousQuery] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    if ( !query.trim() || query === previousQuery) return
    setPreviousQuery(query)
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?langRestrict=en&q=${query}&maxResults=16`
    )
    if (res.status !== 200) return
    const data = await res.json()
    return data
  }

  return (
    <>
      <Head>
        <title>MyReads Search</title>
        <meta name="description" content="MyReads Search Page" />
      </Head>
      <main>
        <h1>Book Search</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="book-search">Search by author, title, and/or keywords:</label>
          <div>
            <input
              type="text"
              name="book-search"
              id="book-search"
              value={query}
              autoFocus={true}
              onChange={e => setQuery(e.target.value)}/>
            <button type="submit">Submit</button>
          </div>
        </form>
           <h1>{data.title}</h1>
           <h2>{data.author}</h2>
           <h3>{data.pubYear}</h3>
           <p>{data.description}</p>
      </main>
    </>
  )
}

