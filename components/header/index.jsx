import Link from "next/link"
import useLogout from '../../hooks/useLogout'
import styles from './style.module.css'
import Image from "next/image"

export default function Header(props){
    const logout = useLogout()
    return (
        <header className={styles.container}>
             <Image src="/myreads.png" alt="MyReads Logo" width={105} height={40} className={styles.img}/>
            <div className={styles.nav}>
                {props.isLoggedIn ? (
                    <>
                    <Link href='/books' className={styles.Link}>Your List</Link>
                    <Link href='/note' className={styles.Link}>Your Notes</Link>
                    <Link href='/search' className={styles.Link}>Search</Link>
                    <Link href='/create' className={styles.Link}>Create Note</Link>
                    <a href="#" onClick={logout} className={styles.Link}>
                        Logout
                    </a>
                    </>
                ) :(
                    <>
                    {/* <Link href='/search' className={styles.Link}> Search</Link> */}
                    <Link href='/login' className={styles.Link}>Login</Link>
                    <Link href='/signup' className={styles.Link}>Sign Up</Link>
                    {/* <Link href='/' className={styles.Link}>Home</Link>
                    <Link href='/books' className={styles.Link}>Your List</Link> */}
                    {/* <Link href='/note' className={styles.Link}>Your Notes</Link> */}
                    <Link href='/create' className={styles.Link}>Create Note</Link>
                    </>
                )}
            </div>
        </header>
    )
}