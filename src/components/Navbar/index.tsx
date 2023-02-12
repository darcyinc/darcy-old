import { Noto_Sans } from "@next/font/google";

import { AiOutlineSearch } from "react-icons/ai";

import styles from "./index.module.scss";

const notoSans = Noto_Sans({ weight: ["500"], subsets: ["latin"] });

export default function Navbar() {
  return (
    <header className={styles.container}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img
            src="/favicon.png"
            alt="Logo"
            draggable="false"
          />
        </div>

        <div className={styles.search}>
          <AiOutlineSearch />
          <input
            type="text"
            id="search"
            placeholder="Pesquisar"
            autoComplete="off"
            style={{
              ...notoSans.style,
            }}
          />
        </div>
      </div>

      <div className={styles.menu}>
        <img src="https://source.unsplash.com/100x100/?dog" alt="Dog" />
      </div>
    </header>
  );
}
