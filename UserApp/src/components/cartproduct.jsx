import React from 'react'
import styles from '../styles/cartproduct.module.css';
import Cancel from '../assets/cancelbtn.png';


function cartproduct({ name, price, image, count, increment, decrement, onRemove }) {
    return (
        <div className={styles.cartproduct_container}>
            <div className={styles.productimg_container}>
                <img src={image} alt="productimg" />
            </div>
            <div className={styles.productinfo_container}>
                <div className={styles.productinfo_topcontainer}>
                    <div className={styles.productdetails_container}>
                        <h4>{name}</h4>
                        <p>₹{price}</p>
                    </div>
                    <div className={styles.cancelbtn_container}>
                        <img src={Cancel} alt="Cancel" onClick={onRemove} />
                    </div>
                </div>
                <div className={styles.productinfo_bottomcontainer}>
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
        </div>
    )
}

export default cartproduct
