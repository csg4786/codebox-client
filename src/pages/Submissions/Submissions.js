import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";
import './submissions.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Select } from '../../components';

const Submissions = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [query, setQuery] = useState({
        default: "?owner=" + user?._id,
        status: "",
        language: "",
        sort: "",
        page: "&page=1",
        limit: "&limit=10",
    });

    const [taskList, setTaskList] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    let allPages = [];
    for (let number = 1; number <= pages; number++) {
      allPages.push(
        <Pagination.Item key={number} value={number} active={number === page || `${number}` === page}
          onClick={(e)=>{
            // console.log(e.target.attributes.value.value);
            setPage(e.target.attributes.value.value);
            setQuery((prev) => {
              return {
                ...prev,
                page: "&page=" + e.target.attributes.value.value,
              };
            })
          }}
        >
          {number}
        </Pagination.Item>,
      );
    }

    const [radioValue, setRadioValue] = useState("1");
    const radios = [
        { name: 'All', value: '1', status: "" },
        { name: 'Success', value: '2', status: "success" },
        { name: 'Error', value: '3', status: "error" },
    ];

    useEffect(() => {
      const getList = async ()=> {
            const filter = query.default+query.status+query.language+query.limit+query.sort+query.page;
            // console.log(filter);
            try {
                const getTasks = await axios.get("https://codebox-server.vercel.app/api/code/tasks"+filter, {
                    headers:{
                        authorization: "Bearer "+JSON.parse(localStorage.getItem("user")).token,
                    }
                });
                if (getTasks?.data?.status === "success") {
                    setTaskList(getTasks?.data?.products);
                    setPages(Math.ceil(getTasks?.data?.total/10));
                }

            } catch (error) {
                console.log(error?.response?.data?.message);
            }
        }

      getList();
    }, [query]);
    

  return (
    <>
      <Container className="mt-1 main text-center">
        <h1 className="mt-3">Submissions</h1>
        <Row>
          <Col></Col>
          <Col lg={10}>
            <Stack>
              <div className="custom-div text-center">
                <div className="item">
                  <ButtonGroup className="text-center">
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={
                          idx === 0
                            ? "outline-primary"
                            : idx === 1
                            ? "outline-success"
                            : "outline-danger"
                        }
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => {
                          setRadioValue(e.currentTarget.value);
                          if (e.currentTarget.value === "1") {
                            setQuery((prev) => {
                              return { ...prev, status: "" };
                            });
                          } else if (e.currentTarget.value === "2") {
                            setQuery((prev) => {
                              return { ...prev, status: "&status=success" };
                            });
                          } else {
                            setQuery((prev) => {
                              return { ...prev, status: "&status=error" };
                            });
                          }
                        }}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>

                <div className="item">
                  <Select onChange={(e) => {
                      if (e.target.value === "") {
                        setQuery((prev) => {
                          return { ...prev, language: "" };
                        });
                      } else {
                        setQuery((prev) => {
                          return {
                            ...prev,
                            language: "&language=" + e.target.value,
                          };
                        });
                      }
                    }} 
                  />
                </div>
              </div>
              <Table className="mt-3" striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Submission ID</th>
                    <th>Language</th>
                    <th>Status</th>
                    <th>Submitted At</th>
                  </tr>
                </thead>
                {
                  taskList.length === 0 ?
                  (<tbody>
                    <tr>
                      <th colSpan={5}>No Submission</th>
                    </tr>
                  </tbody>) :
                  (<tbody>
                  {taskList.map((task, idx) => {
                    return (
                      <tr key={idx} id={`task-${idx}`}>
                        <td>{idx + 1}</td>
                        <td>
                          <Link
                            className="custom-link"
                            to={`/user/submission/${task?._id}`}
                            target="_blank"
                          >
                            {task?._id}
                          </Link>
                        </td>
                        <td>{task?.language}</td>
                        <td>
                          {task?.status === "success" ? (
                            <Badge bg="success">Success</Badge>
                          ) : task?.status === "error" ? (
                            <Badge bg="danger">Error</Badge>
                          ) : task?.status === "pending" ? (
                            <Badge bg="secondary">Pending</Badge>
                          ) : (
                            <Badge bg="primary">Output</Badge>
                          )}
                        </td>
                        <td>{new Date(task?.finishedAt).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>)}
              </Table>
              <div className="pagination">
                <Pagination>
                  <Pagination.Prev
                    disabled={page <= 1}
                    onClick={(e) => {
                      // console.log(e.target.attributes.value.value);
                      setPage(page-1);
                      setQuery((prev) => {
                        return {
                          ...prev,
                          page: "&page=" + (page-1),
                        };
                      });
                    }}
                  />
                  {allPages}
                  <Pagination.Next
                    disabled={page >= pages}
                    onClick={(e) => {
                      // console.log(e.target.attributes.value.value);
                      setPage(page+1);
                      setQuery((prev) => {
                        return {
                          ...prev,
                          page: "&page=" + (page+1),
                        };
                      });
                    }}
                  />
                </Pagination>
              </div>
            </Stack>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default Submissions