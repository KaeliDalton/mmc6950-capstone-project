import Link from "next/link"
import useLogout from '../../hooks/useLogout'
import styles from './style.module.css'

export default function Header(props){
    const logout = useLogout()
    return (
        <header>
            {/* <img src='/myreads.png'>
                <Link href='/'>MyReads</Link>
            </img> */}
            <div>
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