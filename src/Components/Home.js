import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const Home = () => {
    const [productList, setproductList] = useState([]);

    const fetchProduct = async () => {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setproductList(data);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const dispatch = useDispatch();

    const addToCartHandler = (options) => {
        console.log(options);
        dispatch({
            type: "addToCart",
            payload: options,
        });
        dispatch({
            type: "CalculateSum",
        });
        toast.success("Added to cart");
    };
    return (
        <div className="home">
            {productList.map((items) => (
                <Productcard
                    key={items.id}
                    title={items.title}
                    price={items.price}
                    imgSrc={items.image}
                    id={items.id}
                    handler={addToCartHandler}
                />
            ))}
        </div>
    );
};

const Productcard = ({ title, id, price, handler, imgSrc }) => (
    <div className="productcard">
        <img src={imgSrc} alt={title} />
        <p>{title}</p>
        <h4>${price}</h4>
        <button
            onClick={() => handler({ title, price, id, quantity: 1, imgSrc })}
        >
            Add to Cart
        </button>
    </div>
);

export default Home;
