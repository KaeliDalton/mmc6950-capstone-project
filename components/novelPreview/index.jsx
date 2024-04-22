import styles from './style.module.css'
import Image from 'next/image'

export default function NovelPreview({
    title,
    authors,
    image,
}) {
    return (
        <div className={styles.list}>
            <img
            src={image ? image : "/placeholder.jpg"}
            width={256}
            height={455}
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