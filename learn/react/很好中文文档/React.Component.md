# React.Component

[组件](https://react.docschina.org/docs/components-and-props.html) 能够让你将UI分割成独立的、可重用的部分，并对每一部分单独考量。[`React`](https://react.docschina.org/docs/react-api.html)提供了`React.Component` 。

## 概览

`React.Component`是一个抽象基础类，因此直接引用`React.Component`几乎没意义。相反，你通常会继承自它，并至少定义一个[`render()`](https://react.docschina.org/docs/react-component.html#render)方法。

通常你定义一个React组件相当于一个纯[JavaScript类](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)：

```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

若你仍未使用 ES6，你可以使用 [`create-react-class`](https://react.docschina.org/docs/react-api.html#createclass)模块。查看 [Using React without ES6](https://react.docschina.org/docs/react-without-es6.html)了解更多。

### 组件生命周期

每一个组件都有几个你可以重写以让代码在处理环节的特定时期运行的“生命周期方法”。方法中带有前缀 **will** 的在特定环节之前被调用，而带有前缀 **did** 的方法则会在特定环节之后被调用。

#### 装配

这些方法会在组件实例被创建和插入DOM中时被调用：

- [`constructor()`](https://react.docschina.org/docs/react-component.html#constructor)
- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`componentWillMount()` / `UNSAFE_componentWillMount()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillmount)
- [`render()`](https://react.docschina.org/docs/react-component.html#render)
- [`componentDidMount()`](https://react.docschina.org/docs/react-component.html#componentdidmount)

#### 更新

属性或状态的改变会触发一次更新。当一个组件在被重渲时，这些方法将会被调用：

- [`componentWillReceiveProps()` / `UNSAFE_componentWillReceiveProps()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillreceiveprops)
- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
- [`componentWillUpdate()` / `UNSAFE_componentWillUpdate()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillupdate)
- [`render()`](https://react.docschina.org/docs/react-component.html#render)
- [`getSnapshotBeforeUpdate()`](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)
- [`componentDidUpdate()`](https://react.docschina.org/docs/react-component.html#componentdidupdate)

#### 卸载

当一个组件被从DOM中移除时，该方法被调用：

- [`componentWillUnmount()`](https://react.docschina.org/docs/react-component.html#componentwillunmount)

#### 错误处理

在渲染过程中发生错误时会被调用：

- [`componentDidCatch()`](https://react.docschina.org/docs/react-component.html#componentdidcatch)

### 其他API

每一个组件还提供了其他的API：

- [`setState()`](https://react.docschina.org/docs/react-component.html#setstate)
- [`forceUpdate()`](https://react.docschina.org/docs/react-component.html#forceupdate)

### 类属性

- [`defaultProps`](https://react.docschina.org/docs/react-component.html#defaultprops)
- [`displayName`](https://react.docschina.org/docs/react-component.html#displayname)

### 实例属性

- [`props`](https://react.docschina.org/docs/react-component.html#props)
- [`state`](https://react.docschina.org/docs/react-component.html#state)

------

## 参考

### `render()`

```
render()
```

`render()`方法是必须的。

当被调用时，其应该检查`this.props` 和 `this.state`并返回以下类型中的一个:

- **React元素。** 通常是由 JSX 创建。该元素可能是一个原生DOM组件的表示，如`<div />`，或者是一个你定义的合成组件。
- **字符串和数字。** 这些将被渲染为 DOM 中的 text node。
- **Portals。** 由 [`ReactDOM.createPortal`](https://react.docschina.org/docs/portals.html) 创建。
- `null`。 什么都不渲染。
- **布尔值。** 什么都不渲染。（通常存在于 `return test && <Child />`写法，其中 `test` 是布尔值。）

当返回`null` 或 `false`时，`ReactDOM.findDOMNode(this)` 将返回 `null`。

`render()`函数应该纯净，意味着其不应该改变组件的状态，其每次调用都应返回相同的结果，同时不直接和浏览器交互。若需要和浏览器交互，将任务放在`componentDidMount()`阶段或其他的生命周期方法。保持`render()` 方法纯净使得组件更容易思考。

> 注意
>
> 若 [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)返回false，`render()`函数将不会被调用。

#### Fragments

你还可以通过使用一个数组让`render()`返回多个元素：

```
render() {
  return [
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

> 注意
>
> 不要忘了给元素[添加key](https://react.docschina.org/docs/lists-and-keys.html#keys)来避免key warning。

------

### `constructor()`

```
constructor(props)
```

React组件的构造函数将会在装配之前被调用。当为一个`React.Component`子类定义构造函数时，你应该在任何其他的表达式之前调用`super(props)`。否则，`this.props`在构造函数中将是未定义，并可能引发异常。

构造函数是初始化状态的合适位置。若你不初始化状态且不绑定方法，那你也不需要为你的React组件定义一个构造函数。

可以基于属性来初始化状态。这样有效地“分离（forks）”属性并根据初始属性设置状态。这有一个有效的`React.Component`子类构造函数的例子：

```
constructor(props) {
  super(props);
  this.state = {
    color: props.initialColor
  };
}
```

当心这种模式，因为状态将不会随着属性的更新而更新。保证属性和状态同步，你通常想要[状态提升](https://react.docschina.org/docs/lifting-state-up.html)。

若你通过使用它们为状态“分离”属性，你可能也想要实现[`UNSAFE_componentWillReceiveProps(nextProps)`](https://react.docschina.org/docs/react-component.html#componentwillreceiveprops)以保持最新的状态。但状态提升通常来说更容易以及更少的异常。

------

### `static getDerivedStateFromProps()`

```
static getDerivedStateFromProps(nextProps, prevState)
```

组件实例化后和接受新属性时将会调用`getDerivedStateFromProps`。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态。

注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。如果你只想处理变化，你可能想去比较新旧值。

调用`this.setState()` 通常不会触发 `getDerivedStateFromProps()`。

------

### `UNSAFE_componentWillMount()`

```
UNSAFE_componentWillMount()
```

`UNSAFE_componentWillMount()`在装配发生前被立刻调用。其在`render()`之前被调用，因此在这方法里同步地设置状态将不会触发重渲。

避免在该方法中引入任何的副作用或订阅。对于这些使用场景，我们推荐使用`constructor()`来替代。

这是唯一的会在服务端渲染调起的生命周期钩子函数。

> 注意
>
> 这一生命周期之前叫做`componentWillMount`。这一名字在17版前都有效。可以使用[`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles)来自动更新你的组件。

------

### `componentDidMount()`

```
componentDidMount()
```

`componentDidMount()`在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。若你需要从远端加载数据，这是一个适合实现网络请求的地方。在该方法里设置状态将会触发重渲。

这一方法是一个发起任何订阅的好地方。如果你这么做了，别忘了在`componentWillUnmount()`退订。

在这个方法中调用`setState()`将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了即使`render()`将会调用两次，但用户不会看到中间状态。谨慎使用这一模式，因为它常导致性能问题。然而，它对于像模态框和工具提示框这样的例子是必须的。这时，在渲染依赖DOM节点的尺寸或者位置的视图前，你需要先测量这些节点。

------

### `UNSAFE_componentWillReceiveProps()`

```
UNSAFE_componentWillReceiveProps(nextProps)
```

> 注意
>
> 推荐你使用[`getDerivedStateFromProps`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)生命周期而不是`UNSAFE_componentWillReceiveProps`。[关于此建议在此了解详情。](https://react.docschina.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes)

`UNSAFE_componentWillReceiveProps()`在装配了的组件接收到新属性前调用。若你需要更新状态响应属性改变（例如，重置它），你可能需对比`this.props`和`nextProps`并在该方法中使用`this.setState()`处理状态改变。

注意即使属性未有任何改变，React可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。这可能会发生在当父组件引起你的组件重渲。

在 [装配](https://react.docschina.org/docs/react-component.html#mounting)期间，React并不会调用带有初始属性的`UNSAFE_componentWillReceiveProps`方法。其仅会调用该方法如果某些组件的属性可能更新。调用`this.setState`通常不会触发`UNSAFE_componentWillReceiveProps`。

> 注意
>
> 这一生命周期之前叫做`componentWillReceiveProps`。这一名字在17版前都有效。可以使用[`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles)来自动更新你的组件。

------

### `shouldComponentUpdate()`

```
shouldComponentUpdate(nextProps, nextState)
```

使用`shouldComponentUpdate()`以让React知道当前状态或属性的改变是否不影响组件的输出。默认行为是在每一次状态的改变重渲，在大部分情况下你应该依赖于默认行为。

当接收到新属性或状态时，`shouldComponentUpdate()` 在渲染前被调用。默认为`true`。该方法并不会在初始化渲染或当使用`forceUpdate()`时被调用。

当他们状态改变时，返回`false` 并不能阻止子组件重渲。

当前，若`shouldComponentUpdate()`返回`false`，而后[`UNSAFE_componentWillUpdate()`](https://react.docschina.org/docs/react-component.html#componentwillupdate)，[`render()`](https://react.docschina.org/docs/react-component.html#render)， 和 [`componentDidUpdate()`](https://react.docschina.org/docs/react-component.html#componentdidupdate)将不会被调用。注意，在未来React可能会将`shouldComponentUpdate()`作为一个线索而不是一个严格指令，返回`false`可能仍然使得组件重渲。

在观察后，若你判定一个具体的组件很慢，你可能需要调整其从[`React.PureComponent`](https://react.docschina.org/docs/react-api.html#react.purecomponent)继承，其实现了带有浅属性和状态比较的`shouldComponentUpdate()`。若你确信想要手写，你可能需要用`this.props`和`nextProps`以及`this.state` 和 `nextState`比较，并返回`false`以告诉React更新可以被忽略。

------

### `UNSAFE_componentWillUpdate()`

```
UNSAFE_componentWillUpdate(nextProps, nextState)
```

当接收到新属性或状态时，`UNSAFE_componentWillUpdate()`为在渲染前被立即调用。在更新发生前，使用该方法是一次准备机会。该方法不会在初始化渲染时调用。

注意你不能在这调用`this.setState()`，若你需要更新状态响应属性的调整，使用[`getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops) 代替。

> 注意
>
> 这一生命周期之前叫做`componentWillUpdate`。这一名字在17版前都有效。可以使用[`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles)来自动更新你的组件。

> 注意
>
> 若[`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)返回false，`UNSAFE_componentWillUpdate()`将不会被调用。

------

### `getSnapshotBeforeUpdate()`

`getSnapshotBeforeUpdate()`在最新的渲染输出提交给DOM前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给`componentDidUpdate()`。

例如：

```
class ScrollingList extends React.Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the current height of the list so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.current.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (snapshot !== null) {
      this.listRef.current.scrollTop +=
        this.listRef.current.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```

在上面的例子中，为了支持异步渲染，在`getSnapshotBeforeUpdate` 中读取`scrollHeight`而不是`componentWillUpdate`，这点很重要。由于异步渲染，在“渲染”时期（如`componentWillUpdate`和`render`）和“提交”时期（如`getSnapshotBeforeUpdate`和`componentDidUpdate`）间可能会存在延迟。如果一个用户在这期间做了像改变浏览器尺寸的事，从`componentWillUpdate`中读出的`scrollHeight`值将是滞后的。

------

### `componentDidUpdate()`

```
componentDidUpdate(prevProps, prevState)
```

`componentDidUpdate()`会在更新发生后立即被调用。该方法并不会在初始化渲染时调用。

当组件被更新时，使用该方法是操作DOM的一次机会。这也是一个适合发送请求的地方，要是你对比了当前属性和之前属性（例如，如果属性没有改变那么请求也就没必要了）。

> 注意
>
> 若[`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)返回false，`componentDidUpdate()`将不会被调用。

------

### `componentWillUnmount()`

```
componentWillUnmount()
```

`componentWillUnmount()`在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在`componentDidMount`环节创建的DOM元素。

------

### `componentDidCatch()`

```
componentDidCatch(error, info)
```

错误边界是React组件，并不是损坏的组件树。错误边界捕捉发生在子组件树中任意地方的JavaScript错误，打印错误日志，并且显示回退的用户界面。错误边界捕捉渲染期间、在生命周期方法中和在它们之下整棵树的构造函数中的错误。

如果定义了这一生命周期方法，一个类组件将成为一个错误边界。在错误边界中调用`setState()`让你捕捉当前树之下未处理的JavaScript错误，并显示回退的用户界面。只使用错误边界来恢复异常，而不要尝试将它们用于控制流。

详情请见[*React 16中的错误处理*](https://react.docschina.org/blog/2017/07/26/error-handling-in-react-16.html)。

> 注意
>
> 错误边界只捕捉树中发生在它们**之下**组件里的错误。一个错误边界并不能捕捉它自己内部的错误。

------

### `setState()`

```
setState(updater, [callback])
```

`setState()`将需要处理的变化塞入（译者注：setState源码中将一个需要改变的变化存放到组件的state对象中，采用队列处理）组件的state对象中， 并告诉该组件及其子组件需要用更新的状态来重新渲染。这是用于响应事件处理和服务端响应的更新用户界面的主要方式。

将`setState()`认为是一次*请求*而不是一次立即执行更新组件的命令。为了更为可观的性能，React可能会推迟它，稍后会一次性更新这些组件。React不会保证在setState之后，能够立刻拿到改变的结果。

`setState()`不是立刻更新组件。其可能是批处理或推迟更新。这使得在调用`setState()`后立刻读取`this.state`的一个潜在陷阱。代替地，使用`componentDidUpdate`或一个`setState`回调（`setState(updater, callback)`），当中的每个方法都会保证在更新被应用之后触发。若你需要基于之前的状态来设置状态，阅读下面关于`updater`参数的介绍。

除非`shouldComponentUpdate()` 返回`false`，否则`setState()`永远都会导致重渲。若使用可变对象同时条件渲染逻辑无法在`shouldComponentUpdate()`中实现，仅当新状态不同于之前状态时调用`setState()`，将避免不必要的重渲。

第一个函数是带签名的`updater`函数：

```
(prevState, props) => stateChange
```

`prevState`是之前状态的引用。其不应该被直接改变。代替地，改变应该通过构建一个来自于`prevState` 和 `props`输入的新对象来表示。例如，假设我们想通过`props.step`在状态中增加一个值：

```
this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
});
```

updater函数接收到的`prevState` 和 `props`保证都是最新的。updater的输出是和`prevState`的浅合并。

`setState()`的第二个参数是一个可选地回调函数，其将会在`setState`执行完成同时组件被重渲之后执行。通常，对于这类逻辑，我们推荐使用`componentDidUpdate`。

你可以选择性地传递一个对象作为 `setState()`的第一个参数而不是一个函数：

```
setState(stateChange, [callback])
```

其仅是将`stateChange`浅合并到新状态中。例如，调整购物车中物品数量：

```
this.setState({quantity: 2})
```

这一形式的`setState()`也是异步的，并在相同的周期中多次调用可能会被合并到一起。例如，若你在相同的周期中尝试多次增加一件物品的数量，其等价于：

```
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

之后的调用在同一周期中将会重写之前调用的值，因此数量仅会被加一。若之后的状态依赖于之前的状态，我们推荐使用updater函数形式：

```
this.setState((prevState) => {
  return {counter: prevState.quantity + 1};
});
```

更多细节，查看[State & 生命周期指南](https://react.docschina.org/docs/state-and-lifecycle.html)。

------

### `forceUpdate()`

```
component.forceUpdate(callback)
```

默认情况，当你的组件或状态发生改变，你的组件将会重渲。若你的`render()`方法依赖其他数据，你可以通过调用`forceUpdate()`来告诉React组件需要重渲。

调用`forceUpdate()`将会导致组件的 `render()`方法被调用，并忽略`shouldComponentUpdate()`。这将会触发每一个子组件的生命周期方法，涵盖，每个子组件的`shouldComponentUpdate()` 方法。若当标签改变，React仅会更新DOM。

通常你应该尝试避免所有`forceUpdate()` 的用法并仅在`render()`函数里从`this.props`和`this.state`读取数据。

------

## 类属性

### `defaultProps`

`defaultProps`可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。例如：

```
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

若未设置`props.color`，其将被设置默认为`'blue'`:

```
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

若`props.color`设为null，则其值则为null：

```
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```

------

### `displayName`

`displayName`被用在调试信息中。JSX会自动设置该值；查看[深入JSX](https://react.docschina.org/docs/jsx-in-depth.html)。

------

## 实例属性

### `props`

`this.props`包含了组件该调用者定义的属性。查看[组件 & Props](https://react.docschina.org/docs/components-and-props.html)关于属性的介绍。

特别地，`this.props.children`是一个特别属性，其通常由JSX表达式中的子标签定义，而不是标签本身。

### `state`

状态是该组件的特定数据，其可能改变多次。状态由用户定义，且其应为纯JavaScript对象。

若你不在`render()`方法中使用它，其不应该该被放在状态上。例如，你可直接将timer IDs放在实例上。

查看[State & 生命周期](https://react.docschina.org/docs/state-and-lifecycle.html)了解更多关于状态的信息。

永远不要直接改变`this.state`，因为调用`setState()`会替换你之前做的改变。将`this.state`当成不可变的。

[编辑本页面](https://github.com/discountry/react/tree/master/content/docs/reference-react-component.md)