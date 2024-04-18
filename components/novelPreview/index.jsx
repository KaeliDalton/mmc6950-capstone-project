import styles from './style.module.css'
export default function NovelPreview({
    title,
    authors,
    image,
}) {
    return (
        <div>
            <img
            src={image ? image : "https://images.unsplash.com/photo-1543497415-75c0a27177c0?q=80&w=2454&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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