import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();

    const options = props.options;
    const priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    const finalPrice = qty * parseInt(options[size]);

    const handleAddToCart = async () => {

        // ✅ Find existing item in cart
        const food = data.find(item => item.id === props.foodItem._id);

        if (food) {
            // Same size → UPDATE
            if (food.size === size) {
                await dispatch({
                    type: "UPDATE",
                    id: props.foodItem._id,
                    price: finalPrice,
                    qty: qty
                });
                return;
            }
            // Different size → ADD new item
            else {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size
                });
                return;
            }
        }

        // Item not in cart → ADD
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size
        });
    };

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img
                    src={props.foodItem.img}
                    className="card-img-top"
                    alt={props.foodItem.name}
                    style={{ height: "120px", objectFit: "fill" }}
                />

                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>

                    <div className="container w-100">
                        {/* Quantity */}
                        <select
                            className="m-2 h-100 bg-success rounded"
                            onChange={(e) => setQty(Number(e.target.value))}
                        >
                            {Array.from(Array(6), (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        {/* Size */}
                        <select
                            className="m-2 h-100 bg-success rounded"
                            ref={priceRef}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        {/* Price */}
                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>

                    <hr />

                    <button
                        className="btn btn-success ms-2"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
