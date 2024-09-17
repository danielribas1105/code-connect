import Link from "next/link";

import { CardPost } from "@/components/CardPost";
import styles from "./page.module.css";
import logger from "@/logger";
import db from "../../prisma/db";

/* const post = {
  "id": 1,
  "cover": "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png",
  "title": "Introdução ao React",
  "slug": "introducao-ao-react",
  "body": "Neste post, vamos explorar os conceitos básicos do React, uma biblioteca JavaScript para construir interfaces de usuário. Vamos cobrir componentes, JSX e estados.",
  "markdown": "```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```",
  "author": {
      "id": 101,
      "name": "Ana Beatriz",
      "username": "anabeatriz_dev",
      "avatar": "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png"
  }
} */

async function getAllPosts(page) {
  /* const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`)

  if(!response.ok){
    logger.error("Ops! Algo errado ocorreu!")
    return []
  }
  logger.info("Posts obtidos com sucesso!")
  return response.json() */
  try {

    const posts = await db.post.findMany()
    return { data: posts, prev: null, next: null }

  } catch (error) {
    logger.error('Falha ao obter posts', { error })
    return { data: [], prev: null, next: null }
  }
}

export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1
  const { data: posts, prev, next } = await getAllPosts(currentPage);
  return (
    <>
      <main className="grid">
        {posts.map(post => <CardPost key={post.id} post={post}/>)}
      </main>
      <section className={styles.section}>
        {prev && <Link href={`/?page=${prev}`}>Página anterior</Link>}
        {next && <Link href={`/?page=${next}`}>Próxima página</Link>}
      </section>
    </>
  )
}
