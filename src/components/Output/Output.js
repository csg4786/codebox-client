import React from 'react'
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import './output.css'

const Output = ({ status, output, handleChange }) => {

  return (
    <Card>
      <Card.Header>
        <>
          {status === "success" ? (
            <Badge bg="success">Success</Badge>
          ) : status === "error" ? (
            <Badge bg="danger">Error</Badge>
          ) : status === "pending" ? (
            <Badge bg="secondary">Pending</Badge>
          ) : (
            <Badge bg="primary">Output</Badge>
          )}
        </>
      </Card.Header>
      <Card.Body>
        <Form.Control
          id={'output'}
          rows={8}
          as="textarea"
          spellCheck={false}
          value={output}
          onChange={handleChange}
          readOnly
        />
      </Card.Body>
    </Card>
  );
}

export default Output