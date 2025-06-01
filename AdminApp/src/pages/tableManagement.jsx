import React, { useState, useEffect } from 'react'
import SideNav from '../components/sidenav';
import styles from '../styles/tablemanagement.module.css';
import deleteImg from '../assets/delete_img.png';
import chairImg from '../assets/chair_img.png';
import AddTablePopup from '../components/addtable_popup';

function tableManagement() {

  useEffect(() => {
    fetch('https://food-app-fcb5.onrender.com/api/tables')
      .then(res => res.json())
      .then(data => setTables(data))
      .catch(err => console.error("Failed to fetch tables:", err));
  }, []);


  const [showPopup, setShowPopup] = useState(false);
  const [tables, setTables] = useState([]);

  const handleDelete = async (idToDelete) => {
  try {
    const response = await fetch(`https://food-app-fcb5.onrender.com/api/tables/${idToDelete}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error("Delete failed");

    const updatedTables = await response.json();
    setTables(updatedTables);
  } catch (err) {
    console.error("Failed to delete table:", err);
  }
};


  return (
    <div className={styles.tablemanagement_container}>
      <div className={styles.sidenav_tablepage}>
        <SideNav customWidth="40px" customHeight='40px' customRadius='30px' />
      </div>
      <div className={styles.tablemanagement_maincontainer}>
        <div className={styles.tablemanagement_searchconatiner}>
          <div className={styles.tablemanagement_searchbar}>
            <div className={styles.tablemanagement_searchbarcircle}></div>
            <div className={styles.tableManagement_searchinput}>
              <p>Search</p>
            </div>
          </div>
        </div>
        <div className={styles.tablemanagement_maincontentconatiner}>
          <div className={styles.tableManagement_headercontainer}>
            <h1>Tables</h1>
          </div>
          <div className={styles.tableManagement_tablelayout}>
            {tables.map((table, index) => (
              <div key={index} className={styles.table_container}>
                <div className={styles.tablenumber_container}>
                  <h2>Table</h2>
                  <h1>{table.name}</h1>
                </div>
                <div className={styles.tablefor_container}>
                  <img src={deleteImg} alt='delete' onClick={() => handleDelete(table._id)} className={styles.deleteimg_btn} />
                  <div>
                    <img src={chairImg} alt="chair" />
                    <p>{table.chairs}</p>
                  </div>
                </div>
              </div>
            ))}

            
            <div className={styles.addnewtable_container}>
              <div className={styles.add_tablecontainer}>
                <p onClick={()=> setShowPopup(true)}>+</p>
              </div>
              {showPopup && 
                <div className={styles.popup_addtable}>
                  <AddTablePopup setShowPopup={setShowPopup} setTables={setTables} tables={tables} />
                </div>
              }
            </div>
            

          </div>
        </div>
      </div>

      
    </div>
  )
}

export default tableManagement
