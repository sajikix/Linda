import * as React from "react";
import * as ReactDOM from "react-dom";
import LindaClientAsync from "linda-client-async";

type Props = {};
type State = {
  tuples: Array<any>;
  watchingTuple: any;
  tupleSpaceName: string;
};

class TupleSpace extends React.Component<Props, State> {
  state: State;
  lindaClient: LindaClientAsync;
  constructor(props) {
    super(props);
    this.state = {
      tuples: [],
      watchingTuple: {},
      tupleSpaceName: location.pathname.substring(1),
    };
    this.lindaClient = new LindaClientAsync();
  }
  async parseURLParams() {
    const returnObj = {};
    const queryStringArray = await location.search.substring(1).split("&");
    await queryStringArray.map((value: string) => {
      const element = value.split("=");
      returnObj[element[0]] = element[1];
    });
    this.setState({ watchingTuple: returnObj });
  }
  async connectLinda() {
    // await this.lindaClient.connect("http://new-linda.herokuapp.com","ubitest");
    await this.lindaClient.connect(
      location.origin,
      this.state.tupleSpaceName
    );
  }
  async writeTuple(tuple) {
    await this.lindaClient.write(tuple);
  }
  async watchTuple(tuple) {
    this.lindaClient.watch(tuple, data => {
      this.setState({ tuples: [data._payload, ...this.state.tuples] });
    });
    this.lindaClient.onDisconnected(async () => {
      console.log("dissconnected!");
      this.lindaClient = null;
      this.lindaClient = await new LindaClientAsync();
      await this.connectLinda();
    });
  }
  async componentDidMount() {
    await this.parseURLParams();
    await this.connectLinda();
    await this.watchTuple(this.state.watchingTuple);
  }
  render() {
    return (
      <div>
        <h1>{`${this.state.tupleSpaceName}/${JSON.stringify(
          this.state.watchingTuple
        )}`}</h1>
        <h2>{"write"}</h2>
        <div>
          <button onClick={() => this.writeTuple(this.state.watchingTuple)}>
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
