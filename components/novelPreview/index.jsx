import styles from './style.module.css'
import Image from 'next/image'

export default function NovelPreview({
    title,
    authors,
    image,
}) {
    return (
        <div>
            <Image
            src={image ? image : "/placeholder.jpg"}
            width={102}
            height={182}
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