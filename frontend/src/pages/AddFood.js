import axios from 'axios';
import React,{useState, useEffect} from 'react'
import FormData from 'form-data';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';


const API_BASE = "http://localhost:9020";

const AddFood = () => {


    //get user details
    const [userDetails, setUserDetails] = useState({});
    const uid = localStorage.getItem("username");
  
    const loadUserData = async () => {
      axios({
        method: "post",
        url: "http://localhost:8080/api/get-user-details",
        data: {
          username: uid,
        },
      }).then((data) => {
        console.log(data.data);
        setUserDetails(data.data);
      });
    };
  
    useEffect(() => {
      loadUserData();
    }, []);

    const [newFood, setNewFood] = useState(
        {
            name:'',
            price:'',
            description:'',
            category:'',
            image:'',
            // showModal: false,
            // message: ''	
            id: '',
        }
    );

    const handleChange = ({target}) => {
        setNewFood({...newFood, [target.name]: target.value});
    }

    const handlePhoto = ({target}) => {
        setNewFood({...newFood, image: target.files[0]});
        console.log(newFood.image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newFood.name);
        formData.append('price', newFood.price);
        formData.append('description', newFood.description);
        formData.append('category', newFood.category);
        formData.append('image', newFood.image);
        formData.append('userId', userDetails.id);
        

        // if (
        //     newFood.name.trim() !== '' &&
        //     newFood.price.trim() !== '' &&
        //     newFood.category.trim() !== '' &&
        //     newFood.image !== null
        //   ) {
        //     await axios.post('http://localhost:9020/api/upload', formData)
        //       .then(res => {
        //         setMessage('Product added successfully!');
        //         handleShow();
        //       })
        //       .catch(err => {
        //         setMessage('An error occurred while adding the product.');
        //         handleShow();
        //       });
        //   } else {
        //     setMessage('Please fill in all the fields.');
        //     handleShow();
        //   }
        

        console.log(formData.image);

        await axios.post('http://localhost:9020/api/upload', formData)
            .then(res => {
                console.log(formData);
                alert("Product Added");
            })
            .catch(err => {
                console.log(err);
                alert("Can't add Product");
            });
    }

    // const handleClose = () => setShowModal(false);
    // const handleShow = () => setShowModal(true);

    // const [showModal, setShowModal] = useState(false);
    // const [message, setMessage] = useState('');

    //                             <Modal show={showModal} onHide={handleClose}>
    //                             <Modal.Header closeButton>
    //                                 <Modal.Title>{message}</Modal.Title>
    //                             </Modal.Header>
    //                             <Modal.Footer>
    //                                 <Button variant="secondary" onClick={handleClose}>
    //                                 Close
    //                                 </Button>
    //                             </Modal.Footer>
    //                             </Modal>


    
    return (
        <section class="vh-100">
            

            <div class="container-fluid h-custom h-100">
                <div class="row d-flex justify-content-center align-items-center h-100s h-100">
                    <div class="col-sm-9 col-md-6 col-lg-8 col-xl-12">

                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">

                            <input type="hidden" name="userId" value={userDetails.id} />
                            <div class="form-outline">
                            <label class="form-label" for="form3Example3">Category</label>
                                <Form.Select value={newFood.category} onChange={e=>newFood.category=e.target.value} aria-label="Default select example">
                                    <option>Select Category</option>
                                    <option value="Herbal Beauty Products">Herbal Beauty Products</option>
                                    <option value="Herbal Hair products">Herbal Hair products</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                                </div>


                                <div class="form-outline ">
                                <label class="form-label" for="form3Example3">Product Name</label>

                                    <Form.Control 
                                        placeholder="Enter Product Name"
                                        name="name"
                                        value={newFood.name}
                                        onChange={handleChange} required
                                    />
                                </div>

                                <div class="form-outlinex">
                                <label class="form-label" for="form3Example3">Price</label>
                                    <Form.Control
                                        placeholder="Enter Price"
                                        name="price"
                                        value={newFood.price}
                                        onChange={handleChange}
                                    />
                                    
                                </div>

                                <div class="form-outline mb-4">
                                <label class="form-label" for="form3Example3">Description</label>
                                    <Form.Control
                                        placeholder="Enter the Description"
                                        name="description"
                                        value={newFood.description}
                                        onChange={handleChange} 
                                    />
                                    
                                </div>

                                
                                <div class="form-outline mb-4">
                                <label class="form-label" for="form3Example3">Add Image</label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={handlePhoto}
                                    />

                                </div>

                               

                                <div class="text-center text-lg-start mt-4 pt-2">
                                <Button type = "submit">Submit</Button>
                                
                               {/* <h1>{userDetails.id}</h1> */}

                                   
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )
}

export default AddFood