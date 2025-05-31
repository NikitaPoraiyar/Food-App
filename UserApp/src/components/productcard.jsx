import { useState } from 'react';
import React from 'react';
import styles from '../styles/productcard.module.css';

function productcard({ name, price, image, count, increment, decrement }) {
    return (
        <div className={styles.productcard_container}>
            <div className={styles.productcard_topcontainer}>
                <img src={image} alt={name} className={styles.productcard_topcontainerimg} />
                <div className={styles.overlay_img}></div>
            </div>
            <div className={styles.productcard_bottomcontainer}>
                <div className={styles.productcard_namepricecontainer}>
                    <h4>{name}</h4>
                    <p>₹{price}</p>
                </div>

                {count === 0 ? (
                    <button onClick={increment} className={styles.addButton}>+</button>
                ) : (
                    <div className={styles.counter}>
                        <button onClick={decrement} className={styles.counterBtn}>−</button>
                        <span className={styles.count}>{count}</span>
                        <button onClick={increment} className={styles.counterBtn}>+</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default productcard
