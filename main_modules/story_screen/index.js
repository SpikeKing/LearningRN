'use strict';

var React = require('react-native');

var {
  View,
  Text,
  } = React;

var styles = require('./styles.js');

var StoryScreen = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Story Screen.
        </Text>
      </View>
    );
  }
});

module.exports = StoryScreen;