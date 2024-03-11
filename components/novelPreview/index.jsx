export default function NovelPreview({
    title,
    authors,
    image,
}) {
    return (
        <div>
            <img
            src={image ? image : "PLACEHOLDER IMAGE LINK"}
            alt={title}
            />
            <div>
                <p>{title}</p>
                {authors && <p>By: {authors.join(", ").replace(/,([^,]*)$/, ', and $1')}</p>}
            </div>
        </div>
    )
}