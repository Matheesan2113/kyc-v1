import React, { useState, Dispatch, SetStateAction } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RangeSlider from "react-bootstrap-range-slider";

interface Question {
  question: string;
  type: string;
  sentiment: string;
  value: number;
}

interface Props {
  index: number;
  min: number;
  max: number;
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}

const Slider: React.FC<Props> = ({
  index,
  questions,
  setQuestions,
  min,
  max,
}: Props) => {
  const [sliderValue, setSliderValue] = useState(questions[index].value);
  const updateValue = (newValue: string) => {
    setSliderValue(parseInt(newValue, 10));
    const newQuestions = [...questions]; // Get a copy of the expenses array
    // Replace the current expense item
    newQuestions.splice(index, 1, {
      ...questions[index],
      value: parseInt(newValue, 10),
    });
    // Update the parent stat
    setQuestions(newQuestions);
  };
  return (
    <Form.Group className="p-3">
      <Row>
        <Col>
          <Form.Label>{questions[index].question}</Form.Label>
        </Col>
      </Row>
      <Row>
        <Col>
          <RangeSlider
            min={min}
            max={max}
            value={sliderValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateValue(e.target.value);
              // setSliderValue(parseInt(e.target.value, 10));
            }}
            tooltip="on"
            tooltipPlacement="bottom"
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

export default Slider;
