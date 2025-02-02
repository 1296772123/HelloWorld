# [React Router 中文文档（二）](https://segmentfault.com/a/1190000014342764)



 

- [react-router](https://segmentfault.com/t/react-router/blogs)
-  

- [route](https://segmentfault.com/t/route/blogs)
-  

- [router](https://segmentfault.com/t/router/blogs)
-  

- [react.js](https://segmentfault.com/t/react.js/blogs)

 

5k 次阅读  ·  读完需要 26 分钟

29













> 官方英文文档 - [https://reacttraining.com/rea...](https://reacttraining.com/react-router/web/api/history)
> 版本 - `v4.2.0`

## history

本文档中的术语 `history` 指的是 [history](https://github.com/ReactTraining/history) 包，它是 React Router 的两个主要依赖之一（除了 React 本身），并且提供了几种不同的实现方式，用于在各种环境中管理 JavaScript 中的会话历史。

以下术语我们会经常使用：

- `browser history` - 针对 DOM 环境，用于支持 HTML5 history API 的浏览器
- `hash history` - 针对 DOM 环境，用于传统的旧式（低版本） 浏览器
- `memory history` - `history` 在内存上的实现，用于测试以及 React Native 等非 DOM 环境

`history` 对象通常具有以下属性和方法：

- `length` - number 历史堆栈中的条目数
- `action` - string 当前的导航操作（`push`、`replace` 或 `pop`）
- `location` - object 当前访问的位置信息，可能具有以下属性：
  - `pathname` - string URL 路径
  - `search` - string URL 中的查询字符串
  - `hash` - string URL 中的 hash 片段
  - `state` - object 存储至 `location` 中的额外状态数据，仅在 `browser history` 和 `memory history` 中有效。
- `push(path, [state])` - function 将一个新条目推入到历史堆栈中
- `replace(path, [state])` - function 替换历史堆栈中的当前条目
- `go(n)` - function 将历史堆栈中的指针移动 n 个条目
- `goBack()` - function 返回到上一个页面，相当于 go(-1)
- `goForward()` - function 进入到下一个页面，相当于 go(1)
- `block(prompt)` - function 阻止导航（请参阅 [history](https://github.com/ReactTraining/history#blocking-transitions) 文档）

#### history is mutable

`history` 对象是可变的。因此建议从 `<Route>` 渲染组件时接收的属性中直接访问 `location`，而不是通过 `history.location` 进行访问。这样可以保证 React 在生命周期中的钩子函数正常执行。例如：

```
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // locationChanged 会是 true
    const locationChanged = nextProps.location !== this.props.location;

    // 错误，locationChanged 永远是 false，因为 history 是可变的。
    const locationChanged = nextProps.history.location !== this.props.history.location;
  }
}

<Route component={Comp} />
```

根据你使用的实现方式，还可能存在其它属性。有关详细信息，请参阅 [history](https://github.com/ReactTraining/history#properties) 文档。

## location

`location` 代表应用程序的位置。如当前的位置，将要去的位置，或是之前所在的位置。它看起来像这样：

```
{
  key: 'ac3df4', // 使用 hash history 时，没有这个属性
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

Router 将在以下几个地方为您提供一个 `location` 对象：

- 在 `Route component` 中，以 `this.props.location` 方式获取
- 在 `Route render` 中，以 `({ location }) => ()` 方式获取
- 在 `Route children` 中，以 `({ location }) => ()` 方式获取
- 在 `withRouter` 中，以 `this.props.location` 方式获取

`location` 对象永远不会发生改变，因此可以在生命周期钩子函数中使用 `location` 对象来查看当前访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用。

```
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}
```

可以在以下不同情境中使用 `location`：

- Web [](https://reacttraining.com/react-router/web/api/Link)
- React Native [](https://reacttraining.com/react-router/native/api/Link)
- [](https://reacttraining.com/react-router/web/api/Redirect)
- [history.push(location)](https://reacttraining.com/react-router/web/api/history)
- [history.replace(location)](https://reacttraining.com/react-router/web/api/history)

通常情况下只是使用一个字符串，但是如果你需要添加一些额外的 `state`，以在应用程序跳转到特定位置时可以使用，那么你就可以使用 `location` 对象。如果你想根据导航历史而不是路径来组织 UI（如模态对话框），这也很有用（见[模态画廊](https://reacttraining.com/react-router/web/example/modal-gallery)示例）。

```
// 通常情况下我们这么做
<Link to="/somewhere" />

// 但是我们可以改为使用 location 对象
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
};

<Link to={location} />
<Redirect to={location} />
history.push(location);
history.replace(location);
```

最终，`location` 将传递给以下组件：

- [Route](https://reacttraining.com/react-router/web/api/Route)
- [Switch](https://reacttraining.com/react-router/web/api/Switch)

这将阻止它们在 Router 状态下使用实际位置。这对动画和等待导航非常有用，或者任何时候你想诱导一个组件在不同于真实位置的地方渲染。

## match

一个 `match` 对象包含有关 `<Route path>` 如何匹配 URL 的信息。它具有以下属性：

- `params` - object 根据 `path` 中指定的动态片段，从 URL 中解析出的键值对
- `isExact` - boolean 如果整个 URL 匹配（不包含尾随字符），则为 `true`
- `path` - string 用于匹配的路径模式。可用于构建嵌套的 `<Route>`
- `url` - string URL 的匹配部分。可用于构建嵌套的 `<Link>`

您可以在以下几个地方访问 `match` 对象：

- 在 `Route component` 中，以 `this.props.match` 方式获取
- 在 `Route render` 中，以 `({ match }) => ()` 方式获取
- 在 `Route children` 中，以 `({ match }) => ()` 方式获取
- 在 `withRouter` 中，以 `this.props.match` 方式获取
- `matchPath` 的返回值

如果 `<Route>` 没有定义 `path`，并因此始终匹配，则会得到最接近的父匹配。`withRouter` 也是一样。

#### null matches

在 `<Route path="/somewhere" children={({ match }) => ()} />` 中，即使 `path` 与当前位置不匹配，`children`指定的内联函数也依然会被调用。这种情况下，`match` 为 `null`。能够在不匹配时依然呈现 `<Route>` 的内容可能很有用，但是这样会带来一些挑战。

解析 URL 的默认方式是将 `match.url` 字符串连接到 relative-path。

```
`${match.url}/relative-path`
```

如果你在 `match` 为 `null` 时尝试执行此操作，最终会出现 `TypeError` 错误。这意味着在使用 `children` 属性时尝试在 `<Route>` 内部连接 relative-path 是不安全的。

当您在产生空匹配对象的 `<Route>` 内部使用没有定义 `path` 的 `<Route>` 时，会出现类似但更微妙的情况。

```
// location.pathname = '/matches'
<Route path='/does-not-match' children={({ match }) => (
  // match === null
  <Route render={({ match: pathlessMatch }) => (
    // pathlessMatch === ???
  )} />
)} />
```

没有 `path` 的 `<Route>` 从它的父节点继承 `match` 对象。如果它的父匹配为 `null`，那么它的匹配也将为 `null`。这意味着：

- 任何子路由/子链接必须是绝对的
- 一个没有定义 `path` 的 `<Route>`，它的父匹配可以为 `null`，但它本身需要使用 `children` 来呈现内容。

## matchPath

在正常的渲染周期之外，你可以使用和 `<Route>` 所使用的相同的匹配代码，例如在服务器上呈现之前收集数据依赖关系。

```
import { matchPath } from 'react-router';

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
});
```

#### pathname

第一个参数是要匹配的路径名。如果您在服务器上通过 Node.js 使用，它将是 `req.path`。

#### props

第二个参数是匹配的属性，它们与 `<Route>` 接受的匹配属性相同：

```
{
  path, // 例如 /users/:id
  strict, // 可选，默认为 false
  exact // 可选，默认为false
}
```

## withRouter

你可以通过 `withRouter` 高阶组件访问 `history` 对象的属性和最近（UI 结构上靠的最近）的 `<Route>` 的 `match` 对象。当组件渲染时，`withRouter` 会将更新后的 `match`、`location` 和 `history` 传递给它。

```
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// 显示当前位置的 pathname 的简单组件
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props;

    return (
      <div>You are now at {location.pathname}</div>
    );
  }
}

// 创建一个连接到 Router 的新组件（借用 redux 术语）
const ShowTheLocationWithRouter = withRouter(ShowTheLocation)
```

注意：withRouter 不会订阅位置更改，如 React Redux 的 connect 对状态更改所做的更改。而是在位置更改从 <Router> 组件传播出去之后重新呈现。这意味着除非其父组件重新呈现，否则使用 withRouter 不会在路由转换时重新呈现。如果使用 withRouter 来防止更新被 shouldComponentUpdate 阻塞，那么使用router 包装实现 shouldComponentUpdate 的组件是非常重要的。例如，使用 Redux 时：

```
// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))
// or
compose(
  withRouter,
  connect(...)
)(MyComponent)

// This does not
connect(...)(withRouter(MyComponent))
// nor
compose(
  connect(...),
  withRouter
)(MyComponent)
```

有关更多信息，请参阅[本指南](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md)。

静态方法和属性

封装组件的所有无反应的特定静态方法和属性都会自动复制到 connected 组件。

#### Component.WrappedComponent

被包装的组件被公开为返回组件上的静态属性 `WrappedComponent`，它可用于隔离测试组件等等。

```
// MyComponent.js
export default withRouter(MyComponent);

// MyComponent.test.js
import MyComponent from './MyComponent';

render(<MyComponent.WrappedComponent location={{...}} ... />);
```

#### wrappedComponentRef: func

一个将作为 `ref` 属性传递给包装组件的函数。

```
class Container extends React.Component {
  componentDidMount() {
    this.component.doSomething();
  }

  render() {
    return (
      <MyComponent wrappedComponentRef={c => this.component = c} />
    )
  }
}
```

- [![img](https://cdn.segmentfault.com/v-5cc2cd8e/global/img/creativecommons-cc.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
- 

- [新浪微博](javascript:void(0);)
- [微信](javascript:void(0);)
- [Twitter](javascript:void(0);)
- [Facebook](javascript:void(0);)



赞  |   29收藏  |  21