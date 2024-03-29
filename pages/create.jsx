//spaces between words would be super neat -> troubleshoot this down the road
import Head from 'next/head'
import {useState} from 'react'
import {useRouter} from 'next/router'
import {withIronSessionSsr} from 'iron-session/next'
import sessionOptions from '../config/session'
import Header from '../components/header'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req}){
        const {user} = req.session
        const props = {}
        if (user){
            props.user = req.session.user
        }
        props.isLoggedIn = !! user
        return {props}
    },
    sessionOptions
)

export default function Create(props){
    const router = useRouter()
    const [
        {title, author, dateStarted, dateFinished, noteBody}, setForm,
    ] = useState({
        title: "",
        author: "",
        dateStarted: "",
        dateFinished: "",
        noteBody: " ",
    })
    const [error, setError] = useState("")

    function handleChange(e){
        setForm({
            title,
            author,
            dateStarted,
            dateFinished,
            noteBody,
            ...{ [e.target.name]: e.target.value.trim()},
        })
    }

    async function handleNoteCreation(e){
        e.preventDefault()
        if (!title.trim()) return setError("Must include title")
        if (!author.trim()) return setError('Must include author')
        if (!noteBody.trim()) return setError('Must have note body')

        try{
            const res = await fetch('/api/note', {
                method: "POST",
                body: JSON.stringify({title, author, dateFinished, dateStarted, noteBody})
            })
            if (res.status == 200) return router.push("/note")
            const {error: message} = await res.json()
            setError(message)
        }catch (err){
            console.log(err)
        }
    }
    return (
        <>
        <Head>
            <title>MyReads Note Creation</title>
            <meta name="description" content="Create a note in your MyReads account" />
        </Head>
        <Header isLoggedIn={props.isLoggedIn} />

        <main>
            <h1>Create a note below:</h1>

            <form onSubmit={handleNoteCreation} >
                <label htmlFor="title">Title:</label>
                <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={title}
                />
                <label htmlFor="author">Author:</label>
                <input
                 type="text"
                 name="author"
                 id="author"
                 onChange={handleChange}
                 value={author}
                />
                <label htmlFor="dateStarted">Date Started:</label>
                <input
                 type="text"
                 name="dateStarted"
                 id="dateStarted"
                 onChange={handleChange}
                 value={dateStarted}
                />
                <label htmlFor="dateFinished">Date Finished:</label>
                <input
                 type="text"
                 name="dateFinished"
                 id="dateFinished"
                 onChange={handleChange}
                 value={dateFinished}
                />
                <label htmlFor="noteBody">Notes:</label>
                <input
                 type="text"
                 name="noteBody"
                 id="noteBody"
                 onChange={handleChange}
                 value={noteBody}
                />
                <button>Create</button>
                {error && <p>{error}</p>}
            </form>
        </main>
        </>
    )
}