import React, { useState, useEffect } from 'react'
import styles from '../styles/landingapp.module.css';
import SearchIcon from '../assets/searchicon.png';
import burgerlogo from '../assets/burgerlogo.png';
import whiteburgerlogo from '../assets/whiteburgerlogo.png';
import pizzalogo from '../assets/pizzalogo.png';
import whitepizzalogo from '../assets/whitepizzalogo.png';
import drinklogo from '../assets/drinklogo.png';
import whitedrinklogo from '../assets/whitedrinklogo.png';
import frenchfrieslogo from '../assets/frenchfrieslogo.png';
import whitefrenchfrieslogo from '../assets/whitefrenchfrieslogo.png';
import saladslogo from '../assets/veggieslogo.png';
import whitesaladslogo from '../assets/whiteveggieslogo.png';
import ProductCard from '../components/productcard';
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
import { useNavigate } from 'react-router-dom';


const categoryLogos = {
    Burger: { normal: burgerlogo, white: whiteburgerlogo },
    Pizza: { normal: pizzalogo, white: whitepizzalogo },
    Drink: { normal: drinklogo, white: whitedrinklogo },
    'French fries': { normal: frenchfrieslogo, white: whitefrenchfrieslogo },
    Salads: { normal: saladslogo, white: whitesaladslogo },
};

const imageMap = {
    cheeseburger, chickenburger, paneerburger, alootikkiburger,
    burger1, burger2, capricciosapizza, sicilianpizza, 
    marinara, pepperoni, pizza1, pizza2, coke,
    pepsi, fanta, sprite, drink1, drink2, frenchfries,
    periperifries, cheesefries, masalafries, fries1,
    fries2, veggiesalad, chickensalad, soyasalad, 
    paneersalad, salad1, salad2
};


function landingApp() {
    const [selectCategory, setSelectCategory] = useState("Pizza");
    const [productCounts, setProductCounts] = useState({});
    const [productData, setProductData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://food-app-fcb5.onrender.com/api/products')
            .then((response) => {
                setProductData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
        console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
    }, []);

    const handleCategoryClick = (category) => {
        setSelectCategory(category);
    };

    const increment = (name) => {
        setProductCounts((prev) => ({
            ...prev,
            [name]: (prev[name] || 0) + 1
        }));
    };

    const decrement = (name) => {
        setProductCounts((prev) => ({
            ...prev,
            [name]: Math.max((prev[name] || 0) - 1, 0)
        }));
    };


    return (
        <div className={styles.landingApp_container}>
            <div className={styles.landingApp_topcontainer}>
                <h3>Good evening</h3>
                <p>Place your order here</p>
            </div>
            <div className={styles.landingApp_middlecontainer}>
                <div className={styles.searchbar_container}>
                    <img src={SearchIcon} alt="searchiconImg" />
                    <input type="text" placeholder='Search' />
                </div>
                <div className={styles.foodcategory_container}>
                    {['Burger', 'Pizza', 'Drink', 'French fries', 'Salads'].map((category, idx) => {
                        const isSelected = category === selectCategory;
                        const containerClass = isSelected
                            ? `${styles.foodcategory_item} ${styles.selectedCategory}`
                            : styles.foodcategory_item;

                        const logoSrc = isSelected
                            ? categoryLogos[category].white
                            : categoryLogos[category].normal;

                        return (
                            <div
                                key={idx}
                                className={containerClass}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <img src={logoSrc} alt={category} />
                                <p className={isSelected ? styles.selectedText : ''}>{category}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.landingApp_bottomcontainer}>
                <div className={styles.category_header}>
                    <h1>{selectCategory}</h1>
                </div>
                <div className={styles.products_displaycontainer}>
                    {productData[selectCategory]?.map((item, index) => (
                        <ProductCard key={index} name={item.name} price={item.price} image={imageMap[item.image]} count={productCounts[item.name] || 0} increment={() => increment(item.name)} decrement={() => decrement(item.name)} />
                    ))}
                </div>
            </div>
            <div className={styles.landingApp_lastcontainer}>
                <button className={styles.next_btn} onClick={() => navigate("/cart", { state: { cartItems: productCounts } })}>Next</button>
            </div>
            
        </div>
    )
}

export default landingApp
