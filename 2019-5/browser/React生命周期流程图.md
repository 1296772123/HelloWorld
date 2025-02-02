React 的生命周期本质上就是一系列的钩子函数，可以分为 3 个时期：挂载、更新和卸载。React 16 还新增错误处理的钩子函数。要掌握 React，生命周期是必不可少的一部分。
 注意：本文只对目前最新的 React 生命周期展开详解（v16.4.0）。

## 生命周期流程图



![img](https:////upload-images.jianshu.io/upload_images/6991256-22f851900be0c1f3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)



## 组件创建时的生命周期

### static getDerivedStateFromProps(nextProps, prevState)

该周期函数接收两个参数，新的属性作为第一个参数，先前的状态作为第二个参数。当函数返回 null 时，代表新的属性不需要更新状态；当函数返回了一个对象，对象中的属性则会被更新到 State 中。如下：

```
static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.currentId ！== nextProps.itemId) {
        return {
            currentId: nextProps.itemId
        };
    }
    return null;
}
```

上图意思是，当新属性中的 itemId 与当前 State 的 currentId 不一致时，则执行 currentId 状态的更新，否则返回 null，不执行任何的更新。
 简单来说，如果你的组件中，接收新的属性不需要触发状态的更新，可以忽略该函数，或在该函数中直接返回 null。
 值得一提的是，该周期函数`getDerivedStateFromProps(){...}`是一个静态函数，无法访问组件的实例 this，所以在该函数中没办法访问 this.props 和 this.state。

### componentDidMount

该函数代表组件实例化完成，这个时候非常适合执行

- 网络请求(Ajax)
- 事件订阅

## 组件更新时的生命周期

### static getDerivedStateFromProps

该周期函数在组件的属性和状态更新时都会被触发，用法等同组件创建时的 `getDerivedStateFromProps` 函数。

### shouldComponentUpdate(nextPorps, nextState)

该函数接收新的属性作为第一个参数，新的状态作为第二个参数。当函数返回 true 的时候，周期函数会继续往下执行 render 渲染；当函数返回 false，周期函数则会中止于此，并停止下面的渲染。如果不设置，这个函数会默认返回 true。
 利用好这个周期函数的特性，我们可以避免无用的渲染，提升页面的性能。

### getSnapshotBeforeUpdate(prevProps, prevState)

该周期函数的时期处在 `render` 函数执行之后和组件 DOM 渲染之前。它让你的组件能在当前的值可能要改变前获得它们。该函数返回的任何值将作为 `componentDidUpdate` 周期函数的第三个参数。

### componentDidUpdate(prevProps, prevState, snapshot)

`componentDidUpdate` 函数会在更新发生后立即被调用。
 我们可以在该方法中修改组件的状态以进行 DOM 的更新。同时，这也是一个适合发送网络请求(Ajax)的地方，我们可以通过对比当前属性和旧属性来判断是否需要发送网络请求。

## 组件挂载时的生命周期

### componentWillUnmount

`componentWillUnmount` 函数在组件被卸载和销毁之前被调用。我们可以在该方法里做清理工作，例如解绑定时器，取消网络请求，清理任何在 `componentDidMount` 环节创建的 DOM 元素，取消事件订阅。

## 异常处理的周期函数

### componentDidCatch

> 错误边界是一个 React 组件。错误边界组件捕捉发生在子组件树中任意地方的 JavaScript 错误，打印错误日志，并且显示回退的用户界面。错误边界可以捕捉组件渲染期间、生命周期方法中和子组件构造函数中的错误。

如果定义了这一生命周期方法，一个类组件将成为一个错误边界组件。我们可以在错误边界组件捕获到 JavaScript 错误的时候，显示回退的用户界面。

以下是一个错误边界组件

```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // 显示错误发生的回退视图
    this.setState({ hasError: true });
    // 也可以上报错误到服务器
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // 定制任意的回退视图
      return <h1>页面被外星人偷走了</h1>;
    }
    return this.props.children;
  }
}
```

然后将它作为常规组件

```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

该 componentDidCatch 方法的工作方式类似于 JavaScript catch {} 块，但它一个适用于组件的 catch 块。实际上，大多数情况下，我们只需要声明一次错误边界组件，并在整个应用程序中使用它。
 请注意，**错误边界仅捕获组件树中处于它们子层级组件中的错误**，错误边界本身的错误无法捕获。如果错误边界组件自身报错，则错误将传播到其上方最接近的错误边界。

参考：[新版React生命周期图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

作者：One_Hund

链接：https://www.jianshu.com/p/fac494538a3c

来源：简书

简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。