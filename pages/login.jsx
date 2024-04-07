import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import sessionOptions from '../config/session';
import Header from '../components/header';
import styles from '../styles/login.module.css'
import Footer from '../components/footer'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }){
        const { user } = req.session;
        const props = {};
        if (user){
            props.user = req.session.user;
        }
        props.isLoggedIn = !!user;
        return { props };
    },
    sessionOptions
);

export default function Login(props){
    const router = useRouter()
    const [{ username, password }, setForm] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    function handleChange(e) {
        setForm({ username, password, ...{ [e.target.name]: e.target.value } })
    }
    async function handleLogin(e){
        e.preventDefault()
        if (!username.trim() || !password.trim())
        return setError('Must have username and password')
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({username, password}),
        })
        if (res.status === 200) return router.back()
        const {error: message} = await res.json()
    setError(message)
    } catch(err){
        console.log(err)
    }
    }
    return (
        <>
        <Head>
            <title>MyReads Log In Page</title>
            <meta name="description" content="MyReads Log In Page"/>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Header  isLoggedIn={props.isLoggedIn}/>
        <main className={styles.main}>
            <h1 className={styles.title}>Welcome! Please log in below</h1>
            <form className={styles.form} onSubmit={handleLogin}>
                <label htmlFor="username" className={styles.label}>Username:</label>
                <input type="text" name="username" id="username" className={styles.input} onChange={handleChange} value={username} />
                <label httmlFor="password" className={styles.label}>Password:</label>
                <input type="password" name="password" id="password" className={styles.input} onChange={handleChange} value={password} />
                <button>Log In</button>
                {error && <p>{error}</p>}
            </form>
            <div className={styles.signup}>
            <p>If you do not have an account,
            <Link href="/signup" className={styles.Link}> Sign Up </Link>
            here!</p>

            </div>
        </main>
        <Footer />
        </>
    )
}