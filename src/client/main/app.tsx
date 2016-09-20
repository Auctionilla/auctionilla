import { Component, React } from 'chen-react';

export interface AppProps {}

export interface AppState {}

export class AppComponent extends Component<AppProps, AppState> {

  public render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
