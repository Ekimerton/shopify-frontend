import './App.css';
import { Input, Button, Steps, Spin, notification, Card, Space, List } from 'antd';
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
        'You have successfully nominated five movies! Scroll up to adjust nominations or confirm final picks.',
    });
  };

  // Sub-components
  function MovieDetail(props) {
    const movieNominated = props.body.imdbID in nominated;
    return (
      <List.Item>
        <List.Item.Meta
          avatar={<img alt="missing poster" src={props.body.Poster} height={100} width={70} />}
          title={props.body.Title}
          description={props.body.Year}
        />
        <Button type="primary" disabled={movieNominated || nominationCount >= 5} onClick={() => props.onClick(props.body)}>
          Nominate
          </Button>
      </List.Item>
    )
  }

  function NominationDetail(props) {
    return (
      <Card
        style={{ width: 200 }}
        cover={
          <img alt="missing poster" src={props.body.Poster} height={250} />
        }
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

  useEffect(() => {
    setLoading(true);
    axios.get(`https://www.omdbapi.com`,
      {
        params: {
          apikey: api_key,
          type: "movie",
          s: query.trim()
        }
      }).then(res => {
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
  }, [query]);

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
        return 3;
      default:
        return 1;
    }
  }

  return (
    <div>
      <body className="App-body">

        <Card className="App-compartment" title="The Shoppies" headStyle={{ fontSize: 24, textAlign: "center" }}>
          <p> Hello, this is my entry in the shoppy awards. To use this service, either use the search component to look for films, or the nominations component to manage nominations. Your nominations will persist as you come and go from the site. </p>
          <Steps size="small" current={getProgressIndex()}>
            <Step title="Search OMDB" />
            <Step title={(5 - nominationCount) + " Nominations Left"} />
            <Step title="Nominations Complete" />
          </Steps>
        </Card>

        <Card className="App-compartment" title="Nominations" headStyle={{ fontSize: 24, textAlign: "center", justifyContent: "center", alignItems: "center" }}>
          <Space size={[16, 16]} wrap style={{ justifyContent: "center", alignItems: "center" }}>
            {Object.entries(nominated).map(nominee => (
              <NominationDetail body={nominee[1]} onClick={deleteNomination} />
            ))}
          </Space>
        </Card>


        <Card className="App-compartment" title="Search" headStyle={{ fontSize: 24, textAlign: "center" }}>
          <h3> Movie Title:</h3>
          <Input
            placeholder="Enter movie title here!"
            loading={loading}
            allowClear
            size="large"
            value={query}
            onChange={event => setQuery(event.target.value)}
            style={{ marginBottom: 20 }}
          />
          {query !== "" && !loading && <h3>Showing results for: {query}</h3>}
          <List
            style={{ width: '100%', justifyContent: 'center' }}
            dataSource={searchResults}
            loading={loading}
            locale={{ emptyText: query === "" ? "Your Search Results Go Here!" : "No Search Results" }}
            renderItem={searchResult => (
              <MovieDetail body={searchResult} onClick={addNomination} />
            )}
          />
        </Card>
      </body>
    </div>
  );
}

export default App;
