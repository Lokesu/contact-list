import React, { Component } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      email: "",
      showAlert: false,
    };
  }
  toggleAlert = (val) => {
    this.setState({
      showAlert: val,
    });
  };
  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name && email && phone ) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((user) => {
          console.log(user);
          //callback function for app component to add new user to the users array for rendering new data
          this.props.formSubmit(user);
        });
    } else {
      this.toggleAlert(true);
    }
  };
  render() {
    const { showAlert } = this.state;
    return (
      <Container>
        {" "}
        <Form className="border border-secondary p-3 border-4 rounded">
          <Row>
            {showAlert && (
              <Alert variant="danger">Please fill in all the details...</Alert>
            )}
          </Row>
          {/* email username  phone */}
          <Row className="mb-4">
            {" "}
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => this.handleInputChange("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  this.handleInputChange("email", e.target.value)
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPhonenumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                onChange={(e) =>
                  this.handleInputChange("phone", e.target.value)
                }
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" onClick={this.onFormSubmit}>
            Add Contact
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ContactForm;