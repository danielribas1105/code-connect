import { Button } from "../Button"
import styles from "./searchBar.module.css"

export const SearchBar = () => {
   return (
      <form className={styles.form} action='/'>
         <input
            name='q'
            className={styles.input}
            placeholder='Digite o que você procura'
         />
         <Button>
            Buscar
         </Button>
      </form>
   )
}

/* json-server posts.json -p 3042 */