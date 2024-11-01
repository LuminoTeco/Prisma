import React from 'react'
import styles from "./Feed.module.css"
import ChatFeed from './FeedComponents/ChatFeed'

const Feed = () => {
  return (
    <div className={styles.containerFeed}>
        <div className={styles.FeedMessagesContainer}>
            <ChatFeed />
        </div>
        <div className={styles.AchivementContainer}>

        </div>
    </div>
  )
}

export default Feed