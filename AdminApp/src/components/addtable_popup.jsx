import React, { useState } from 'react'

import styles from '../styles/addtable_popup.module.css';

function addtable_popup({ setTables, setShowPopup, tables }) {

    const [tableName, setTableName] = useState("");
    const [chairCount, setChairCount] = useState('03');

    const handleCreate = async () => {
        const newTable = {
            name: tableName.trim() || String(tables.length + 1).padStart(2, '0'),
            chairs: chairCount
        };

        try {
            const response = await fetch('http://localhost:3000/api/tables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTable)
            });

            const savedTable = await response.json();
            setTables([...tables, savedTable]);
            setShowPopup(false);
        } catch (err) {
            console.error("Failed to save table:", err);
        }
    };


    return (
        <div className={styles.addtable_popupcontainer}>
            <div className={styles.addtablemain_popupcontainer}>
                <label className={styles.tablename_label}>Table name (optional)</label>
                <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} className={styles.tablename_input} />

                <label className={styles.chair_label}>Chair</label>
                <select value={chairCount} onChange={(e) => setChairCount(e.target.value)} className={styles.select_chairs}>
                    {[...Array(10)].map((_, i) => {
                        const val = String(i + 1).padStart(2, '0');
                        return <option key={val} value={val}>{val}</option>;
                    })}
                </select>

                <button className={styles.create_button} onClick={handleCreate} >Create</button>
            </div>
        </div>
    )
}

export default addtable_popup
