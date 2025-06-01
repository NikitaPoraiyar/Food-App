import React, { useEffect, useState } from 'react';
import styles from '../styles/cheftablesummary.module.css';

function cheftablesummary() {

    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        fetch('https://food-app-fcb5.onrender.com/api/chefs')
            .then(res => res.json())
            .then(data => setChefs(data))
            .catch(err => console.error("Failed to fetch chefs:", err));
    }, []);

    return (
        <div className={styles.cheftablesummary_container}>
            <div className={styles.cheftable_header}>
                <div className={styles.chefname_headerlabel}>Chef name</div>
                <div className={styles.ordertaken_headerlabel}>Order Taken</div>
            </div>
            <div className={styles.cheftablesummary_maintable}>
                {chefs.map((chef, index) => (
                    <div key={index} className={styles.cheftable_row}>
                        <div className={styles.chefname_label}>{chef.name}</div>
                        <div className={styles.ordertaken_label}>{chef.orderTaken}</div>
                    </div>
                ))}
            </div>
        </div>

        
    )
}

export default cheftablesummary
