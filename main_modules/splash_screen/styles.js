/**
 * Created by C.L.Wang on 15/11/29.
 */
'use strict';

var React = require('react-native');

var {
  StyleSheet
  } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  cover: {
    flex: 1,
    width: 200,
    height: 1
  },
  logo: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    height: 54,
    backgroundColor: 'transparent'
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FF1493',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: 'transparent'
  }
});

module.exports = styles;