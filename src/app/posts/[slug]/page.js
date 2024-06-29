import { remark } from 'remark';
import html from 'remark-html';
import logger from "@/logger";
import styles from "./post.module.css";

import search, { SearchBar } from "@/components/SearchBar";

async function getPostBySlug(slug) {
    const response = await fetch(`http://localhost:3042/posts?slug=${slug}`)
    if (!response.ok) {
        logger.error("Ops! Algo errado ocorreu!")
        return {}
    }
    logger.info("Posts obtidos com sucesso!")
    const data = await response.json()
    if (data.length == 0) {
        return {}
    }

    const post = data[0]

    const processedContent = await remark()
        .use(html)
        .process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml

    return post
}

const PagePost = async ({ params }) => {
    const post = await getPostBySlug(params.slug);
    return (
        <>
            <main>
                <SearchBar/>
            </main>
            <h1 style={{ color: "white" }}>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
        </>
    )
}

export default PagePost