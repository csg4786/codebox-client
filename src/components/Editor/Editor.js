import React from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import './editor.css';

const Editor = ({ readOnly, name2, value, onChange, onKeyDown, reff }) => {
  return (
    <div>
      <InputGroup>
        <InputGroup.Text className="icons">
          <Stack>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>
            <div>15</div>
          </Stack>
        </InputGroup.Text>
        <Form.Control
            id={"editor"}
            name={name2}
            rows={15}
            as="textarea"
            spellCheck={false}
            onChange={onChange}
            value={value}
            readOnly={readOnly}
            onKeyDown={onKeyDown}
            ref={reff}
        />
      </InputGroup>
    </div>
  )
}

export default Editor