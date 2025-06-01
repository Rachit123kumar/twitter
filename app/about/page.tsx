import React from 'react'
import styles from "./about.module.css"

export default function Page() {
  return (
    <div className='text-white'>

      <section className={styles.section}>
        <div className={`${styles.uCenterText}` }>

          <h2 className={`${styles.headingSecondary}  ${styles.marginBottom8}`}>Exiciting tours for Adventorous People. </h2>

          <div className={styles.row}>
            <div className={styles.oneOftwo}>
              
    
              <h3 className={styles.headingTertiary }>
                You are going to fall in love with nature
              </h3>
              <p className={styles.paragraphh}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi in at quidem quis quisquam recusandae molestiae incidunt animi deserunt impedit.
              </p>
                <h3 className={styles.headingTertiary}>
                  You are going to fall in love with nature
                </h3>
                <p className={styles.paragraphh}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi in at quidem quis quisquam recusandae molestiae incidunt animi deserunt impedit.
                </p>
              <button className={styles.button}>Learn more &rarr;</button>
              
              </div>
            <div className={styles.oneOftwo}>IMage Composition</div>
          </div>
        </div>

      </section>


    </div>
  )
}
