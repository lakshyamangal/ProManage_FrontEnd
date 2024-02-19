import React from 'react'
import styles from './Navpanel.module.css'
function Navpanel() {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <img src="#" alt="logo" />
        <div className="logo-title">Pro Manage</div>
      </div>
      <div className={styles.logo}></div>
      <div className={styles.logo}></div>
      <div className={styles.logo}></div>
    </div>
  )
}

export default Navpanel
