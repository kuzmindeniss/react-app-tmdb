import Header from "components/Header/Header";
import styles from "./Layout.module.scss";

export const LayoutHeader = (props: any)  => {
    return (
      <>
        <Header/>
        <main className={styles.container}>
            {/* <div className={styles.contentContainer}> */}
            { props.children }
            {/* </div> */}
        </main>
        <div className={styles.mainBg}></div>
      </>
    )
}

export const LayoutContent = (props: any) => {
    return (
        <div className={styles.contentContainer}>
            {props.children}
        </div>
    )
}

export const LayoutError = (props: any) => {
    return (
        <div className={styles.contentContainer}>
            <div className={styles.errorContainer}>
                {props.children}
            </div>
        </div>
    )
}