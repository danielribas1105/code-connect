import styles from "./searchBar.module.css";

export const SearchBar = () => {
    return (
        <div className={styles.div}>
            <input type="text" className={styles.input} placeholder="Digite o que você procura"/>
            <button className={styles.button}>Buscar</button>
        </div>
    )
}

/* json-server posts.json -p 3042 */