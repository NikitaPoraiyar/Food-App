import React from 'react'
import styles from '../styles/sidenav.module.css';
import Img1 from '../assets/sidenav_img1.png';
import Img2 from '../assets/sidenav_img2.png';
import Img3 from '../assets/sidenav_img3.png';
import Img4 from '../assets/sidenav_img4.png';
import { useNavigate } from 'react-router-dom';



function sidenav({ customWidth, customHeight, customRadius }) {
    const navigate = useNavigate();
    return (
        <div className={styles.sidenav}>
            <div className={styles.sidenav_topcircle}></div>
            <div className={styles.sidenav_main}>
                <div className={styles.sidenav_options}>
                    <div onClick={() => navigate("/")} style={{ width: customWidth || '40px', height: customHeight || '40px', borderRadius: customRadius || '20px' }}>
                        <img src={Img1} alt="" />
                    </div>
                    <div onClick={() => navigate("/tablemanagement")} style={{ width: customWidth || '40px', height: customHeight || '40px', borderRadius: customRadius || '20px'  }}>
                        <img src={Img2} alt="" />
                    </div>
                    <div onClick={() => navigate("/orderline")} style={{ width: customWidth || '40px', height: customHeight || '40px', borderRadius: customRadius || '20px'  }}>
                        <img src={Img3} alt="" />
                    </div>
                    <div style={{ width: customWidth || '40px', height: customHeight || '40px', borderRadius: customRadius || '20px'  }}>
                        <img src={Img4} alt="" />
                    </div>
                </div>
                <div className={styles.sidenav_bottomcircle}></div>
            </div>
        </div>
    )
}

export default sidenav
