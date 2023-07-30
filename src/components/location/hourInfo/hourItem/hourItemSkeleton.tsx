import React from 'react'
import styles from "./hourItem.module.scss"

const HourItemSkeleton = () => {
  return (
    <section className={`${styles.dayTime} ${styles.skeleton}`} />
  )
}

export default HourItemSkeleton