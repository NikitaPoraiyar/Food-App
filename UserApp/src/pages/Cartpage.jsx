import React, { useEffect, useState } from 'react';
import styles from '../styles/cartpage.module.css';
import SearchIcon from '../assets/searchicon.png';
import CartProduct from '../components/cartproduct';
import Location from '../assets/location_img.png';
import time from '../assets/time_img.png';
import SwipeToOrder from '../components/SwipeToOrder.jsx';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import cheeseburger from '../assets/cheeseburger.jpg';
import chickenburger from '../assets/chickenburger.jpg';
import paneerburger from '../assets/paneerburger.jpg';
import alootikkiburger from '../assets/alootikkiburger.jpg';
import capricciosapizza from '../assets/capricciosa_pizzaimg.png';
import sicilianpizza from '../assets/sicilian_pizzaimg.png';
import marinara from '../assets/marinara_pizzaimg.png';
import pepperoni from '../assets/pepperoni_pizzaimg.png';
import coke from '../assets/coke.jpg';
import pepsi from '../assets/pepsi.jpg';
import fanta from '../assets/fanta.jpg';
import sprite from '../assets/sprite.jpg';
import frenchfries from '../assets/frenchfries.jpg';
import periperifries from '../assets/periperifries.jpg';
import cheesefries from '../assets/cheesefries.jpg';
import masalafries from '../assets/masalafries.jpg';
import veggiesalad from '../assets/veggiesalad.jpg';
import chickensalad from '../assets/chickensalad.jpg';
import soyasalad from '../assets/soyasalad.jpg';
import paneersalad from '../assets/paneersalad.jpg';
import burger1 from '../assets/burger1.jpg';
import burger2 from '../assets/burger2.jpg';
import pizza1 from '../assets/pizza1.jpg';
import pizza2 from '../assets/pizza2.jpg';
import drink1 from '../assets/drink1.jpg';
import drink2 from '../assets/drink2.jpg';
import fries1 from '../assets/fries1.jpg';
import fries2 from '../assets/fries2.jpg';
import salad1 from '../assets/salad1.jpg';
import salad2 from '../assets/salad2.jpg';
import axios from 'axios';


const imageMap = {
    cheeseburger, chickenburger, paneerburger, alootikkiburger,
    burger1, burger2, capricciosapizza, sicilianpizza, 
    marinara, pepperoni, pizza1, pizza2, coke,
    pepsi, fanta, sprite, drink1, drink2, frenchfries,
    periperifries, cheesefries, masalafries, fries1,
    fries2, veggiesalad, chickensalad, soyasalad, 
    paneersalad, salad1, salad2
};

const allProducts = {
        Pizza: [
            { name: "Capricciosa", price: 249, image: "capricciosapizza", "preparationTime": 10  },
            { name: "Sicilian", price: 229, image: "sicilianpizza", "preparationTime": 10  },
            { name: "Marinara", price: 199, image: "marinara", "preparationTime": 10  },
            { name: "Pepperoni", price: 259, image: "pepperoni", "preparationTime": 10  },
            { name: "Pizza1", price: 90, image: "pizza1", "preparationTime": 10  },
            { name: "Pizza2", price: 300, image: "pizza2", "preparationTime": 10  }
        ],
        Burger: [
            { name: "Cheese Burger", price: 149, image: "cheeseburger", "preparationTime": 10  },
            { name: "Chicken Burger", price: 159, image: "chickenburger", "preparationTime": 10  },
            { name: "Paneer Burger", price: 139, image: "paneerburger", "preparationTime": 10  },
            { name: "Aloo Tikki Burger", price: 119, image: "alootikkiburger", "preparationTime": 10  },
            { name: "Burger1", price: 190, image: "burger1", "preparationTime": 10  },
            { name: "Burger2", price: 100, image: "burger2", "preparationTime": 10  }
        ],
        Drink: [
            { name: "Coke", price: 49, image: "coke", "preparationTime": 2  },
            { name: "Pepsi", price: 45, image: "pepsi", "preparationTime": 2  },
            { name: "Fanta", price: 40, image: "fanta", "preparationTime": 2  },
            { name: "Sprite", price: 40, image: "sprite", "preparationTime": 2  },
            { name: "Drink1", price: 50, image: "drink1", "preparationTime": 2  },
            { name: "Drink2", price: 50, image: "drink2", "preparationTime": 2  }
        ],
        "French fries": [
            { name: "French Fries", price: 79, image: "frenchfries", "preparationTime": 5  },
            { name: "Peri Peri French Fries", price: 89, image: "periperifries", "preparationTime": 5  },
            { name: "Cheese French Fries", price: 99, image: "cheesefries", "preparationTime": 5  },
            { name: "Masala French Fries", price: 85, image: "masalafries", "preparationTime": 5  },
            { name: "Fries1", price: 80, image: "fries1", "preparationTime": 5  },
            { name: "Fries2", price: 80, image: "fries2", "preparationTime": 5  }
        ],
        Salads: [
            { name: "Veggie Salad", price: 99, image: "veggiesalad", "preparationTime": 5  },
            { name: "Chicken Salad", price: 129, image: "chickensalad", "preparationTime": 5  },
            { name: "Soya Salad", price: 109, image: "soyasalad", "preparationTime": 5  },
            { name: "Paneer Salad", price: 119, image: "paneersalad", "preparationTime": 5  },
            { name: "Salad1", price: 100, image: "salad1", "preparationTime": 5  },
            { name: "Salad2", price: 100, image: "salad2", "preparationTime": 5  }
        ]
    };



