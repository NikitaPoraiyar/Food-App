import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from '../styles/donutchart.module.css';


function ordersummarydonutchart({ dineIn = 0, takeAway = 0 }) {

    const data = [
        { name: 'Take Away', value: takeAway },
        { name: 'Served', value: dineIn + takeAway },
        { name: 'Dine in', value: dineIn }
    ];

    const COLORS = ['#5B5B5B', '#828282', '#2C2C2C'];

    return (
        <div className={styles.donutchart_container}>
            <div className={styles.chartAndLabels}>
                {/* Donut Chart */}
                <div className={styles.chartBox}>
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                        <Pie
                            data={data}
                            innerRadius={40}
                            outerRadius={60}
                            dataKey="value"
                            stroke="white"
                            strokeWidth={2}
                        >
                            {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.labelBox}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.labelRow}>
                        <div className={styles.labelText}>
                            {item.name} <span className={styles.percent}>({item.value}%)</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                            className={styles.progressFill}
                            style={{
                                width: `${item.value}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                            }}
                            ></div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ordersummarydonutchart
