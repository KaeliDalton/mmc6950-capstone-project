import Link from "next/link"
import useLogout from '../../hooks/useLogout'
import styles from './style.module.css'
import Image from "next/image"

export default function Header(props){
    const logout = useLogout()
    return (
        <header className={styles.container}>
            {/* <img src='/myreads.png'>
                <Link href='/'>MyReads</Link>
            </img> */}
             <Image src="/myreads.png" alt="MyReads Logo" width={72} height={16} className={styles.img}/>
            <div className={styles.nav}>
                {props.isLoggedIn ? (
                    <>
                    <Link href='/books'>Your List</Link>
                    <Link href='/note'>Your Notes</Link>
                    <Link href='/search'>Search</Link>
                    <a href="#" onClick={logout}>
                        Logout
                    </a>
                    </>
                ) :(
                    <>
                    <Link href='/search'> Search</Link>
                    <Link href='/login'>Login</Link>
                    <Link href='/signup'>Sign Up</Link>
                    <Link href='/'>Home</Link>
                    <Link href='/books'>Your List</Link>
                    <Link href='/note'>Your Notes</Link>
                    <Link href='/create'>Create Note</Link>
                    </>
                )}
            </div>
        </header>
    )
}