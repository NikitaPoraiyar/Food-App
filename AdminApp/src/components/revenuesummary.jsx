import React, { useState } from 'react';
import styles from '../styles/revenuesummary.module.css';
import DropdownImg from '../assets/dropdown_img.png';
import LineChart from '../components/linechart.jsx';


function revenuesummary() {
    const [showRevenueDropdown, setShowRevenueDropdown] = useState(false);

    return (
        <div className={styles.revenuesummary_container}>
            <div className={styles.revenuesummary_topcontainer}>
                <div className={styles.revenuesummary_headersection}>
                    <h3>Revenue</h3>
                    <p>hijokplrngntopgtgkoikokyhikoyphokphnoy</p>
                </div>
                <div className={styles.revenuesummary_filtercontainer}>
                    <div className={styles.revenuesummary_filterbtn}>
                        <p>Daily</p>
                        <div className={styles.revenuesummary_filterdropdown}>
                            <img src={DropdownImg} alt="" onClick={() => setShowRevenueDropdown(!showRevenueDropdown)} />
                        </div>
                    </div>
                    {showRevenueDropdown && (
                        <div className={styles.revenuesummary_dropdown}>
                            <div className={styles.dailyrevenue_option}>Daily</div>
                            <div className={styles.weeklyrevenue_option}>Weekly</div>
                            <div className={styles.monthlyrevenue_option}>Monthly</div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.revenuesummary_middlecontainer}>
                <LineChart />
                
                
            </div>
        </div>
    )
}

export default revenuesummary
