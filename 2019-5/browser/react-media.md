# react-media

[`react-media`](https://www.npmjs.com/package/react-media) is a CSS media query component for React.

A `<Media>` component listens for matches to a [CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries) and renders stuff based on whether the query matches or not.

## Installation

Using npm:

```
$ npm install --save react-media
```

Then, use as you would anything else:

```
// using ES modules
import Media from "react-media";
 
// using CommonJS modules
var Media = require("react-media");
```

The UMD build is also available on [unpkg](https://unpkg.com/):

```
<script src="https://unpkg.com/react-media/umd/react-media.min.js"></script>
```

You can find the library on `window.ReactMedia`.

## Usage

Render a `<Media>` component with a `query` prop whose value is a valid [CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries). The `children` prop should be a function whose only argument will be a boolean flag that indicates whether the media query matches or not.

```
import React from "react";
import Media from "react-media";
 
class App extends React.Component {
  render() {
    return (
      <div>
        <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
              <p>The document is less than 600px wide.</p>
            ) : (
              <p>The document is at least 600px wide.</p>
            )
          }
        </Media>
      </div>
    );
  }
}
```

If you render a `<Media>` component on the server, it will match by default. You can override the default behavior by setting the `defaultMatches` prop, see [below](https://www.npmjs.com/package/react-media#defaultmatches-prop-for-server-side-rendering) for details.

If you use a regular React element as `children` (i.e. `<Media><SomethingHere/></Media>`) it will be rendered if the query matches. However, *you may end up creating a bunch of elements that won't ever actually be rendered to the page* (i.e. you'll do a lot of unnecessary `createElement`s on each `render`). Thus, a `children` **function** (i.e. `<Media>{matches => ...}</Media>`) is the preferred API. Then you can decide in the callback which elements to create based on the result of the query.

For the common case of "only render something when the media query matches", you can use a `render` prop that is only called if the query matches.

```
import React from "react";
import Media from "react-media";
 
class App extends React.Component {
  render() {
    return (
      <div>
        <Media
          query="(max-width: 599px)"
          render={() => <p>The document is less than 600px wide.</p>}
        />
      </div>
    );
  }
}
```

The `render` prop is never called if the query does not match.

`<Media query>` also accepts an object, similar to [React's built-in support for inline style objects](https://facebook.github.io/react/tips/inline-styles.html) in e.g. `<div style>`. These objects are converted to CSS media queries via [json2mq](https://github.com/akiran/json2mq/blob/master/README.md#usage).

```
import React from "react";
import Media from "react-media";
 
class App extends React.Component {
  render() {
    return (
      <div>
        <Media query={{ maxWidth: 599 }}>
          {matches =>
            matches ? (
              <p>The document is less than 600px wide.</p>
            ) : (
              <p>The document is at least 600px wide.</p>
            )
          }
        </Media>
      </div>
    );
  }
}
```

Keys of media query objects are camel-cased and numeric values automatically get the `px`suffix. See the [json2mq docs](https://github.com/akiran/json2mq/blob/master/README.md#usage) for more examples of queries you can construct using objects.

An optional `targetWindow` prop can be specified if you want the `query` to be evaluated against a different window object than the one the code is running in. This can be useful for example if you are rendering part of your component tree to an iframe or [a popup window](https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202).

There is also an optional `onChange` prop, which is a callback function that will be invoked when the status of the media query changes. This can be useful if you need to do some imperative stuff in addition to the declarative approach `react-media` already provides.

```
import React from "react";
import Media from "react-media";
 
class App extends React.Component {
  render() {
    return (
      <div>
        <Media
          query="(max-width: 599px)"
          onChange={matches =>
            matches
              ? alert("The document is less than 600px wide.")
              : alert("The document is at least 600px wide.")
          }
        />
      </div>
    );
  }
}
```

If you're curious about how react-media differs from [react-responsive](https://github.com/contra/react-responsive), please see [this comment](https://github.com/ReactTraining/react-media/issues/70#issuecomment-347774260).

Enjoy!

### `defaultMatches` prop for server-side rendering

This component comes with a `defaultMatches` prop and its default is set to true.

When rendering on the server you can use the `defaultMatches` prop to set the initial state on the server to match whatever you think it will be on the client. You can detect the user's device by analyzing the user-agent string from the HTTP request in your server-side rendering code.

```
initialState = {
  device: 'mobile' // add your own guessing logic here
};
 
<div>
  <Media query="(max-width: 500px)" defaultMatches={state.device === 'mobile'} render={() => (
    <Text>Render me below medium breakpoint.</Text>
  )}/>
 
  <Media query="(min-width: 501px)" defaultMatches={state.device === 'desktop'} render={() => (
    <Text>Render me above medium breakpoint.</Text>
  )}/>
</div>
```

## About

`react-media` is developed and maintained by [React Training](https://reacttraining.com/). If you're interested in learning more about what React can do for your company, please [get in touch](mailto:hello@reacttraining.com)!