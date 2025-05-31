import React, { useEffect, useState } from 'react';
import styles from '../styles/ordercard.module.css';
import CutleryImg from '../assets/cutlery_img.png';
import ProcessingImg from '../assets/processing_img.png';
import ProcessingImg2 from '../assets/processing_img2.png';
import ProcessingImg3 from '../assets/processing_img3.png';
import OrderDoneImg from '../assets/orderdone_img.png';
import OrderDoneGreyImg from '../assets/orderdone_greyimg.png';
import OrderDoneOrangeImg from '../assets/orderdone_orangeimg.png';

function ordercard({ order, index }) {

    const itemCount = order.selectedProducts?.length || 0;

    const totalPrepTime = order.selectedProducts?.reduce(
        (acc, item) => acc + item.preparationTime,
        0
    );

    const minutesPassed = Math.floor((Date.now() - new Date(order.createdAt)) / 60000);
    const initialRemainingTime = Math.max(totalPrepTime - minutesPassed, 0);
    const [remainingTime, setRemainingTime] = useState(initialRemainingTime);


    useEffect(() => {
        if (order.status === 'done') return;

        const interval = setInterval(() => {
            setRemainingTime(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 60000); 

        return () => clearInterval(interval);
    }, [order.status]);

    const getStatusText = () => {
        if (order.status === 'done' || remainingTime === 0) {
            return order.dineOption === 'Dine In' ? 'Served' : 'Picked up';
        }
        return `Ongoing: ${remainingTime} Min`;
    };

    return (
        <div className={styles.ordercard_container}>
        
            <div className={`${styles.ordercard} ${order.status === 'done' ? styles.ordercard2 : ''} ${order.dineOption === 'Take Away' ? styles.ordercard3 : ''}`}>
                <div className={styles.ordercard_topcontainer}>
                    <div className={styles.ordercard_topleftcontainer}>
                        <div className={styles.ordernumber_container}>
                            <img src={CutleryImg} alt="cutlery" />
                            <h2>#{(index + 1).toString().padStart(2, '0')}</h2>
                        </div>
                        <p>{order.tableNumber}</p>
                        <p>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <h3>{itemCount} Item{itemCount > 1 ? 's' : ''}</h3>
                    </div>
                    <div className={ order.dineOption === 'Dine In' ? (order.status === 'done' ? styles.ordercard_toprightcontainer2 : styles.ordercard_toprightcontainer): styles.ordercard_toprightcontainer3}>
                        <h5>{order.dineOption}</h5>
                        <p>{getStatusText()}</p>
                    </div>
                    
                </div>
                <div className={styles.ordercard_middlecontainer}>
                    
                    {order.selectedProducts?.map((item, idx) => (
                        <div key={idx} className={styles.order_item}>
                            <p><span>{item.quantity} x</span> {item.name}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.ordercard_bottomcontainer}>
                    {order.status === 'done' || remainingTime === 0 ? (
                        <div
                            className={`${styles.orderdone_btn} ${
                                order.status === 'done'
                                    ? styles.orderdone_btn_done
                                    : order.dineOption === 'Take Away'
                                        ? styles.orderdone_btn_takeaway
                                        : styles.orderdone_btn_default
                            }`}
                        >
                            <p>Order Done</p>
                            <img
                                src={
                                    order.status === 'done'
                                        ? OrderDoneImg 
                                        : order.dineOption === 'Take Away'
                                            ? OrderDoneGreyImg
                                            : OrderDoneOrangeImg
                                }
                                alt="order done"
                            />
                        </div>
                    ) : order.dineOption === 'Take Away' ? (
                        <div className={styles.orderdone_greybtn}>
                            <p>Order Done</p>
                            <img src={OrderDoneGreyImg} alt="order done grey" />
                        </div>
                    ) : (
                        <div className={styles.Processing_btn}>
                            <p>Processing</p>
                            <img src={ order.status === 'done' ? ProcessingImg2  : order.dineOption === 'Take Away' ? ProcessingImg3  : ProcessingImg   } alt="processing" />
                        </div>
                    )}

                </div>
            </div>

        </div>
    )
}

export default ordercard
