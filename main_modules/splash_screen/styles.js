/*@flow*/
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
