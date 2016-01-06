# LearningRN
学习ReactNative开发项目

好久没弄ReactNative了, 写个如何实现闪屏(Splash)的文章吧.

注意:
(1) 如何切换页面.
(2) 如何使用计时器TimerMixin.
(3) 如何使用动画效果.
(4) 如何加载Android的项目资源(图片).

![效果](http://img.blog.csdn.net/20151215215927316)

#1. 准备
新建项目, 添加主模块``index.android.js``.
```
/* @flow */
/**
 * 测试
 * @author wangchenlong
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  } = React;

var LearningRN = require('./main_modules/index.js');

AppRegistry.registerComponent('LearningRN', () => LearningRN);
```

> ``/*@flow*/ ``作为跳转和检查的注解. [参考](http://nuclide.io/docs/flow/).

#2.  首页
主要包含闪屏和主页, 使用Navigator的栈, 用于添加额外的页面.
```
/* @flow*/
'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Navigator,
  BackAndroid,
} = React;

var styles = require('./styles'); // 样式

var TimerMixin = require('react-timer-mixin'); // RN的计时器

var SplashScreen = require('./splash_screen/index'); // 飞屏

var MainScreen = require('./main_screen/index'); // 主屏

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
    routeMapper: function (route: Map, navigator: Navigator) {
      _navigator = navigator;

      if (route.name === 'home') {
        return (
          <View style={styles.container}>
            <MainScreen/>
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
          <SplashScreen/> /*飞屏*/
        );
      }
    }
  });

  module.exports = LearningRN;
```

> 后退按钮优先退出栈的页面, 最后作为结束.
> 闪屏显示两秒钟, 使用``TimerMixin``计时器, 再更新状态跳转主页.
> 在``routeMapper``中, 目前主页, 以后再添加其他页面.

样式
```
/*@flow*/
/**
 * Created by wangchenlong on 15/11/29.
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
});

module.exports = styles;
```

#3. 闪屏
首页图片, 有个放大效果, 至1.2倍, 持续两秒(2000ms). 
资源文件(uri)使用项目资源, 放在Android项目的drawable文件夹. 
```
/* @flow*/
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
```

> 在Android工程中放置图片资源, 修改时重新编译打包, 适配屏幕尺寸.
> 在RN工程中放置, 修改时刷新即可, 但无法适配. 使用时, 根据图片特点, 选择位置.

样式
```
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
```

![动画](http://img.blog.csdn.net/20151216064922414)


Github[下载地址](https://github.com/SpikeKing/LearningRN)

这次的比较简单. 我会再写一些复杂的页面.
OK, Enjoy it.
