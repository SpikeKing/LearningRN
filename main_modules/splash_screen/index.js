/**
 * 启动闪屏
 * @author C.L.Wang
 */
'use strict';

var React = require('react-native');

var {
  View,
  Text,
  Image,
  Dimensions, // 尺寸
  Animated,   // 动画
  } = React;

var styles = require('./styles.js');

var WIDTH = Dimensions.get('window').width;

var SplashScreen = React.createClass({

  // 初始化状态
  getInitialState: function () {
    return {
      cover: {image: {uri: 'splash'}, text: 'Girl\'s Generation'}, // 封面
      bounceValue: new Animated.Value(1) // 弹力值
    };
  },

  // 组件初始化
  componentDidMount: function () {
    Animated.timing(
      this.state.bounceValue, {toValue: 1.2, duration: 2000}
    ).start();
  },

  render: function () {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={{uri: 'splash'}} // 混合资源
          style={{
            flex: 1,
            width: WIDTH,
            height: 1,
            transform: [{scale: this.state.bounceValue}]
          }}/>
        <Text style={styles.text}>
          {this.state.cover.text}
        </Text>
      </View>
    );
  }
});

module.exports = SplashScreen;