function Cartpage() {

    const location = useLocation();
    const cartItems = location.state?.cartItems || {};

    const initialSelectedProducts = [];

    for (const [name, count] of Object.entries(cartItems)) {
        if (count > 0) {
            for (const category of Object.values(allProducts)) {
                const product = category.find(p => p.name === name);
                if (product) {
                    initialSelectedProducts.push({ ...product, count });
                    break;
                }
            }
        }
    }

    const [selectedProducts, setSelectedProducts] = useState(initialSelectedProducts);
    const [user, setUser] = useState({ name: '', phone: '', address: '' });
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleOrderSubmit = async () => {
        if (dineInOption === 'Take Away') {
            if (!user.name || !user.phone || !user.address) {
                alert("Please fill in Name, Phone, and Address for Takeaway.");
                return;
            }
        }

        try {
            const orderData = {
                user: dineInOption === 'Dine In' ? {} : user,
                dineOption: dineInOption,
                selectedProducts: selectedProducts.map(p => ({
                    name: p.name,
                    price: p.price,
                    quantity: p.count || p.quantity || 1,
                    preparationTime: p.preparationTime
                }))
            };

            const response = await axios.post(`${import.meta.env.BACKEND_URL}/api/order`, orderData);
            alert("Order Confirmed!!");
            setSelectedProducts([]);
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            alert("Error placing order!!");
        }
    };

    const handleIncrement = (name) => {
        setSelectedProducts(prev =>
            prev.map(item =>
                item.name === name ? { ...item, count: item.count + 1 } : item
            )
        );
    };

    const handleDecrement = (name) => {
        setSelectedProducts(prev =>
            prev.map(item =>
                item.name === name && item.count > 1 ? { ...item, count: item.count - 1 } : item
            )
        );
    };

    const handleRemoveProduct = (nameToRemove) => {
        setSelectedProducts(prev =>
            prev.filter(product => product.name !== nameToRemove)
        );
    };

    const totalAmount = selectedProducts.reduce(
        (total, item) => total + item.price * item.count, 0
    );

    const estimatedTime = selectedProducts.reduce(
        (total, item) => total + item.preparationTime * item.count, 0
    );


    const [dineInOption, setDineOption] = useState("Dine In");


    return (
        <div className={styles.cartpage_container}>
            <div className={styles.cartpage_topcontainer}>
                <h3>Good evening</h3>
                <p>Place your order here</p>
            </div>

            <div className={styles.searchbar_container}>
                <img src={SearchIcon} alt="searchiconImg" />
                <input type="text" placeholder='Search' />
            </div>

            <div className={styles.cartpage_middlecontainer}>
                <div>
                    {selectedProducts.map((product,index) => (
                        <CartProduct key={index} name={product.name} price={product.price} image={imageMap[product.image]} count={product.count} increment={() => handleIncrement(product.name)} decrement={() => handleDecrement(product.name)} onRemove={() => handleRemoveProduct(product.name)} />
                    ))}
                </div>
                <p>Add cooking instructions(optional)</p>
            </div>
            <div className={styles.cartpage_bottomcontainer}>
                <div className={styles.cartpage_optionscontainer}>
                    <div className={`${styles.dinein_option} ${dineInOption === "Dine In" ? styles.selectedOptions:''}`} onClick={() => setDineOption("Dine In")}>
                        <p>Dine In</p>
                    </div>
                    <div className={`${styles.takeaway_option} ${dineInOption === "Take Away" ? styles.selectedOptions:''}`} onClick={() => setDineOption("Take Away")}>
                        <p>Take Away</p>
                    </div>
                </div>
                <div className={styles.costcalculation_container}>
                    <div className={styles.totalcost_container}>
                        <p>Total Cost</p>
                        <p>₹ {totalAmount}</p>
                    </div>
                    <div className={styles.deliverycharges_container}>
                        <p>Delivery Charges</p>
                        <p>₹ 50</p>
                    </div>
                    <div className={styles.taxes_container}>
                        <p>Taxes</p>
                        <p>₹ 5</p>
                    </div>
                    <div className={styles.grandtotal_container}>
                        <h4>Grand Total</h4>
                        <h4>₹ {totalAmount + 50 + 5}</h4>
                    </div>
                </div>
                {dineInOption === "Take Away" && (
                    <>
                        <div className={styles.personaldetails_container}>
                            <h3>Your details</h3>
                            {/* <p>Name,0123456789</p> */}
                            <div>
                                <input name='name' type="text" placeholder='Name' className={styles.name_input} value={user.name} onChange={handleInputChange} /> ,
                                <input name='phone' type="text" placeholder='Phone number' className={styles.phone_input} value={user.phone} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className={styles.address_container}>
                            <div className={styles.deliveryaddress_container}>
                                <img src={Location} alt="" />
                                <p>Delivery at Home - <input name='address' type="text" placeholder='Address' value={user.address} onChange={handleInputChange}  /></p>
                            </div>
                            <div className={styles.deliverytime_container}>
                                <img src={time} alt="" />
                                <p>Delivery in {estimatedTime} mins</p>
                            </div>
                        </div>
                    </>
                )}
                
                <div className={styles.confirmorder_container}>
                    <SwipeToOrder onConfirm={handleOrderSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Cartpage
