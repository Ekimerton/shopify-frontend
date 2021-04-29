import './App.css';
import { Input, Button, Row, Col, Steps, Spin, notification, Card } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config()

const { Step } = Steps;
const api_key = process.env.REACT_APP_OMDB_API

function App() {
  // App States
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearch, setLastSearch] = useState("");
  const [nominated, setNominated] = useState({});
  const [nominationCount, setNominationCount] = useState(0);

  // Notifications
  const successNotification = () => {
    notification["success"]({
      message: 'Nominations Complete',
      description:
        'You have successfully nominated five movies! Scroll down to adjust nominations or share final picks.',
    });
  };

  // Sub-components
  function MovieDetail(props) {
    const movieNominated = props.body.imdbID in nominated;
    return (
      <Row style={{ alignItems: "center", marginBottom: 20 }}>
        <Col style={{ marginRight: 5 }}>
          <p style={{ marginBottom: 10, marginTop: 10 }}>
            {props.body.Title} ({props.body.Year})
        </p>
        </Col>
        <Col>
          <Button type="primary" disabled={movieNominated || nominationCount >= 5} size={10} onClick={() => props.onClick(props.body)}>
            Nominate
          </Button>
        </Col>
      </Row>
    )
  }

  function NominationDetail(props) {
    return (
      <Row style={{ alignItems: "center", marginBottom: 20 }}>
        <Col style={{ marginRight: 5 }}>
          <p style={{ marginBottom: 10, marginTop: 10 }}>
            {props.body.Title} ({props.body.Year})
        </p>
        </Col>
        <Col>
          <Button type="primary" size={10} onClick={() => props.onClick(props.body)}>
            Remove
          </Button>
        </Col>
      </Row>
    )
  }

  const onType = (event) => {
    const curr_query = event.target.value;
    setQuery(curr_query)
    const loadInfo = async (query) => {
      setLoading(true);
      axios.get(`http://www.omdbapi.com`,
        {
          params: {
            apikey: api_key,
            type: "movie",
            s: curr_query
          }
        }).then(res => {
          console.log(res);
          if (res.data.Response !== "False") {
            setSearchResults(res.data.Search);
            setLastSearch("Showing results for: " + curr_query);
          } else {
            setSearchResults([]);
            setLastSearch("No results for: " + curr_query);
          }
          setLoading(false);
        }).catch(err => {
          setSearchResults([]);
          setLastSearch("No results for: " + curr_query);
          setLoading(false);
        })
    }
    loadInfo(query);
  }

  const getProgressIndex = () => {
    if (nominationCount < 5) {
      if (!query) {
        return 0;
      }
      return 1;
    }
    return 2;
  }

  const addNomination = (body) => {
    var newNominated = { ...nominated }
    newNominated[body.imdbID] = body;
    setNominated(newNominated);
    if (nominationCount >= 4) {
      successNotification();
    }
    setNominationCount(nominationCount + 1);
  }

  const deleteNomination = (body) => {
    var newNominated = { ...nominated }
    delete newNominated[body.imdbID]
    setNominated(newNominated);
    setNominationCount(nominationCount - 1);
  }

  return (
    <div>
      <body className="App-body">

        <Card className="App-compartment" title="The Shoppies" headStyle={{ fontSize: 24, textAlign: "center" }}>
          <p> Hello, this is my entry in the spotty awards. To use this service, either use the search component to look for films, or the nominations component to manage nominations. </p>
          <Steps size="small" current={getProgressIndex()}>
            <Step title="Search OMDB" />
            <Step title={nominationCount == 5 ? "Nominations Complete!" : (5 - nominationCount) + " Nominations Left"} />
            <Step title="Evaluate Picks and Share" />
          </Steps>
        </Card>

        <Card className="App-compartment" title="Search" headStyle={{ fontSize: 24, textAlign: "center" }}>
          <h3> Movie Title:</h3>
          <Input
            placeholder="Enter movie title here!"
            loading={loading}
            allowClear
            size="large"
            value={query}
            onChange={val => onType(val)}
            style={{ marginBottom: 20 }}
          />
          {query !== "" && <h3> {lastSearch} </h3>}
          {loading &&
            <div style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Spin />
            </div>
          }
          {!loading && searchResults.map(searchResult => (
            <MovieDetail body={searchResult} onClick={addNomination} />
          ))}
        </Card>

        <Card className="App-compartment" title="Nominations" headStyle={{ fontSize: 24, textAlign: "center" }}>
          {Object.entries(nominated).map(nominee => (
            <NominationDetail body={nominee[1]} onClick={deleteNomination} />
          ))}
        </Card>

      </body>
    </div>
  );
}

export default App;
