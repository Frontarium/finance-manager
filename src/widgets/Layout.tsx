import type { PropsWithChildren } from "react";
import styles from "./Layout.module.scss";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>Менеджер финансов</header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
