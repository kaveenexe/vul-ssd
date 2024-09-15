import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from 'moment'
import Button from "react-bootstrap/Button";

import TextField from "@mui/material/TextField";
const API_BASE = "http://localhost:9010";


const SingleFood = ({
  getCartTotal,
  cartTotal,
  fetchCartFoodData,
  fetchCartCount,
  setLoading,
  setData,
  data,
}) => {
  let { id } = useParams();
  const baseURL = `http://localhost:9020/api/${id}`;
  const [quantity, setQuantity] = useState(1);
  const [singleFood, setSingleFood] = useState([]);
  const [total, setTotal] = useState("");
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(true);
  

  const handleReview = (e) => {
    setReview(e.target.value);
    console.log(review)
  }

  useEffect(() => {
    getCartTotal();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setQuantity(1);
      try {
        const { data: response } = await axios.get(baseURL);
        setSingleFood(response);
        console.log("cid is "+ singleFood._id)
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
   
    fetchData();
  }, []);

  const calculateTotal = ({ target }) => {
    setQuantity(target.value);
    setTotal(target.value * singleFood.price);
  };

  const addReview = async () => {
    Swal.fire({
      title: "Are you sure want to add this review?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Review Added!", "success");
        const reviewItem = {
          userId: localStorage.getItem("username"),
          productId: singleFood._id,
          review: review
        };

        const headers = {
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        };
        axios.post("http://localhost:8000/api/productReview/", reviewItem, { headers });
        console.log(reviewItem);
        fetchReviews();
      }
    });
  };

  const addToCart = async () => {
    Swal.fire({
      title: "Are you sure want to add this to the cart?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Added!", "success");
        const cartItem = {
          foodName: singleFood.name,
          foodId: singleFood._id,
          userId: localStorage.getItem("username"),
          quantity: quantity,
          unit_price: singleFood.price,
          total: total,
          image: singleFood.image,
        };

   

        const headers = {
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        };
        axios.post("http://localhost:9010/api/cart/", cartItem, { headers });
        console.log(cartItem);
        fetchCartFoodData();
        console.log("Total is" + quantity);
      }
    });
  };

 

  const [reviews, setReviews] = useState([]);
  
  const fetchReviews = async () => {
    console.log("food id is "+ id)
    await axios
      .get(`http://localhost:8000/api/productReview/${id}`, {})
      .then(res => {
        const data = res.data
        console.log(data)
        setReviews(data);
        console.log(reviews)
        setReviewLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    console.log("comment data")
    fetchReviews();

}, []);


  

  return (
    <div className="container">
      <div
        className="main"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "4rem",
        }}
      >
        <div className="image">
          <img
            style={{
              width: "90%",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            src={singleFood.image}
            alt="food"
          />
        </div>

        <div className="content">
          <div>
            <h1>{singleFood.name}</h1>
          </div>

          <div>
            <h6>Description</h6>
            <hr />
            <p>{singleFood.description}</p>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              onChange={calculateTotal}
              value={quantity}
            />
          </div>

          <div style={{}}>
            <br />
            <p style={{ fontWeight: 600 }}>
              Total
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Rs. {quantity * singleFood.price}
            </p>
          </div>

          <Button onClick={addToCart}>Add to cart</Button>
        </div>
      </div>
      <div>We are welcoming your reviews!</div>
      <div className="d-flex justify-content-center align-items-center">
        <TextField onChange={handleReview} value={review} className="container" />
        <Button onClick={addReview} style={{ height: "100%" }}>Add Review</Button>
      </div>


      {reviewLoading && <div>Loading</div>}
                {!reviewLoading && (
                    <div class="grid-container">
                        {reviews.map((review) => (
                            <div className='row my-4 bg-light text-dark h6 d-flex direction-col justify-content-between align-items-center border p-2'>
                                <div className='col-sm d-flex justify-content-center'>
                                    {review.userId}
                                </div>
                                <div className='col-sm d-flex justify-content-center'>
                                    {review.review}
                                </div>
                                <div className='col-sm d-flex justify-content-center'>
                                    {moment(review.review_date).format("YYYY/MM/DD hh:mm:ss", true)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
    </div>
  );
};

export default SingleFood;
