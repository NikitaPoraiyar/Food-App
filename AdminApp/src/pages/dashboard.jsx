import React, { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css'
import SideNav from '../components/sidenav.jsx'
import DropdownImg from '../assets/dropdown_img.png';
import TotalChefImg from '../assets/totalchef_img.png';
import TotalClientsImg from '../assets/totalclients_img.png';
import TotalOrdersImg from '../assets/totalorders_img.png';
import TotalRevenueImg from '../assets/totalrevenue_img.png';
import OrderSummary from '../components/ordersummary.jsx';
import RevenueSummary from '../components/revenuesummary.jsx';
import TableSummary from '../components/tablesummary.jsx';
import ChefTableSummary from '../components/cheftablesummary.jsx';




function dashboard() {

    const [orderData, setOrderData] = useState({totalOrders:0, totalRevenue:0, totalClients:0, dineInOrdersCount: 0, takeAwayOrdersCount: 0});
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const filterLabels = {
        totalChef: "Total Chef",
        totalRevenue: "Total Revenue",
        totalOrders: "Total Orders",
        totalClients: "Total Clients",
        orderSummary: "Order Summary",
        revenueSummary: "Revenue",
        tableSummary: "Tables",
        chefSummary: "Chef",
        all: "Show All"
    };

    const getFilterLabel = () => {
        return selectedFilter === "all" ? "Filter..." : filterLabels[selectedFilter];
    };


    useEffect(() => {
        fetch('https://food-app-fcb5.onrender.com/api/orders/summary')
            .then(res => res.json())
            .then(data => setOrderData(data))
            .catch(err => console.error("Failed to fetch order summary:", err));
    }, []);

    return (
        <div className={styles.dashboard}>
            <div>
                <SideNav />
            </div>
            <div className={styles.dashboard_maincontainer}>
                <div className={styles.dashboard_topcontainer}>
                    <div className={styles.filter_container}>
                        <p>{getFilterLabel()}</p>
                        <div className={styles.filter_dropdown} onClick={() => setShowFilterOptions(!showFilterOptions)}>
                            <img src={DropdownImg} alt="" />
                        </div>
                        {showFilterOptions && (
                            <div className={styles.dashboard_filteroptions}>
                                <div className={styles.totalchef_options} onClick={() => {setSelectedFilter("totalChef"); setShowFilterOptions(false);}}>Total Chef</div>
                                <div className={styles.totalrevenue_options} onClick={() => {setSelectedFilter("totalRevenue"); setShowFilterOptions(false);}}>Total Revenue</div>
                                <div className={styles.totalorders_options} onClick={() => {setSelectedFilter("totalOrders"); setShowFilterOptions(false);}}>Total Orders</div>
                                <div className={styles.totalclients_options} onClick={() => {setSelectedFilter("totalClients"); setShowFilterOptions(false);}}>Total Clients</div>
                                <div className={styles.ordersummary_options} onClick={() => {setSelectedFilter("orderSummary"); setShowFilterOptions(false);}}>Order Summary</div>
                                <div className={styles.revenue_options} onClick={() => {setSelectedFilter("revenueSummary"); setShowFilterOptions(false);}}>Revenue</div>
                                <div className={styles.tablesummary_options} onClick={() => {setSelectedFilter("tableSummary"); setShowFilterOptions(false);}}>Tables</div>
                                <div className={styles.chef_options} onClick={() => {setSelectedFilter("chefSummary"); setShowFilterOptions(false);}}>Chef</div>
                                <div onClick={() => {setSelectedFilter("all"); setShowFilterOptions(false);}}>Show All</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.dashboard_bottomcontainer}>
                    <h2>Analytics</h2>
                    <div className={styles.dashboard_analytics}>
                        <div className={styles.top_analytics}>
                            <div className={styles.totalchef_container} style={{ display: selectedFilter === "totalChef" || selectedFilter === "all" ? "flex" : "none" }}>
                                <div className={styles.totalchef_imgcontainer}>
                                    <img src={TotalChefImg} alt="" />
                                </div>
                                <div className={styles.totalchef_info}>
                                    <h2>04</h2>
                                    <p>TOTAL CHEF</p>
                                </div>
                            </div>
                            <div className={styles.totalrevenue_container} style={{ display: selectedFilter === "totalRevenue" || selectedFilter === "all" ? "flex" : "none" }}>
                                <div className={styles.totalrevenue_imgcontainer}>
                                    <img src={TotalRevenueImg} alt="" />
                                </div>
                                <div className={styles.totalrevenue_info}>
                                    <h2>{orderData.totalRevenue}</h2>
                                    <p>TOTAL REVENUE</p>
                                </div>
                            </div>
                            <div className={styles.totalorders_container} style={{ display: selectedFilter === "totalOrders" || selectedFilter === "all" ? "flex" : "none" }}>
                                <div className={styles.totalorders_imgcontainer}>
                                    <img src={TotalOrdersImg} alt="" />
                                </div>
                                <div className={styles.totalorders_info}>
                                    <h2>{orderData.totalOrders}</h2>
                                    <p>TOTAL ORDERS</p>
                                </div>
                            </div>
                            <div className={styles.totalclients_container} style={{ display: selectedFilter === "totalClients" || selectedFilter === "all" ? "flex" : "none" }}>
                                <div className={styles.totalclients_imgcontainer}>
                                    <img src={TotalClientsImg} alt="" />
                                </div>
                                <div className={styles.totalclients_info}>
                                    <h2>{orderData.dineInOrdersCount + orderData.takeAwayOrdersCount}</h2>
                                    <p>TOTAL CLIENTS</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.middle_analytics}>
                            <div className={styles.ordersummary_analyticscontainer} style={{ display: selectedFilter === "orderSummary" || selectedFilter === "all" ? "block" : "none" }}>
                                <OrderSummary />
                            </div>
                            <div className={styles.revenuesummary_analyticscontainer} style={{ display: selectedFilter === "revenueSummary" || selectedFilter === "all" ? "block" : "none" }}>
                                <RevenueSummary />
                            </div>
                            <div className={styles.tablesummary_analyticscontainer} style={{ display: selectedFilter === "tableSummary" || selectedFilter === "all" ? "block" : "none" }}>
                                <TableSummary />
                            </div>
                        </div>
                        <div className={styles.bottom_analytics} style={{ display: selectedFilter === "chefSummary" || selectedFilter === "all" ? "block" : "none" }}>
                            <ChefTableSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard
