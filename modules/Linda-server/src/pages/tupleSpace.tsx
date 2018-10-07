import * as React from "react";
import * as ReactDOM from "react-dom";
import LindaClient from "Linda-Client";

type Props = {};
type State = {
  tuples: Array<any>;
  watchingTuple: any;
};

const lindaClient = new LindaClient();
class TupleSpace extends React.Component<Props, State> {
  state: State;
  lindaClient: any;
  constructor(props) {
    super(props);
    this.state = {
      tuples: [],
      watchingTuple: {},
    };
  }
  parseURLParams() {
    const returnObj = {};
    const queryStringArray = location.search.substring(1).split("&");
    queryStringArray.map((value: string) => {
      const element = value.split("=");
      returnObj[element[0]] = element[1];
    });
    this.setState({ watchingTuple: returnObj });
  }
  writeTuple(tuple) {
    return () => {
      lindaClient.connect(
        "http://localhost:3000/masuilab",
        () => {
          lindaClient.write(tuple, data => {});
        }
      );
    };
  }
  watchTuple(tuple) {
    lindaClient.connect(
      "http://localhost:3000/masuilab",
      () => {
        lindaClient.watch(tuple, data => {
          this.setState({ tuples: [data._payload, ...this.state.tuples] });
        });
      }
    );
  }
  async componentDidMount() {
    await this.parseURLParams();
    await this.watchTuple(this.state.watchingTuple);
  }
  render() {
    return (
      <div>
        <h1>{`${location.pathname.substring(1)}/${JSON.stringify(
          this.state.watchingTuple
        )}`}</h1>
        <h2>{"write"}</h2>
        <div>
          <button onClick={this.writeTuple(this.state.watchingTuple)}>
            {JSON.stringify(this.state.watchingTuple)}
          </button>
        </div>
        <div>
          {`%curl -d 'tuple=${JSON.stringify(this.state.watchingTuple)}' ${
            location.host
          }`}
        </div>
        <h2>{"watch"}</h2>
        <div>
          {this.state.tuples.map((tuple, index) => {
            return <ul key={index}>{JSON.stringify(tuple)}</ul>;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TupleSpace />, document.getElementById("content"));
