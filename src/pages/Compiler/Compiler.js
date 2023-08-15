import React, {useState, useRef} from 'react'
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Output, Editor, Select } from "../../components";
import axios from "axios";
import { languagesMap as languages } from "../../components/Languages";
import './compiler.css';

const Compiler = () => {

  const codeAreaRef = useRef();
  const [task, setTask] = useState({language: "cpp", code: ""});
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e)=> {
    const {name, value} = e.target;

    setTask((prev)=>{
      return {...prev, [name]:value};
    });
    if (name === 'language') {
      setTask((prev)=>{
        return {...prev, language: value, code: languages.get(value)?.snippet};
      });
    }
  };

  const handleClick = async (e)=> {
    e.preventDefault();
    try {
      const res = await axios.post("https://codebox-server.vercel.app/api/code/run", task, {
        headers:{
          authorization: "Bearer "+JSON.parse(localStorage.getItem("user")).token,
        }
      });
      
      if (res.data.taskId) {

        const execution = setInterval(async () => {
          
          const res1 = await axios.get("https://codebox-server.vercel.app/api/code/status/"+res.data.taskId, {
            headers:{
              authorization: "Bearer "+JSON.parse(localStorage.getItem("user")).token,
            }
          });

          setStatus(res1.data?.task.status);
          if (res1.data?.task.status !== "pending") {
            (res1.data?.task.status === "success") ? setOutput(res1.data?.task.output) : setOutput(JSON.parse(res1.data?.task.output).stderr);
            
            clearInterval(execution);
          }

        }, 1000);
        
      }

    } catch (err) {
      console.log(err);
    }


  };

  return (
    <div>

      <Container className="compiler">
        <Row>
          <Col>
            <div className="mt-3 p-1">
              <Select onChange={handleChange}/>
            </div>
            <div className=" mt-3 p-1 text-center">
              <>
                {status === "pending" ? (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                ) : (
                  <Button onClick={handleClick} variant="primary">
                    Run Code
                  </Button>
                )}
              </>
            </div>
          </Col>
          <Col lg={9}>
            <Stack>

              {/* Code Editor */}
              <div className="mt-3 p-1">
                <Editor
                  name2={"code"}
                  readOnly={false}
                  value={task.code}
                  reff={codeAreaRef}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Tab") {
                      e.preventDefault();
                      const { selectionStart, selectionEnd } = e.target;

                      const newText =
                        task.code.substring(0, selectionStart) +
                        "    " +
                        task.code.substring(selectionEnd, task.code.length);
                      codeAreaRef.current.focus();
                      codeAreaRef.current.value = newText;

                      codeAreaRef.current.setSelectionRange(
                        selectionStart + 4,
                        selectionStart + 4
                      );

                      setTask((prev) => {
                        return { ...prev, code: newText };
                      });
                    }
                  }}
                />
              </div>

              {/* Output Area */}
              <div className="output mt-1 mb-2 p-1">
                <Output
                  status={status}
                  output={output}
                  handleChange={handleChange}
                />
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Compiler;