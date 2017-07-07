'use strict';

import React from 'react';
import ReactNative, {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

const { AddRatingManager } = NativeModules;
const Rating = require('./Rating');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  welcome: {
    fontSize: 20,
    color: 'white',
  },
  navBar: {
    backgroundColor: '#25507b',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'white',
  },
});


class AddRatingApp extends React.Component {

  constructor(props) {
  super(props);
  this._subscription = null;
  this.state = {

    identifier: props.identifier,
    currentRating: props.currentRating,
  }
}

componentDidMount() {
  const AddRatingManagerEvent = new NativeEventEmitter(AddRatingManager);
  this._subscription = AddRatingManagerEvent.addListener(
    'AddRatingManagerEvent',
    (info) => {
      console.log(JSON.stringify(info));
    }
  );
}

componentWillUnmount() {
  this._subscription.remove();
}

onRatingSelected(selectedRating) {
  this.setState({
    currentRating: selectedRating,
  });
}

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.welcome}>We're live from React LOLOLOL!!!</Text>
  //     </View>
  //   )
  // }

_renderScene(route, navigator) {
  return (
    <Rating
      title={route.title}
      navigator={navigator}
      rating={this.state.currentRating}
      ratingSelectionHandler={this.onRatingSelected.bind(this)}
    />
  );
}

_renderNavTitle(route, navigator, index, navState) {
  return <Text style={styles.navBarTitleText}>{route.title}</Text>;
}

 _renderNavLeftItem(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => {

          console.log(this.props.rootTag);
          console.log(AddRatingManager);
          AddRatingManager.dismissPresentedViewController(this.props.rootTag);
        }}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Cancel
        </Text>
      </TouchableOpacity>
    );
  }

_renderNavRightItem(route, navigator, index, navState) {
  if (this.state.currentRating > 0) {
    return (
      <TouchableOpacity
        onPress={() => {
          AddRatingManager.save(
            this.props.rootTag,
            this.state.currentRating,
            this.state.identifier
          );
        }}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Save
        </Text>
      </TouchableOpacity>
    );
  }
  return null;
}

render() {
  return (
    <Navigator
      debugOverlay={false}
      style={styles.container}
      initialRoute={{title: 'Add Rating'}}
      renderScene={this._renderScene.bind(this)}
      navigationBar={
        <Navigator.NavigationBar
          routeMapper={{
            LeftButton: this._renderNavLeftItem.bind(this),
            RightButton: this._renderNavRightItem.bind(this),
            Title: this._renderNavTitle.bind(this),
          }}
          style={styles.navBar}
        />
      }
    />
  );
}

};






module.exports = AddRatingApp;
