import React, { useEffect, useState } from 'react';
import styles from '../styles/ordersummary.module.css';
import DropdownImg from '../assets/dropdown_img.png';
import DonutChart from '../components/ordersummarydonutchart.jsx';
// import axios from 'axios';



function ordersummary() {

    const [summary, setSummary] = useState({
        dineInOrdersCount: 0,
        takeAwayOrdersCount: 0
    });

    useEffect(() => {
        const fetchOrderSummary = async () => {
            try {
                const response = await fetch('/api/orders/summary'); // adjust path as per your proxy setup
                const data = await response.json();
                setSummary({
                    dineInOrdersCount: data.dineInOrdersCount,
                    takeAwayOrdersCount: data.takeAwayOrdersCount
                });
            } catch (error) {
                console.error('Error fetching order summary:', error);
            }
        };

        fetchOrderSummary();
    }, []);

    const servedTotal = summary.dineInOrdersCount + summary.takeAwayOrdersCount;;

    return (
        <div className={styles.ordersummary_container}>
            <div className={styles.ordersummary_topcontainer}>
                <div className={styles.ordersummary_headersection}>
                    <h3>Order Summary</h3>
                    <p>hijokplrngntopgtgkoikokyhikoyphokphnoy</p>
                </div>
                <div className={styles.ordersummary_filtercontainer}>
                    <div className={styles.ordersummary_filterbtn}>
                        <p>Daily</p>
                        <div className={styles.ordersummary_filterdropdown}>
                            <img src={DropdownImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.ordersummary_middlecontainer}>
                <div className={styles.ordersummary_served}>
                    <h3>{servedTotal}</h3>
                    <p>Served</p>
                </div>
                <div className={styles.ordersummary_dinein}>
                    <h3>{summary.dineInOrdersCount}</h3>
                    <p>Dine In</p>
                </div>
                <div className={styles.ordersummary_takeaway}>
                    <h3>{summary.takeAwayOrdersCount}</h3>
                    <p>Take Away</p>
                </div>
            </div>
            <div className={styles.ordersummary_bottomcontainer}>
                <DonutChart dineIn={summary.dineInOrdersCount} takeAway={summary.takeAwayOrdersCount} />
            </div>
        </div>
    )
}

export default ordersummary
