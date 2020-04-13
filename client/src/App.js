import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Join } from "./components/join/join";
import { Chat } from "./components/chat/chat";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Join } />
          <Route path="/chat" component={ Chat } />
        </Switch>
      </BrowserRouter>

    </div>
  );
};

export default App;
