import React, { Component } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
class UpdateContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      showAlert: false,
    };
  }
  toggleAlert = (val) => {
    this.setState({
      showAlert: val,
    });
    setTimeout(() => {
      this.setState({
        showAlert: !val,
      });
    }, 5000);
  };
  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
 
  onFormSubmit = (e) => {
    e.preventDefault();
    const userId = this.props.user.id;
    let url = `https://jsonplaceholder.typicode.com/users/1`;
    const { name, email, phone, } = this.state;
    if (name && email && phone ) {
      fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
          phone,
          userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((user) => {
          console.log(user);
          // call update contact function
          this.props.updateContact(user);
          this.props.hideForm();
        });
    } else {
      this.toggleAlert(true);
    }
  };
  render() {
    const { email, name, phone } = this.props.user;
    const { showAlert } = this.state;
    // console.log(this.props);
    return (
      <Container className="m-4">
        <Form
          className="border border-secondary p-3 border-4 rounded"
          style={{ width: "20rem" }}
        >
          <Row>
            {showAlert && (
              <Alert variant="info">
                Please fill in new or existing records...
              </Alert>
            )}
          </Row>
          {/* email username  phone */}
          <Button
            variant="dark"
            className="my-5"
            onClick={this.props.hideForm}
          >
            Close Form
          </Button>
          <Row>
            {" "}
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                onChange={(e) => this.handleInputChange("name", e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={email}
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
                type="text"
                placeholder={phone}
                onChange={(e) =>
                  this.handleInputChange("phone", e.target.value)
                }
              />
            </Form.Group>
          </Row>
          
          <Button variant="primary" type="submit" onClick={this.onFormSubmit}>
            UpdateContact
          </Button>
        </Form>
      </Container>
    );
  }
}

export default UpdateContact;