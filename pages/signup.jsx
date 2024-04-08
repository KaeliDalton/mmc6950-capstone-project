import Head from 'next/head';
import Link from 'next/link';
import {withIronSessionSsr} from 'iron-session/next';
import sessionOptions from '../config/session';
import { useState } from "react";
import {useRouter} from 'next/router';
import Header from '../components/header'
import styles from '../styles/signup.module.css'
import Footer from '../components/footer';

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

export default function Signup(props){
    const router = useRouter();
    const [
        { username, password, "confirm-password": confirmPassword },
        setForm,
      ] = useState({
        username: "",
        password: "",
        "confirm-password": "",
    })
    const [error, setError] = useState("")

    function handleChange(e){
        setForm({
            username,
            password,
            "confirm-password": confirmPassword,
            ...{ [e.target.name]: e.target.value.trim() },
        });
    }
    async function handleAccountCreation(e) {
        e.preventDefault();
        if (!username.trim()) return setError("Must have username and password")
        if (!password.trim()) return setError("Must have password")
        if (!confirmPassword.trim()) return setError("You must confirm password to create account")
        if (password !== confirmPassword) return setError("Passwords must match")

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (res.status === 200) return router.push("/")
            const { error: message } = await res.json();
            setError(message);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Head>
                <title>MyReads Sign Up</title>
                <meta name='description' content='Create an account for MyReads' />
                <link rel="icon" href='/favicon.png'/>
            </Head>

            <Header isLoggedIn={props.isLoggedIn} className={styles.container}/>

            <main className={styles.main}>
                <h1 className={styles.title}>Create an account:</h1>
                <form onSubmit={handleAccountCreation}  className={styles.form}>
                <label htmlFor="username" className={styles.label}>Username: </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    value={username}
                    className={styles.input}
                 />
                 <label htmlFor="password" className={styles.label}>Password: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={password}
                    className={styles.input}
                 />
                 <div className={styles.password}>
                 <label htmlFor="confirm-password" className={styles.label}>Confirm Password: </label>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    onChange={handleChange}
                    value={confirmPassword}
                    className={styles.input}
                 />

                 </div>
                 <button>Create Account</button>
                 {error && <p>{error}</p>}
                </form>
                <div className={styles.login}>
                <p>
                Do you want to 
                <Link href="/login"  className={styles.Link}> Log In </Link>
                 instead?
                </p>
                </div>
            </main>
            <Footer />
        </>
    );
}