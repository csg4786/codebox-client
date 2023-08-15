import React, {useState} from 'react'
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Swal from 'sweetalert2';
import './profile.css'


const Profile = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    const [detail, setDetail] = useState(user);
    const handleChange = (e)=> {
        const {name, value} = e.target;
        setDetail((prev) => {
            return {...prev, [name]:value}
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            confirmButtonColor: '#4aaffd',
            showCancelButton: true,
            confirmButtonText: 'Update',
            }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch("https://codebox-server.vercel.app/api/user/update/"+user._id, detail, {
                        headers:{
                            authorization: "Bearer "+JSON.parse(localStorage.getItem("user")).token,
                        }
                    })
                    if (res?.data?.status === "success") {
                        console.log(res)
                        user = {...user, 
                            firstName: detail.firstName,
                            lastName: detail.lastName,
                            email: detail.email,
                            mobile: detail.mobile,
                        }
                        localStorage.setItem("user", JSON.stringify(user));
                    }
                    Swal.fire("Updated!", "", "success");
                } catch (error) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                      footer: error?.response?.data?.message,
                    });
                }
            }
        });
            
    }

  return (
    <>
      <Container className="main text-center">
        <Row>
          <Col></Col>
          <Col xs={5}>
            <Form className="mt-5">
              <h1 className="mt-3">User Profile</h1>
              <Stack>

                <InputGroup className="txt mb-1">
                  <InputGroup.Text className="icons">
                    <i className="fa-solid fa-user" />
                  </InputGroup.Text>
                  <Form.Control placeholder="First Name" 
                  required
                  value={detail.firstName}
                  onChange={handleChange}
                  name="firstName" />
                </InputGroup>

                <InputGroup className="txt mb-1">
                  <InputGroup.Text className="icons">
                    <i className="fa-solid fa-user" />
                  </InputGroup.Text>
                  <Form.Control placeholder="Last Name" 
                  required
                  value={detail.lastName}
                  onChange={handleChange}
                  name="lastName" />
                </InputGroup>

                <InputGroup className="txt mb-1">
                  <InputGroup.Text className="icons">
                    <i className="fa-solid fa-envelope" />
                  </InputGroup.Text>
                  <Form.Control placeholder="Email" 
                  required
                  value={detail.email}
                  onChange={handleChange}
                  name="email" />
                </InputGroup>

                <InputGroup className="txt mb-1">
                  <InputGroup.Text className="icons">
                    <i className="fa-solid fa-phone"></i>
                  </InputGroup.Text>
                  <Form.Control placeholder="Mobile Number" 
                  required
                  value={detail.mobile}
                  onChange={handleChange}
                  name="mobile" />
                </InputGroup>

                <Button onClick={handleClick} className='mt-3' variant="primary">
                  Update Details
                </Button>

              </Stack>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile