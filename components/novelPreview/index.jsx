import styles from './style.module.css'
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
            className={styles.image}
            />
            <div className={styles.block}>
                <p>{title}</p>
                {authors && <p>By: {authors.join(", ").replace(/,([^,]*)$/, ', and $1')}</p>}
            </div>
        </div>
    )
}