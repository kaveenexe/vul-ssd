import Alert from "react-bootstrap/Alert";
import data from "../../data/order.json";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Tracking from "./tracking";
import { useState } from "react";

export default function CustomerOrder() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const order = data.order;
  return (
    <div>
      {order.map((order) => (
        <div key={order._id}>
          <Alert variant="secondary" className="d-flex justify-content-between">
            <div>
              {order.productName} - {order.orderedDate} -
              <Badge bg="info"> {order.status}</Badge>
            </div>


            {/* Tracking */}

            <div className="text-end">
              <Button variant="primary" onClick={handleShow}>
                Track
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Track Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Tracking />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  
                </Modal.Footer>
              </Modal>
            </div>
          </Alert>
        </div>
      ))}
    </div>
  );
}
