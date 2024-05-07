import styles from "./loader.module.css";

export function Loader() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner1}></div>
    </div>
  );
}
