import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Slider from "./Slider";

interface Question {
  question: string;
  type: string;
  sentiment: string;
  value: number;
}

interface Props {
  surveyType: string | undefined;
  setResult: Dispatch<SetStateAction<{}>>;
}

const SurveyForm: React.FC<Props> = ({ surveyType, setResult }: Props) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [traits, setTraits] = useState([]);
  const [sentiments, setSentiments] = useState([]);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(9);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/survey/${surveyType}`,
    })
      .then((res) => {
        const surveyData = res.data;
        setQuestions(surveyData.questions);
        setTraits(surveyData.traits);
        setSentiments(surveyData.sentiments);
        setMin(surveyData.min);
        setMax(surveyData.max);
        setSuccess(true);
      })
      .catch((e) => {
        setSuccess(false);
        console.log(e);
        setErrorMsg(`${e.message}`);
      });
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `/api/survey/${surveyType}`,
      data: {
        traits,
        sentiments,
        questions,
        min,
        max,
      },
    })
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  if (success) {
    const sliders = questions.map((q: Question, index: number) => (
      <Slider
        key={q.question}
        index={index}
        min={min}
        max={max}
        questions={questions}
        setQuestions={setQuestions}
      />
    ));
    return (
      <Form onSubmit={submit}>
        {sliders}
        <Row className="text-center pt-5">
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
  return (
    <h1>
      An error occured: <code>{errorMsg}</code>. Are you sure this survey{" "}
      <code>{surveyType}</code> exists?
    </h1>
  );
};

export default SurveyForm;
