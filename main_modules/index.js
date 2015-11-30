/**
 * Created by wangchenlong on 15/11/29.
 */
'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Navigator,
  BackAndroid,
  } = React;

var styles = require('./styles');

var TimerMixin = require('react-timer-mixin'); // RN的计时器

var SplashScreen = require('./splash_screen/index'); // 飞屏

var MainScreen = require('./main_screen/index'); // 主屏

var StoryScreen = require('./story_screen/index'); // 内容屏

var _navigator; // 页面管理器

// 后退按钮
BackAndroid.addEventListener('hardwareBackPress', function () {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var LearningRN = React.createClass({

  mixins: [TimerMixin], // 延迟器

  // 初始化状态
  getInitialState: function () {
    return {
      splashed: true
    };
  },

  // 页面加载
  componentDidMount: function () {
    this.setTimeout(
      ()=> {
        this.setState({splashed: false});
      }, 2000);
  },

  // 线路映射
  routeMapper: function (route, navigator) {
    _navigator = navigator;

    if (route.name === 'home') {
      return (
        <View style={styles.container}>
          <MainScreen/>
        </View>
      );
    } else if (route.name === 'story') {
      return (
        <View style={styles.container}>
          <StoryScreen/>
        </View>
      );
    }
  },

  render: function () {
    if (!this.state.splashed) {
      // 初始路径
      var initialRoute = {name: 'home'};

      return (
        <Navigator
          style={styles.container}
          initialRoute={initialRoute}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this.routeMapper}/>
      );
    } else {
      return (
        /*飞屏*/
        <SplashScreen/>
      );
    }
  }
});

module.exports = LearningRN;