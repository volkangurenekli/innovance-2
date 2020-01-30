import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardImg,
  CardSubtitle,
  CardBody,
  CardTitle,
  Badge,
  Container,
  Row,
  Col
} from "reactstrap";

function App() {
  const [formInput, setFormInput] = useState("");
  const [error1, setError] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [media, setMedia] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errmsg, setErrMsg] = useState("");

  function handler(event) {
    setFormInput(event.target.value);
  }
  function questionControl() {
    return formInput.includes("?");
  }

  async function submit() {
    try {
      setIsShow(false);
      setError(false);
      setErrMsg("");
      let isQuestion = questionControl();
      if (isQuestion) {
        let response = await fetch("https://yesno.wtf/api");
        let item = await response.json();

        setMedia(item.image);
        setQuestion(formInput);
        setAnswer(item.answer);
        setIsShow(true);
      } else throw new Error("This is not a question");
    } catch (error) {
      setError(true);
      setErrMsg(error.message);
    }
  }

  return (
    <Container className="themed-container" style={{ textAlign: "center" }}>
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <h1>
            <Badge color="dark">MAGIC EIGTH BALL</Badge>
          </h1>

          <Form>
            <FormGroup>
              <Input
                type="text"
                name="text"
                placeholder="Ask a Question"
                onChange={event => handler(event)}
              />
            </FormGroup>
            <Button color="primary" onClick={() => submit()}>
              ASK
            </Button>
          </Form>

          <Card style={{ display: isShow ? "block" : "none" }}>
            <CardImg top width="50%" src={media} alt="" />
            <CardBody>
              <CardTitle>QUESTION : {question.toUpperCase()} </CardTitle>
              <CardSubtitle>ANSWER : {answer.toUpperCase()}</CardSubtitle>
            </CardBody>
          </Card>

          <div style={{ display: error1 ? "block" : "none" }}>
            <h3>
              <Badge color="danger">{errmsg}</Badge>
            </h3>
          </div>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
}
export default App;
