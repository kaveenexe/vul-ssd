import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";

const UpdateOrderStatus = ({ order, open, handleClose, handleUpdate }) => {
  const [status, setStatus] = useState(order.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(order._id, status);
    handleClose();
  };

  handleUpdate = () => {
    const { orderId, newStatus } = this.state;
    this.props.updateOrder(orderId, newStatus); // call the updateOrder method passed via props
    this.props.closeModal(); // close the modal
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-container">
        <h2>Update Order Status</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            id="status"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          />
          <Button variant="contained" type="submit">
            Update
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateOrderStatus;
