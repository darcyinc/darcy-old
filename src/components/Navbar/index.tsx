import { Noto_Sans } from "@next/font/google";

import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMenuBook, MdShowChart } from "react-icons/md";

import styles from "./index.module.scss";

const notoSans = Noto_Sans({ weight: ["500"], subsets: ["latin"] });

export interface NavbarProps {
  active: "feed" | "trending" | "profile";
}

export default function Navbar({ active }: NavbarProps) {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.main}>
          <div className={styles.logo}>
            <img src="/favicon.png" alt="Logo" draggable="false" />
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

      {/* only visible on mobile */}
      <footer className={styles.mobileContainer}>
        <div className={`${styles.feed} ${active === "feed" && styles.active}`}>
          <MdOutlineMenuBook />
          <p>Feed</p>
        </div>
        <div
          className={`${styles.trending} ${
            active === "trending" && styles.active
          }`}
        >
          <MdShowChart />
          <p>Em alta</p>
        </div>

        <div
          className={`${styles.profile} ${
            active === "profile" && styles.active
          }`}
        >
          <CgProfile />
          <p>Perfil</p>
        </div>
      </footer>
    </>
  );
}
