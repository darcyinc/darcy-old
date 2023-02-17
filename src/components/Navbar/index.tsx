"use client";

import { Noto_Sans } from "@next/font/google";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMenuBook, MdShowChart } from "react-icons/md";
import { AccountContext } from "@/context/AccountProvider";
import styles from "./index.module.scss";

const notoSans = Noto_Sans({ weight: ["500"], subsets: ["latin"] });

export interface NavbarProps {
  active: "feed" | "profile" | "trending";
}

export default function Navbar({ active }: NavbarProps) {
  const account = useContext(AccountContext);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.main}>
          <div className={styles.logo}>
            <img alt="Logo" draggable="false" src="/favicon.png" />
          </div>

          <div className={styles.search}>
            <AiOutlineSearch />
            <input
              autoComplete="off"
              id="search"
              placeholder="Pesquisar"
              style={{
                ...notoSans.style,
              }}
              type="text"
            />
          </div>
        </div>

        <div className={styles.menu}>
          <img
            alt="Dog"
            decoding="async"
            height="100"
            loading="lazy"
            src={
              account.data.user?.avatar ??
              process.env.NEXT_PUBLIC_DEFAULT_AVATAR_URL
            }
            width="100"
          />
        </div>
      </header>

      {/* only visible on mobile */}
      <footer className={styles.mobileContainer}>
        <div className={active === "feed" ? styles.active : undefined}>
          <MdOutlineMenuBook />
          <p>Feed</p>
        </div>
        <div className={active === "trending" ? styles.active : undefined}>
          <MdShowChart />
          <p>Em alta</p>
        </div>

        <div className={active === "profile" ? styles.active : undefined}>
          <CgProfile />
          <p>Perfil</p>
        </div>
      </footer>
    </>
  );
}
