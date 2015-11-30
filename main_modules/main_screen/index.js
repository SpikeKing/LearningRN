'use strict';

var React = require('react-native');

var {
  View,
  Text,
  } = React;

var styles = require('./styles.js');

var MainScreen = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Main Screen.
        </Text>
      </View>
    );
  }
});

module.exports = MainScreen;