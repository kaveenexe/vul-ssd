import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import data from "../../data/customer.json";

function CustForm() {
  const customer = data.customer;

  // validation
  const { Formik } = formik;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const emailExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    Email: yup.string().matches(emailExp, "Email is not valid"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone Number must be 10 characters")
      .max(10, "Phone Number must be 10 characters"),
    pass: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirm: yup
      .string()
      .oneOf([yup.ref("pass"), null], 'Must match "New Password" field value'),
  });

  return (
    <div>
      {customer.map((customer) => (
      <div key={customer._id}  >
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          firstName: customer.firstname,
          lastName: customer.lastname,
          Email: customer.email,
          phoneNumber: customer.phone,
          confirm_password: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="Email"
                  value={values.Email}
                  onChange={handleChange}
                  isInvalid={!!errors.Email}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.Email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik04">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0712345678"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik05">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik06">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="pass"
                  value={values.pass}
                  onChange={handleChange}
                  isInvalid={!!errors.pass}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pass}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik07">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm"
                  value={values.confirm}
                  onChange={handleChange}
                  isInvalid={!!errors.confirm}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirm}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit">Update</Button>
          </Form>
        )}
      </Formik>
      </div>
      ))}
    </div>
  );
}

export default CustForm;
