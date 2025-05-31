import React, { useState, useEffect } from 'react';
import styles from '../styles/linechart.module.css';
import {ComposedChart, Line, XAxis, ResponsiveContainer, Customized, YAxis, CartesianGrid, Tooltip } from 'recharts';


const data = [
    { day: 'Sun', value: 0 },
    { day: 'Mon', value: 0 },
    { day: 'Tue', value: 0 },
    { day: 'Wed', value: 0 },
    { day: 'Thur', value: 0 },
    { day: 'Fri', value: 0 },
    { day: 'Sat', value: 0 }
];


function CustomBackground({ data, width, height }) {
    const numberOfDays = data.length;
    const todayIndex = new Date().getDay(); 
    const barWidth = width / numberOfDays;
    const tickSpace = 20;
    const barHeight = height - tickSpace;

    return (
        <g>
            {data.map((entry, index) => {
                const isToday = index === todayIndex;

                return (
                    <rect
                        key={index}
                        x={index * barWidth}
                        y={0}
                        width={barWidth}
                        height={barHeight}
                        fill={isToday ? '#e5e5e5' : '#f9f9f9'}
                        rx={4}
                        ry={4}
                    />
                );
            })}
        </g>
    );
}

function LineChartComponent() {

    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        fetch('http://localhost:3000/api/orders/revenue/daily')
            .then(res => res.json())
            .then(apiData => {
                const updatedData = data.map(dayObj => {
                    const match = apiData.find(apiDay => {
                        const date = new Date(apiDay._id);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        return dayName === dayObj.day;
                    });

                    return match
                        ? { ...dayObj, value: match.totalRevenue }
                        : dayObj;
                });
                setChartData(updatedData);
            })
            .catch(err => console.error("Failed to fetch daily revenue:", err));
    }, []);

    return (
        <div className={styles.linechart_container}>
            <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 20 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                        contentStyle={{ background: 'white', border: 'none', borderRadius: 4 }}
                    />
                    {/* Background Bars */}
                    {/* <Customized
                        component={({ width, height }) => (
                        <CustomBackground width={width} height={height} data={chartData} />
                        )}
                    /> */}

                    <Customized
                        layer="below"
                        component={({ width, height }) => (
                            <CustomBackground width={width} height={height} data={chartData} />
                        )}
                    />

                    {/* Line */}
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#000"
                        strokeWidth={2}
                        dot={false}
                    />
                </ComposedChart>

            </ResponsiveContainer>

            <div className={styles.linechart_labels}>
                {data.map((d, i) => (
                    <p key={i}>{d.day}</p>
                ))}
            </div>
        </div>
    );
}

export default LineChartComponent;
