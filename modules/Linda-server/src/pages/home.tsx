import * as React from "react";
import * as ReactDOM from "react-dom";

type Props = {};

const Home = props => (
  <div>
    <h1>Welcome to Linda</h1>
    <a href="https://github.com/saji-ryu/Linda/modules/Linda-server">github</a>
  </div>
);
ReactDOM.render(<Home />, document.getElementById("content"));
