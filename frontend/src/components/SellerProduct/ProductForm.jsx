import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React,{useState} from "react";
import axios from "axios";

export default function Addproduct() {

  const[category, setCategory] = useState("");
  const[title, setTitle] = useState("");
  const[description, setDescription] = useState("");
  const[price, setPrice] = useState("");
  


  function sendData(e){
    e.preventDefault();
    
    const NewProduct = {
      category,
      title,
      description,
      price,
      /*image*/
     }

    axios.post("http://localhost:8003/seller/add",NewProduct).then(()=>{
      alert("Product Added")
      

    }).catch((err)=>{
      alert(err)
    })
  }


  return (
    <div>
      <Form onSubmit = {sendData}>
        <Form.Select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Default select example">
          <option>Select category</option>
          <option value="Herbal Beauty Products">Herbal Beauty Products</option>
          <option value="Herbal Hair products">Herbal Hair products</option>
          <option value="Other">Other</option>
        </Form.Select>

        <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter the title"
        onChange={(e)=>{

          setTitle(e.target.value);
      }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter the description"
        onChange={(e)=>{

          setDescription(e.target.value);
      }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter price" 
        onChange={(e)=>{

          setPrice(e.target.value);
      }}/>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Add image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Button type = "submit">Confirm</Button>
      </Form>
    </div>
  );
}
