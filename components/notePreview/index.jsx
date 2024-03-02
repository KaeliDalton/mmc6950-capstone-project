export default function NotePreview({title, author, dateFinished}){
    return (
        <div>
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{dateFinished}</p>
        </div>
    )
}