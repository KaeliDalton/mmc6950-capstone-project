import Link from "next/link"
import useLogout from '../../hooks/useLogout'
import styles from './style.module.css'
import Image from "next/image"
import { useState } from "react"

export default function Header(props){
    const logout = useLogout()
    const [hamburgerOpen, setHamburgerOpen] = useState(false)

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }
    return (
        <header className={styles.container}>
            {/* <img src='/myreads.png'>
                <Link href='/'>MyReads</Link>
            </img> */}
             <Image src="/myreads.png" alt="MyReads Logo" width={105} height={40} className={styles.img}/>
            <div className={styles.nav}>
                {props.isLoggedIn ? (
                    <>
                    <ul className={styles.ul}>
                   <li className={styles.li}>
                    <Link href='/books' className={styles.Link}>Your List</Link>
                    </li> 
                    <li className={styles.li}>
                    <Link href='/note' className={styles.Link}>Your Notes</Link>
                    </li>
                    <li className={styles.li}>
                    <Link href='/search' className={styles.Link}>Search</Link>
                    </li>
                    <li className={styles.li}>
                    <a href="#" onClick={logout} className={styles.Link}>
                        Logout
                    </a>
                    </li>

                    </ul>
                    <div className={styles.hamburger} onClick={toggleHamburger}>
                        <Hamburger />
                    </div>
                    </>
                ) :(
                    <>
                     <ul className={styles.ul}>
                         <li className={styles.li}>
                            <Link href='/search' className={styles.Link}> Search</Link>
                        </li>
                        <li className={styles.li}>
                    <Link href='/login' className={styles.Link}>Login</Link>
                    </li>
                    <li className={styles.li}>
                    <Link href='/signup' className={styles.Link}>Sign Up</Link>
                    </li>
                    <li className={styles.li}>
                    <Link href='/' className={styles.Link}>Home</Link>
                    </li>
                    <li className={styles.li}>
                    <Link href='/books' className={styles.Link}>Your List</Link>
                    </li>
                    <li className={styles.li}>
                    <Link href='/note' className={styles.Link}>Your Notes</Link>
                    </li>
                    <li className={styles.li}>
                    <Link href='/create' className={styles.Link}>Create Note</Link>
                    </li>
                    </ul>
                    <div className={styles.hamburger} onClick={toggleHamburger}>
                        <Hamburger />
                    </div>
                    </>
                )}
            </div>
            <style jsx>{`
            .ul {
                display: ${hamburgerOpen ? 'inline' : 'none'};
            }
            `}</style>
        </header>
    )
}

export function Hamburger(){
    return(
        <>
        <div className={styles.hamburger}>
            <div className={styles.burger} />
            <div className={styles.burger} />
            <div className={styles.burger} />
        </div>
        </>
    )
}