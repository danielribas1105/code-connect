import Link from "next/link"
import { CardPost } from "@/components/CardPost"
import styles from "./page.module.css"
import logger from "@/logger"
import db from "../../prisma/db"

async function getAllPosts(page, searchTerm) {
   
   try {

      const where = {}

      console.log(searchTerm);
      if(searchTerm) {
         where.title = {
            contains: searchTerm,
            mode: 'insensitive'
         }
      }

      const perPage = 4
      const skip = (page - 1) * perPage
      const totalItens = await db.post.count({ where })
      const totaPages = Math.ceil(totalItens / perPage)
      const prev = page > 1 ? page - 1 : null
      const next = page < totaPages ? page + 1 : null 
      const posts = await db.post.findMany({
         take: perPage,
         skip,
         where,
         orderBy: { createdAt: 'desc' },
         include: {
            author: true
         }
      })
      return { data: posts, prev: prev, next: next }

   } catch (error) {
      logger.error('Falha ao obter posts', { error })
      return { data: [], prev: null, next: null }
   }
}

export default async function Home({ searchParams }) {
   const currentPage = parseInt(searchParams?.page || 1)
   const searchTerm = searchParams?.q
   const { data: posts, prev, next } = await getAllPosts(currentPage, searchTerm);
   return (
      <>
         <main className="grid">
            {posts.map(post => <CardPost key={post.id} post={post} />)}
         </main>
         <section className={styles.section}>
            {prev && 
               <Link href={{ pathname: '/', query: { page: prev, q: searchTerm }}}>
                  Página anterior
               </Link>
            }
            {next && 
               <Link href={{ pathname: '/', query: { page: next, q: searchTerm }}}>
                  Próxima página
               </Link>
            }
         </section>
      </>
   )
}
