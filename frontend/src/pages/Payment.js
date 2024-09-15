import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Payment = ({ setCartTotal, cartTotal, cartFoodData }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required('Card Number is required'),
    date: Yup.string().required('Expiration Date is required'),
    cvv: Yup.string().required('CVV is required'),
    name: Yup.string().required('Cardholder Name is required'),
    billingAddress: Yup.string().required('Billing Address is required'),
    zip: Yup.string().required('ZIP is required'),
    state: Yup.string().required('State is required'),
  });

  const [newPayment, setNewPayment] = useState({
    userId: localStorage.getItem('username'),
    name: '',
    foodId: cartFoodData,
    cardNumber: '',
    date: '',
    cvv: '',
    billingAddress: '',
    zip: '',
    state: '',
  });

  const removeCartItems = async () => {
    try {
      await axios.delete(`http://localhost:9010/api/cart/user/${localStorage.getItem('username')}`);
      getCartTotal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartTotal();
  }, [cartTotal]);

  const getCartTotal = async () => {
    try {
      const { data: response } = await axios.get(
        `http://localhost:9010/api/cart/user/getTotal/${localStorage.getItem('username')}`
      );
      setCartTotal(response);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: newPayment,
    validationSchema: validationSchema,
    onSubmit: values => {
      Swal.fire({
        title: 'Are you sure you want to pay?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire('Payment Successful!', 'success');
          removeCartItems();
          getCartTotal();
          const order = {
            userID: localStorage.getItem('username'),
            transactionID: Math.random().toString(36).substring(2, 8),
            quantity: 1,
            totalPrice: cartTotal,
          };
          axios
            .post('http://localhost:8010/order/add', order)
            .then(res => {
              setCartTotal(0); // Update the cartTotal state to 0 after successful payment
              navigate(`/cart/${localStorage.getItem('username')}`);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <div>
      <div className="container d-lg-flex justify-content-center">
        <div className="box-1 bg-light user"></div>
        <div className="box-2">
          <div className="box-inner-2">
            <div>
              <p className="fw-bold">Payment Details</p>
              <p className="dis mb-3">Complete your purchase by providing your payment details</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <p className="dis fw-bold mb-2">Card details</p>
                <div className="d-flex align-items-center justify-content-between card-atm border rounded">
                  <div className="fab fa-cc-visa ps-3"></div>
                  <input
                    type="text"
                    className={`form-control ${errors.cardNumber && touched.cardNumber ? 'is-invalid' : ''}`}
                    placeholder="Card Details"
                    name="cardNumber"
                    value={values.cardNumber}
                    onChange={handleChange}
                  />
                  {errors.cardNumber && touched.cardNumber && (
                    <div className="invalid-feedback">{errors.cardNumber}</div>
                  )}
                  <div className="d-flex w-50">
                    <input
                      type="text"
                      className={`form-control px-0 ${errors.date && touched.date ? 'is-invalid' : ''}`}
                      placeholder="MM/YY"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                    />
                    {errors.date && touched.date && <div className="invalid-feedback">{errors.date}</div>}
                    <input
                      type="password"
                      className={`form-control ${errors.cvv && touched.cvv ? 'is-invalid' : ''}`}
                      placeholder="CVV"
                      name="cvv"
                      value={values.cvv}
                      onChange={handleChange}
                    />
                    {errors.cvv && touched.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  </div>
                </div>
                <div className="my-3 cardname">
                  <p className="dis fw-bold mb-2">Cardholder name</p>
                  <input
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="address">
                  <p className="dis fw-bold mb-3">Billing address</p>
                  <input
                    className={`form-control ${errors.billingAddress && touched.billingAddress ? 'is-invalid' : ''}`}
                    placeholder="Billing Address"
                    name="billingAddress"
                    value={values.billingAddress}
                    onChange={handleChange}
                  />
                  {errors.billingAddress && touched.billingAddress && (
                    <div className="invalid-feedback">{errors.billingAddress}</div>
                  )}
                  <div className="d-flex">
                    <input
                      className={`form-control zip ${errors.zip && touched.zip ? 'is-invalid' : ''}`}
                      type="text"
                      placeholder="ZIP"
                      name="zip"
                      value={values.zip}
                      onChange={handleChange}
                    />
                    {errors.zip && touched.zip && <div className="invalid-feedback">{errors.zip}</div>}
                    <input
                      className={`form-control state ${errors.state && touched.state ? 'is-invalid' : ''}`}
                      type="text"
                      placeholder="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                    />
                    {errors.state && touched.state && <div className="invalid-feedback">{errors.state}</div>}
                  </div>
                  <div className="d-flex flex-column dis">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="col-sm">Item</div>
                      <div className="col-sm">Quantity</div>
                      <div className="col-sm">
                        <span className="fas fa-dollar-sign"></span>
                        <b>Amount</b>
                      </div>
                    </div>
                    <div className="d-flex flex-column dis">
                      {cartFoodData.map(item => (
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <div className="col-sm">{item.foodName}</div>
                          <div className="col-sm">{item.quantity}</div>
                          <div className="col-sm">{item.total}</div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="col-sm">Total</div>
                      <div className="col-sm"></div>
                      <div className="col-sm">
                        <span className="fas fa-dollar-sign"></span>
                        {cartTotal}
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Pay ${cartTotal}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
