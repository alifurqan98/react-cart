import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const { cartItems, SubTotal, Shipping, Tax, Total } = useSelector(
        (state) => state.cart
    );

    const dispatch = useDispatch();

    const increment = (id) => {
        dispatch({
            type: "addToCart",
            payload: { id },
        });
        dispatch({
            type: "CalculateSum",
        });
    };
    const decrement = (id) => {
        dispatch({
            type: "decrement",
            payload: id,
        });
        dispatch({
            type: "CalculateSum",
        });
    };
    const deleteHandler = (id) => {
        dispatch({
            type: "deleteFromCart",
            payload: id,
        });
        dispatch({
            type: "CalculateSum",
        });
    };

    return (
        <div className="cart">
            <main>
                {cartItems.length > 0 ? (
                    cartItems.map((i) => (
                        <CartItem
                            imgSrc={i.imgSrc}
                            name={i.title}
                            price={i.price}
                            qty={i.quantity}
                            id={i.id}
                            key={i.id}
                            increment={increment}
                            decrement={decrement}
                            deleteHandler={deleteHandler}
                        />
                    ))
                ) : (
                    <h1>No items yet....</h1>
                )}
            </main>

            <aside>
                <h2>SubTotal: ${SubTotal}</h2>
                <h2>Shipping: ${Shipping}</h2>
                <h2>Tax: ${Tax}</h2>
                <h2>Total: ${Total}</h2>
            </aside>
        </div>
    );
};

const CartItem = ({
    imgSrc,
    name,
    price,
    qty,
    increment,
    decrement,
    deleteHandler,
    id,
}) => {
    return (
        <div className="cartItem">
            <img src={imgSrc} alt="Item" />
            <article>
                <h3>{name}</h3>
                <p>${price}</p>
            </article>

            <div>
                <button onClick={() => decrement(id)}>-</button>
                <p>{qty}</p>
                <button onClick={() => increment(id)}>+</button>
            </div>

            <AiFillDelete onClick={() => deleteHandler(id)} />
        </div>
    );
};

export default Cart;
