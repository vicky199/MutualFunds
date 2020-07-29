import React, {Component} from 'react';
import {Navigation} from './navigation/rootNavigator';
import {Root} from 'native-base';
import {
  StyleSheet,
} from 'react-native';


export default class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  render() {
    // if (this.state.isConnected) {
    return (
      <Root>
          <Navigation />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
  },
  offlineText: {color: '#fff'},
});
