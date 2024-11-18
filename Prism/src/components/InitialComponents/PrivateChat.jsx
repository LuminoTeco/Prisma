import React from 'react'
import styles from "./PrivateChat.module.css"


const PrivateChat = () => {
  return (
    <div className={styles.ContainerChat}>
        <aside className={styles.ContainerChatContacts}>

        </aside>
        <main className={styles.ContainerChatMessages}>

        </main>
    </div>
  )
}

export default PrivateChat