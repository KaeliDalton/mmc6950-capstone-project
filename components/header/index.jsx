import Link from "next/link"
import useLogout from '../../hooks/useLogout'

export default function Header(props){
    const logout = useLogout()
    return (
        <header>
            {/* look into making this the logo and linking to home via logo */}
            <p>
                <Link href='/'>MyReads</Link>
            </p>
            <div>
                {props.isLoggedIn ? (
                    <>
                    <Link href='/books'>Your List</Link>
                    <Link href='/notes'>Your Notes</Link>
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
                    </>
                )}
            </div>
        </header>
    )
}