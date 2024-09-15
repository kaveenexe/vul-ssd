import React, { useState, useEffect } from 'react';
import '../index.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FormData from 'form-data';

const Cart = ({
  deleteItem,
  fetchCartFoodData,
  cartFoodLoading,
  cartFoodData,
  getCartTotal,
  cartTotal,
  orderData,
  setOrderData
}) => {
  const navigate = useNavigate();
  const [updatedCartTotal, setUpdatedCartTotal] = useState(0); // New state to track updated cart total

  const redirectEditFood = async (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    fetchCartFoodData();
  }, []);

  useEffect(() => {
    // Calculate the updated cart total whenever cartFoodData changes
    const calculateUpdatedCartTotal = () => {
      let total = 0;
      cartFoodData.forEach(item => {
        total += item.unit_price * item.quantity;
      });
      setUpdatedCartTotal(total);
    };

    calculateUpdatedCartTotal();
  }, []);

  const redirectCheckout = () => {
    navigate(`/payment/`);
  };

  return (
    <div className='row'>
      {cartFoodLoading && <div>Loading</div>}
      {!cartFoodLoading && (
        <div className="container col-sm-8">
          {cartFoodData.map(item => (
            <div
              className="row container-fluid d-flex align-items-center justify-content-center m-2"
              key={item._id} // Add a unique key for each cart item
            >
              <div className='row d-flex flex-row'>
                <img
                  className='img-circle'
                  src={item.image}
                  alt="..."
                  style={{ width: '150px', height: '100px' }}
                />
                <div className='col d-flex align-items-center'>{item.foodName}</div>
                <div className='col d-flex align-items-center'>x {item.quantity}</div>
                <div className='col d-flex align-items-center'>Rs. {item.unit_price * item.quantity}</div>
                <div className='col d-flex align-items-center align-items-end'>
                  <Button
                    variant="contained"
                    onClick={() => redirectEditFood(item._id)}
                    style={{ margin: '10px', width: '150px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={async () => {
                      await deleteItem(item._id);
                    }}
                    style={{ margin: '10px', width: '150px' }}
                  >
                    Remove Item
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className='row'
        style={{
          position: 'fixed',
          marginBottom: '200px',
          marginRight: '200px',
          marginLeft: '200px',
          top: '400px',
        }}
      >
        <div className='col-sm d-flex align-items-center justify-content-center'>
          <div className="h3">Cart Total: Rs.{updatedCartTotal}</div>
        </div>
        <div className='col-sm'>
          <Button
            onClick={() => redirectCheckout()}
            variant="contained"
            style={{ margin: '10px', width: '150px' }}
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
