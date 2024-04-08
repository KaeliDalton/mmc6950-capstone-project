import NotePreview from "../notePreview";
import Link from 'next/link'
import styles from './style.module.css'

export default function NoteList({notes}){
    return(
        <div className={styles.list}>
            {notes.map(note => <Link key={note.id} href={`/note/${note.id}`}>
                <NotePreview {...note} />
            </Link>)}
        </div>
    )
}