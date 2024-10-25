import styles from "./avatar.module.css"
import Image from "next/image"

export const Avatar = ({ name, imageSrc }) => {
   return (
      <ul className={styles.ul}>
         <li>
            <Image src={imageSrc} width={32} height={32} alt={`Avatar do(a) ${name}`} />
         </li>
         <li>
            @{name}
         </li>
      </ul>
   )
}