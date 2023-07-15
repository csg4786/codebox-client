import React from 'react'
import Form from 'react-bootstrap/Form'
import './select.css'
import {languagesList as languages} from '../Languages';

const Select = ({onChange}) => {
    
  return (
    <>
      <Form.Select
        className="select"
        size="sm"
        name={"language"}
        onChange={onChange}
      >
      {
        languages.map((lang, idx)=>{
            return (
                <option key={idx} value={lang.format}>{lang.name}</option>
            );
        })
      }
      </Form.Select>
    </>
  );
}

export default Select;