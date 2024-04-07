//spaces between words would be super neat -> troubleshoot this down the road
import Head from 'next/head'
import {useState} from 'react'
import {useRouter} from 'next/router'
import {withIronSessionSsr} from 'iron-session/next'
import sessionOptions from '../config/session'
import Header from '../components/header'
import styles from '../styles/form.module.css'
import Footer from '../components/footer'

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
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Header isLoggedIn={props.isLoggedIn} />

        <main>
            <h1 className={styles.title}>Create a note below:</h1>

            <form className={styles.form} onSubmit={handleNoteCreation} >
                <label htmlFor="title" className={styles.label}>Title:</label>
                <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={title}
                className={styles.input}
                />
                <label htmlFor="author" className={styles.label}>Author:</label>
                <input
                 type="text"
                 name="author"
                 id="author"
                 onChange={handleChange}
                 value={author}
                 className={styles.input}
                />
                <label htmlFor="dateStarted" className={styles.label}>Date Started:</label>
                <input
                 type="text"
                 name="dateStarted"
                 id="dateStarted"
                 onChange={handleChange}
                 value={dateStarted}
                 className={styles.input}
                />
                <label htmlFor="dateFinished" className={styles.label}>Date Finished:</label>
                <input
                 type="text"
                 name="dateFinished"
                 id="dateFinished"
                 onChange={handleChange}
                 value={dateFinished}
                 className={styles.input}
                />
                <label htmlFor="noteBody" className={styles.label}>Notes:</label>
                <input
                 type="text"
                 name="noteBody"
                 id="noteBody"
                 onChange={handleChange}
                 value={noteBody}
                 className={styles.input}
                />
                <button>Create Note</button>
                {error && <p>{error}</p>}
            </form>
        </main>
        <Footer />
        </>
    )
}