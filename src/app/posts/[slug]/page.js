import { remark } from 'remark'
import html from 'remark-html'
import logger from "@/logger"
import styles from "./post.module.css"
import { CardPost } from '@/components/CardPost'
import db from '../../../../prisma/db'
import { redirect } from 'next/navigation'

async function getPostBySlug(slug) {

   /* const response = await fetch(`http://localhost:3042/posts?slug=${slug}`)
   if (!response.ok) {
      logger.error("Ops! Algo errado ocorreu!")
      return {}
   }
   logger.info("Posts obtidos com sucesso!")
   const data = await response.json()
   if (data.length == 0) {
      return {}
   }

   const post = data[0] */

   try {

      const post = await db.post.findFirst({
         where: {
            slug
         },
         include: {
            author: true
         }
      })

      if(!post) {
         throw new Error(`O post ${slug} não foi encontrado.`)
      }

      const processedContent = await remark()
         .use(html)
         .process(post.markdown);
      const contentHtml = processedContent.toString();

      post.markdown = contentHtml

      return post

   } catch (error) {
      logger.error('Falha ao obter post selecionado', { slug, error })
   }
   redirect('/not-found')
}

const PagePost = async ({ params }) => {
   const post = await getPostBySlug(params.slug);
   return (
      <main className={styles.main}>
         <CardPost post={post} highlight />
         <section className={styles.section}>
            <h2>Código</h2>
            <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
         </section>
      </main>
   )
}

export default PagePost