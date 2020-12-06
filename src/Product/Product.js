import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Card from "@material-ui/core/Card";
import './Product.css'

function Product(props) {
  return (
    <div className="product">
      {props.products?.map((product, index) => {
        return (
          <Card
            ref={props.forwardedRef}
            className="Product-card"
            key={product?.skuId}
          >
            <div className="product-card-header">
              <div className="product-dis">
                {product.skuDiscPercentage}% OFF
              </div>
            </div>
            <img
              src={product?.skuImageUrl}
              className="Product-image"
              alt="logo"
            />
            <div>{product.skuName}</div>
            <div className="product-card-footer">
              <div>
                ₹ {product.listPrice}&nbsp;
                <del>₹ {product.defaultPrice}</del>
              </div>
              <div>
                {product.skuAverageRating != 0
                  ? product.skuAverageRating
                  : null}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default Product;
