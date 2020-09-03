import React from 'react';
import './App.css';
import HomePageContainer from "../Containers/HomePageContainer";
import { Route, Switch } from "react-router";
import MovieListPageContainer from "../Containers/MoveListPageContainer";
import MovieDetailPageContainer from "../Containers/MovieDetailPageContainer";
import ErrorModalContainer from "../Containers/ErrorModalContainer";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePageContainer}/>
        <Route exact path="/movie-list/:searchQuery/:pageNumber" component={MovieListPageContainer}/>
        <Route exact path="/movie-detail/:imdbId" component={MovieDetailPageContainer}/>
      </Switch>
      <ErrorModalContainer/>
    </>
  );
}

export default App;
