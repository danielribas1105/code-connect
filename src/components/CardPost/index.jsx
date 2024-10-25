import Image from "next/image"
import styles from "./cardPost.module.css"
import { Avatar } from "../Avatar"
import Link from "next/link"

export const CardPost = ({ post, highlight }) => {
   return (
      <Link href={`/posts/${post.slug}`}>
         <article className={styles.article} style={{ width: highlight ? 993 : 486 }}>
            <header className={styles.header}>
               <figure style={{ height: highlight ? 300 : 133 }}>
                  <Image
                     src={post.cover}
                     fill
                     alt={`Capa do post de título: ${post.title}`}
                     style={{ 'border-radius': '8px' }}
                  />
               </figure>
            </header>
            <section className={styles.section}>
               <h3>{post.title}</h3>
               <p className={styles.p}>{post.body}</p>
            </section>
            <footer className={styles.footer}>
               <Avatar imageSrc={post.author.avatar} name={post.author.userName} />
            </footer>
         </article>
      </Link>
   )
}