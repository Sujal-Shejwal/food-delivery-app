import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const [imgError, setImgError] = useState(false); // ✅ NEW

  if (!id) return null;

  return (
    <div className="food-item">
      <div className="food-item-img-container">

        {/* ✅ SHOW IMAGE ONLY IF VALID */}
        {image && !imgError && (
          <img
            className="food-item-image"
            src={`${url}/images/${image}`}
            alt={name}
            onError={() => setImgError(true)} // ✅ hide if broken
          />
        )}

        {!(cartItems?.[id] > 0) ? (
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
            />
            
            <p>{cartItems?.[id] || 0}</p>

            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;