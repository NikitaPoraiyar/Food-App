import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/swipetoorder.module.css';
import ArrowImg from '../assets/arrow_img.png';

function SwipeToOrder({ onConfirm }) {

    const [isDragging, setIsDragging] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [arrowX, setArrowX] = useState(0);

    const mainRef = useRef(null);
    const arrowRef = useRef(null);
    const startX = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || confirmed) return;
            const containerWidth = mainRef.current.offsetWidth;
            const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            let delta = currentX - startX.current;

            delta = Math.max(0, Math.min(delta, containerWidth - 60)); 
            setArrowX(delta);

            if (delta >= containerWidth - 70) {
                setConfirmed(true);
                setIsDragging(false);
                onConfirm && onConfirm();
            }
        };

        const stopDrag = () => setIsDragging(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', stopDrag);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', stopDrag);
        };
    }, [isDragging, confirmed, onConfirm]);

    const startDrag = (e) => {
        if (confirmed) return;
        setIsDragging(true);
        startX.current = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    };

    return (
        <div className={styles.swipetoorder_container}>
            <div className={`${styles.swipetoorder_maincontainer} ${confirmed ? styles.confirmed : ''}`} ref={mainRef}>
                <div className={`${styles.swipetoorder_textcontainer} ${confirmed ? styles.confirmedtext : ''}`}>
                    {confirmed ? 'Order Confirmed' : 'Swipe To Order'}
                </div>
                <div className={styles.swipetoorder_arrowcontainer} ref={arrowRef} onMouseDown={startDrag} onTouchStart={startDrag} style={{ transform: `translateX(${arrowX}px)`, transition: confirmed ? 'transform 0.3s ease' : 'none' }} >
                    <img src={ArrowImg} alt="arrowimg" />
                </div>
            </div>
        </div>
    )
}

export default SwipeToOrder
