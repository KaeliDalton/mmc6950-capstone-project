import Link from 'next/link'
import NovelPreview from '../novelPreview'
import styles from './style.module.css'

export default function NovelList({books}){
return(
    <div className={styles.list}>
        {books.map(book => <Link key={book.googleId} href={`/book/${book.googleId}`}>
            <NovelPreview {...book} />
        </Link>)}
    </div>
)
}