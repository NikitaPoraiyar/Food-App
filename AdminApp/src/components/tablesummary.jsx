import { useEffect, useState, useCallback } from 'react';
import styles from '../styles/tablesummary.module.css';

function Tablesummary() {

    const [tables, setTables] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.BACKEND_URL}/api/tables`)
            .then(res => res.json())
            .then(data => {
                console.log("Tables:", data);
                setTables(data);
            })
            .catch(err => console.error("Failed to fetch tables:", err));

        fetchOrders();
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);

        

    }, []);

    const fetchOrders = () => {
        fetch(`${import.meta.env.BACKEND_URL}/api/orders`)
            .then(res => res.json())
            .then(data => {
                console.log("Orders fetched:", data); 
                const dineInProcessing = data.filter(order =>
                    order.dineOption === 'Dine In' && order.status === 'processing'
                );
                console.log("Processing Table Numbers:", dineInProcessing.map(o => o.tableNumber)); // ✅ Important!
                setOrders(data);
            })
            .catch(err => console.error("Failed to fetch orders:", err));
    };

    const rows = [];
    for (let i = 0; i < tables.length; i += 7) {
        rows.push(tables.slice(i, i + 7));
    }

    const reservedStatuses = ['processing', 'confirmed'];
    const reservedTableNumbers = orders
        .filter(order => order.dineOption === 'Dine In' && reservedStatuses.includes(order.status))
        .map(order => String(order.tableNumber));



    return (
        <div className={styles.tablesummary_container}>
            <div className={styles.tablesummary_topcontainer}>
                <h3>Tables</h3>
                <div className={styles.tablesummary_colordisplay}>
                    <div className={styles.reservedtable_colorcontainer}>
                        <div className={styles.reservedcolor_circle}></div>
                            <p>Reserved</p>
                    </div>
                    <div className={styles.availabletable_colorcontainer}>
                        <div className={styles.availablecolor_circle}></div>
                            <p>Available</p>
                    </div>
                </div>
            </div>
            <div className={styles.tablesummary_bottomcontainer}>
                {rows.map((row, i) => (
                    <div key={i} className={styles.tabledisplay_rowcontainer}>
                        {row.map((table, index) => {
                            const normalizedTableName = String(table.name).trim().toLowerCase();
                            const isReserved = reservedTableNumbers
                                .map(num => String(num).trim().toLowerCase())
                                .includes(normalizedTableName);


                            console.log("Checking table:", table.name, "=> Reserved?", isReserved);

                            return (
                                <div key={index} className={styles.tabledisplay_container}>
                                    <h5>Table</h5>
                                    <h3>{table.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                ))}

                
            </div>
        </div>
    )
}

export default Tablesummary
