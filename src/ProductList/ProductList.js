import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Product from "../Product/Product";
import Filter from "../Filter/Sort";
import Shade from "../Filter/Shade";
import Category from "../Filter/Category";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(20);
  const [sort, setSort] = useState("");
  const [shade, setShade] = useState("");
  const [category, setCategory] = useState("");
  const [sortOptions, setSortOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState({});
  const [shadeOptions, setShadeOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    let products = await getProducts();

    // Get Category data
    setSortOptions(products?.data?.data?.sorts);
    const category = products?.data?.data?.aggregations?.find(
      ({ text }) => text === "Category"
    );

    // Get Shade data
    const shade = products?.data?.data?.aggregations?.find(
      ({ text }) => text === "Shade"
    );

    setCategoryOptions(category);
    setShadeOptions(shade);
  }, []);

  useEffect(() => {
    getProducts();
  }, [sort, shade, category]);

  const sortCallback = (sort) => {
    setProducts([]);
    setSort(sort);
  };

  const shadeCallback = (shade) => {
    setProducts([]);
    setShade(shade);
  };

  const categoryCallback = (category) => {
    setProducts([]);
    setCategory(category);
  };

  const getProducts = async () => {
    setError(false);
    setLoading(true);
    try {
      const responseProducts = await axios(
        `https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris&page=${products.length}:${pageNumber}&sort=${sort}&category=${category}&shade=${shade}`
      );
      setProducts((previousProducts) => {
        return [...previousProducts, ...responseProducts?.data?.data?.products];
      });
      setHasMore(responseProducts?.data?.data?.products.length > 0);

      return responseProducts;
    } catch (ex) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // setPageNumber(products.length)
          getProducts();
          console.log("EOP");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="App">
      <div className="filter">
        <Filter sortOptions={sortOptions} sortCallback={sortCallback} />
        <Shade shadeOptions={shadeOptions} shadeCallback={shadeCallback} />
        <Category
          categoryOptions={categoryOptions}
          categoryCallback={categoryCallback}
        />
      </div>
      <Product forwardedRef={lastProductElementRef} products={products} />
      <div>{products.length < 1 && !loading && "No products to display"}</div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
}

export default ProductList;
