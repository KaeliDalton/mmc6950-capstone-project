import NotePreview from "../notePreview";
import Link from 'next/link'

export default function NoteList({notes}){
    return(
        <div>
            {notes.map(note => <Link key={note.id} href={`/note/${note.id}`}>
                <NotePreview {...note} />
            </Link>)}
        </div>
    )
}
//based off book search list but might need to adjust based on how want note list