export default function NotePreview({title, author, dateFinished, noteBody}){
    return (
        <div>
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{dateFinished}</p>
            <p>{noteBody}</p>
        </div>
    )
}