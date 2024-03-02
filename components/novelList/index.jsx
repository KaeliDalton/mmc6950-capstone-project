import Link from 'next/link'
import NovelPreview from '../novelPreview'

export default function NovelList({books}){
return(
    <div>
        {books.map(book => <Link key={book.googleId} href={`/book/${book.googleId}`}>
            <NovelPreview {...book} />
        </Link>)}
    </div>
)
}