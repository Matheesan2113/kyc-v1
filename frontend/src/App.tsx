import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./App.css";
import {
  BrowserRouter as Router,
  useLocation,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import SurveyForm from "./components/SurveyForm";

interface RouteParams {
  id: string;
}

const Survey: React.FC = () => {
  const [result, setResult] = useState<any>({});
  const cards = Object.keys(result).map((trait) => (
    <Card key={trait}>
      <Card.Header>{trait}</Card.Header>
      <Card.Body>
        <Card.Title> {result[trait]}</Card.Title>
        <Card.Text> Description </Card.Text>
      </Card.Body>
    </Card>
  ));
  const { id } = useParams<RouteParams>();
  return (
    <Container fluid className="p-5">
      <Jumbotron className="pb-2">
        <h1>Onboarding Personalization</h1>
        <p>
          Whether it be Netflix, Apple Music or Domino&apos;s Pizza,
          personalizaiton requires user preferences. Without an understanding of
          the factors that contribute to a users taste, a recommendation system
          can never know what is the appropriate next offer.
        </p>
        <p>
          Learning user preferences in financial services, appears to be
          behavior observation, experiment and survey research combined in a
          statistically significant manner. When utilizing methods that have
          proven significance, repeatable and increasingly accurate assumtions
          can be made upon user preferences from the factors we know correlate
          with our customer base.
        </p>
        <p>
          From discussions as well as research into how others in the financial
          services are capturing user preferences, it appears as if there is an
          opportunity to offer a better service.
        </p>
        <p>
          Where others in the industry are viewing customer inteake as an after
          thought - if we view it as the first touchpoint in a personalizaiton
          pipeline, we can build onboarding into insights that greatly benefit
          both the advisor and their customer.
        </p>
        <h1>Onboarding Personalization</h1>
        <p>
          Research has shown that personality factors can provide statistically
          significant insight into the preferences of wealth customers.
        </p>
        <p>
          It has been shown that the Big Five Personality trait metrics
          &quot;significantly predict financial risk tolerance,&quot; and thus
          can begin to model user prefernce for investment instruments. The
          applications possible from this base are many:
        </p>
        <h2>The Big Five for FI Onboarding</h2>
        <p>
          Describe yourself as you generally are now, not as you wish to be in
          the future.
        </p>
        <p>
          Describe yourself as you honestly see yourself, in relation to other
          people you know of the same sex as you are, and roughly your same age.
        </p>
        <p>
          So that you can describe yourself in an honest manner, your responses
          will be kept in absolute confidence.
        </p>
        <p>
          Indicate for each statement below how much the statement describes
          you:
        </p>
        <p className="text-primary text-center">
          1. Very Inacurate 2.Moderately Inacurate 3. Neither Accurate or
          Inaccurate 4. Moderately Accurate 5. Very Accurate
        </p>
      </Jumbotron>
      <Row className="pb-5">
        <Col>
          <SurveyForm surveyType={id} setResult={setResult} />
        </Col>
      </Row>
      <Row />
      <CardColumns className="pt-5">{cards}</CardColumns>
    </Container>
  );
};
const Home = () => (
  <Container className="pt-4 text-center">
    <Jumbotron className="pb-5">
      <h1 className="pb-4">Home</h1>
      <h3>
        go to <code>/survey/yoursurveyname</code>
      </h3>
      <h3>
        for example: <code>/survey/riskassessment</code>
      </h3>
    </Jumbotron>
  </Container>
);
const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/survey/:id">
        <Survey />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);
export default App;
