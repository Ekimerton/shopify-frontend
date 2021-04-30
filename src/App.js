import './App.css';
import { Input, Button, Row, Col, Steps, Spin, notification, Card, Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config()

const { Step } = Steps;
const { Meta } = Card;
const api_key = process.env.REACT_APP_OMDB_API

function App() {
  // App States
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nominated, setNominated] = usePersistedState("nominated", {});
  const [nominationCount, setNominationCount] = usePersistedState("nominatedCount", 0);

  //Persistant States using LocalStorage
  function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  }

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
      <Card
        cover={<img alt="missing poster" src={props.body.Poster} height={300} />}
        actions={[
          <Button type="primary" disabled={movieNominated || nominationCount >= 5} onClick={() => props.onClick(props.body)}>
            Nominate
          </Button>
        ]}
      >
        <Meta title={props.body.Title} description={props.body.Year} />
      </Card>
    )
  }

  function NominationDetail(props) {
    return (
      <Card
        cover={<img alt="missing poster" src={props.body.Poster} height={300} />}
        actions={[
          <Button type="primary" onClick={() => props.onClick(props.body)}>
            Remove
          </Button>
        ]}
      >
        <Meta title={props.body.Title} description={props.body.Year} />
      </Card>
    )
  }

  const onType = (event) => {
    const curr_query = event.target.value;
    setQuery(curr_query)
    const loadInfo = async (curr) => {
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
          } else {
            setSearchResults([]);
          }
          setLoading(false);
        }).catch(err => {
          setSearchResults([]);
          setLoading(false);
        })
    }
    loadInfo(query);
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

  const getProgressIndex = () => {
    switch (nominationCount) {
      case 0:
        return 0;
      case 5:
        return 2;
      default:
        return 1;
    }
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
          {query !== "" && !loading && <h3>Showing results for: {query}</h3>}
          {loading &&
            <div style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Spin />
            </div>
          }
          <Row gutter={16} style={{ alignItems: "center", justifyContent: "center" }}>
            {!loading && searchResults.map(searchResult => (
              <Col span={6} style={{ marginBottom: 15 }}>
                <MovieDetail body={searchResult} onClick={addNomination} />
              </Col>
            ))}
          </Row>
        </Card>

        <Card className="App-compartment" title="Nominations" headStyle={{ fontSize: 24, textAlign: "center" }}>
          <Row gutter={16} style={{ alignItems: "center", justifyContent: "center" }}>
            {Object.entries(nominated).map(nominee => (
              <Col span={6} style={{ marginBottom: 15 }}>
                <NominationDetail body={nominee[1]} onClick={deleteNomination} />
              </Col>
            ))}
          </Row>
        </Card>

      </body>
    </div>
  );
}

export default App;
