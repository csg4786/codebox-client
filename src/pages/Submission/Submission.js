import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Stack from 'react-bootstrap/esm/Stack';
import { Editor, Output } from '../../components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Submission = () => {

  const {id:subId} = useParams();
  const [sub, setSub] = useState({
    code: "",
    output: "",
    status: "",
  });

  // console.log(JSON.parse(sub?.output));

  useEffect(()=>{

    const getSub = async ()=> {
      try {
        const res = await axios.get("https://codebox-server.vercel.app/api/code/task/"+subId, {
          headers:{
            authorization: "Bearer "+JSON.parse(localStorage.getItem("user")).token,
          }
        });
  
        if (res?.data) {
          setSub((prev)=>{
            return {
              ...prev, 
              code: res?.data?.task?.code, 
              status: res?.data?.task?.status, 
              output: ((res?.data?.task?.status === "success") ? res?.data?.task?.output : JSON.parse(res?.data?.task?.output).stderr),
            };
          })
        }
  
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }
    getSub();
  },[subId]);

  return (
    <>
      <h3 className="text-center mt-3 mb-1">Submission: {subId}</h3>
      <Container className="compiler mt-1 mb-3">
        <Row>
          <Col></Col>
          <Col lg={9}>
            <Stack>
              {/* Code Editor */}
              <div className="mt-3 p-1">
                <Editor name2={"code"} readOnly={true} value={sub.code} />
              </div>

              {/* Output Area */}
              <div className="output mt-1 mb-2 p-1">
                <Output status={sub.status} output={sub.output} />
              </div>
            </Stack>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default Submission