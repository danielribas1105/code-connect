import Image from "next/image"

import styles from "./cardPost.module.css"
import { Avatar } from "../Avatar"
import Link from "next/link"

export const CardPost = ({ post }) => {
    return (
        <Link href={`/posts/${post.slug}`}>
            <article className={styles.article}>
                <header>
                    <figure className={styles.figure}>
                        <Image 
                            src={post.cover} 
                            width={438} 
                            height={133} 
                            alt={`Capa do post de título: ${post.title}`}
                        />
                    </figure>
                </header>
                <section className={styles.section}>
                    <h2>{post.title}</h2>
                    <p className={styles.p}>{post.body}</p>
                </section>
                <footer className={styles.footer}>
                    <Avatar imageSrc={post.author.avatar} name={post.author.username}/>
                </footer>
            </article>
        </Link>
    )
}