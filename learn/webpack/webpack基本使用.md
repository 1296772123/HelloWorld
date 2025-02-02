# webpack 基本使用

　　webpack是一款前端模块打包工具, 它的出现是由于现代web开发越来越复杂，如果还是像原来那样把所有的js代码都写到一个文件中，维护非常困难。而解决复杂化的方法通常是分而治之，就是把复杂化的东西进行拆分，形成一个个小的模块，这也是现代web 开发提出的模块化的概念，代码进行拆分，写成一个个小的模块，模块化方案又先后出现了commanjs ,amd, ES6 module方案， 但浏览器并不能直接支持这些方案，所以要把模块化的代码进行转换，转换成浏览器能识别的内容。webpack 就是做这个工作的，把多个小的模块化的文件打包成一个浏览器支持的文件，这应该是打包的由来吧。

　　使用webpack之前，先做一下准备工作，就是新建文件夹，以及用到的文件，这里要注意，使用webpack 时，我们的项目就是node项目了，对于任何一个node项目，都建议创建一个package.json文件，它主要是记录我们项目的信赖，以及用到的命令， 这里不明白也没关系，我们只要按照步骤做就可以了，用到的时候自然就会明白了。

　　 新建一个文件夹，就命名为webpack-learning吧，然后双击进入这个文件夹，在windows操作系统下，在文件夹中的任意位置，按住shift 键单击鼠标右键，打开cmd 命令窗口。按照规定，我们要创建package.json文件。在命令窗口中，输入npm init –y，就可以快速创建一个package.json 文件。再新建src和dist文件夹，index.html，src目录存放源代码，dist 目录存放打包后的代码. 在src 下新建index.js, mes.js. 简单项目结构如下：

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723170847752-552805852.png)

　　index.js, mes.js 就是两个不同的模块，简单来说，一个js 文件就是一个模块。wepback最先支持的commanjs 和amd 规范， 现在ES6 对模块化进了标准化，webpack2.0也直接支持它了。webpack 使用ES6 模块化方案的好处就是它的 Tree Shaking 功能，这个以后再说，我们先使用commonjs规范

　　mes.js　

```
module.exports = {
    hi: 'Hello world'
}
```

　　index.js

　var mes = require('./mes');

  document.body.innerHTML = mes.hi;

　　前面已经说了，index.js 不能直接使用，因为浏览器并不支持模块化方案。如果我们在index.html 中直接用script 标签引入index.js，浏览器就会报错。 这时就用到了webpack对这两个js 文件进行打包，打包成一个浏览器可以识别的文件，供我们在浏览器中使用。

　　使用webpack进行打包， 就要先安装webpack。webpack 的安装方式有两种：全局安装 和 本地安装。

　　1， 全局安装：在刚才打开的命令窗口中，输入 npm install webpack –g, 等待安装完成，

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723202900580-430519988.png)

　　安装完成后，就可以命令行中使用webpack 命令，命令行中输入 webpack src/index.js  dist/build.js ，它表示，对src中的index.js文件进行打包，输出到dist目录下的build.js 中。

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723203343518-1320319540.png)

　　打包完成后,可以看到dist目录下多了一个build.js文件，把这个文件引入到index.html文件中，

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723203745987-1067174740.png)

　　在本地打开index.html 可以看到Hello world 字样，表示打包成功。

　　2， 本地安装：本地安装使用的命令是npm install webpack --save-dev。 首先卸载全局安装的webpack, 卸载全局安装的webpack命令是npm uninstall webpack -g 

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723205343596-1356227922.png)

　　卸载完成后, 再输入npm install webpack --save-dev 进行本地安装， 安装完成后， 如果在命令窗口中输入webpack，报错了，没有这个指令，如下图片显示

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723205239127-400346139.png)

 　　但这时webpack-learning文件夹中多了一个node_modules文件夹，表示安装到了本地。因为在node 中，把任何东西安装到本地，它们都会安装到项目文件夹中的node_modules中，安装到本地的命令怎么用，npm script 命令。打开package.json 文件，找到scripts 字段，写入 "build": "webpack src/index.js dist/build.js" ，它原有的text 命令已经删掉

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723205910377-1022897193.png)

　　这样在命令行中输入npm run build也可以启用webpack 进行打包。

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723210015768-249250478.png)

　　dist目录下还是会有build.js 文件，用浏览器打开index.html, 还是可以看到Hello world, 证明打包成功。  

　　两种安装方式，到底该用哪一种，**推荐本地安装。**全局安装有一个版本管理问题， 如果我们的项目中，有的用webpack 1.0，有的用webpack2.0 ，而全局webpack 却只有一个命令，那就不好办了。本地安装却没有这个问题。If you are using npm scripts in your project, npm will try to look for webpack installation in your local modules for which this installation technique is useful. 当我们使用npm scripts 时，npm 会寻找本地安装的webpack ,这就解决版本问题， 每一个项目下都使用本地安装webpack , 互不影响。

　　**webpack 配置文件（webpack.config.js）**

　　webpack也提供了另外一种方式来完成打包工作，就是使用webpack的配置文件 webpack.config.js， 先了解一下配置文件中的两个概念：entry, output

- 　　entry 入口文件：webpack以哪个文件作为项目的入口， 就是webpack 打包的时候的从哪个文件开始。 相当于webpack 命令中 src/index.js 
- 　　output: webpack 打包完成后的文件放到什么地方。相当于webpack 命令中 dist/build.js 

　　现在用配置文件来完成上面的打包工作. 在webpack-learning文件夹下，新建一个js文件，命名为webpack.config.js， 这是wepback配置文件默认命名规则，也就是webpack进行打包的时候，它会自动寻找项目根目录中的webpack.config.js 文件，利用里面的规则进行打包。

 

　　var path = require('path');    // 引入path模块

 

　　module.exports = {

　　　　entry: path.join(__dirname,'src/index.js'),  // 指定入口文件，

　　　　output:{

　　　　　　path:path.join(__dirname,'dist'),        // 打包到哪个路径下，

　　　　　　filename:'build.js'　　　　　　　　　　　　　// 打包成功后的文件名称

　　　　}

　　}

 

　　![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723212721424-1856585836.png)

 

　　webpack2 建议我们使用 绝对路径，所以引入nodeJs 的path模块，主要用到了path.join方法, 它接受路径参数，然后合并成一个完整的路径。

　　这时npm scripts 中的 "build": "webpack src/index.js dist/build.js"  就要改成 "build": "webpack".  

 ![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723212910627-540394797.png)

　　这时在命令行中执行npm run build，同样可以完成打包。

　　三种打包方式，我们生成了三次build.js 文件，我们也不知道是哪一次生成哪一个文件，所以最好把以前生成的文件删除，保证每次打包完，都是最新的文件。当然，我们也不用每次都手动删除，我们可以使用rimraf 模块。rimraf 就是用来删除文件或文件夹. 首先要安装它, cnpm i rimraf --save-dev,  rimraf 安装到本地后,需要npm script 命令, “rimraf dist” 就可以删除 dist 目录. 修改“build”: “rimraf dist && webpack”  && 把两个命令连接起来，执行完前面的再执行后面的，依次从左向右执行, 这样我们每次执行build 命令都会先删除，再重新生成。

　　webpack配置文件默认命名为webpack.config.js， 我们能不能命名成其它的名称，如wepback.config.client.js， 这是可以的，但要使用一个命令行参数 --config指定我们使用的配置文件，否则webpack找不到配置文件。我们来试一试，先把webpack.config.js文件命名为webpack.config.client.js, 执行npm run build, 这时你会发现报错了。

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180117185308443-1384159937.png)

　　它说No configuration file found and no output filename configured via CLI option. A configuration file could be named 'webpack.config.js' in the current directory 没有找到配置文件，配置文件应该命名为webpack.config.js， 这也验证了webpack的配置文件默认命名为webpack.config.js. 这时我们用config 参数指定使用的配置文件。npm scripts build 进行如下修改

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180117191421021-1766358840.png)

　　执行npm run build 命令，打包成功了。有了 --config参数以后，我们就可以随意命名配置文件，也可以把配置文件放到任意位置。使用vue-cli 创建项目时，我们就看到它把所有配置文件都放到了build文件夹下，并且命名也有webpack.config.dev.js， webpack.config.pro.js 来区分生产和开发配置文件。当执行npm run dev 命令时，它就是使用--config 参数来指定它的配置文件，打开package.json看一下scripts字段就可以了。

　　4，webpack-dev-server 热更新和热替换。

　　 上面的打包方式，在项目开发中会遇到一个问题，就是每次修改代码后，如修改index.js文件的内容后，我们都要在命令行中输入npm run build, 然后等待打包完成，打包完成后，还要重新刷新浏览器才能看到效果。这非常麻烦，怎么解决这个问题，这要用到了webpack-dev-server.

　　webpack-dev-server 是 webpack自带的一个小型服务器，我们可以用服务器的方式访问html页面，每当有文件改动时，浏览器会自动刷新页面来反映我们做出的更改，这也就是所谓的liveload 或hotload. 首先 npm install webpack-dev-server --save-dev 安装它，

![img](https://images2015.cnblogs.com/blog/1013082/201707/1013082-20170723215926440-631857389.png)

　　然后在npm script 命令新建一个命令，"dev": "webpack-dev-server" ， 在这里，我把wepback的配置文件名称重新改回了webpack.config.js， 所以不用--config指定配置文件

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180117204739756-1066121937.png)

　　这时，在命令行中输入npm run dev 启动服务器，在浏览器地址栏器输入localhost:8080, 页面中显示hello World, 但是当我们改变mes.js中的Hello World 为Hello时，浏览器的内容并没有发生变化，和我们预想的不一样。这是 怎么回事? 原来是因为执行过npm run build 命令，dist文件夹中有build.js 文件，我们的html 文件是引用这个文件，把dist 目录删除，然后浏览器刷新，什么都没有，打开控制台，可以看到报错了，找不到build.js文件。

![img](https://images2015.cnblogs.com/blog/1013082/201705/1013082-20170514215729097-44600592.png)

　　这是因为启动webpack-dev-server 时，它也会进行打包，只不过它是把打包成功后的文件放到内存中，而不是放到硬盘中，那它放到内存的什么地方呢? 我们必须知道打包后的build.js 放到什么地方，因为我们的html 文件中要进行引入，script 标签中src就是指向build.js文件地址。 我们再看一个启动webpack-dev-server  时发生了什么? 当输入npm run dev 时，我们看到

![img](https://images2015.cnblogs.com/blog/1013082/201705/1013082-20170514221157144-932856731.png)

　　Project is running at <http://localhost:8080/> 整个项目运行在localhost:8080下。这也就是我们在浏览器中输入localhost:8080的原因。

　　webpack output is served from /： 通过这一句我们才知道，webpack-dev-server  默认把打包后的文件放到了根目录下，在服务器中，/ 表示的就是根目录。那我们在 src 引入路径的时候，src= ‘bulid.js’ 就可以了。修改index.html 中 script 的src 为 src="build.js", 修改之后，浏览器刷新，可以看到hello World, 这时再更改mes.js中的 hello World 为 hello ,浏览器自动刷新，显示hello，成功了。

　　但这里有一个问题，当执行npm run build 时，dist 目录下会生成一个build.js, 本地打开index.html 又要引入这个文件，需要对html 中的js 路径进行修改为src="dist /build.js", 这样两种状况下要来回切换, 不利于开发，这两种不同的状态,可以理解为, 一个是开发环境,一个是生产环境.  dev 状态下是开发环境, build  是生产环境. 有没有办法让它们统一起来? 有，那就是output 中另外一个重要的配置 publicPath, 在服务器开发时，所有的静态资源如css, js，image都叫公共资源，都会放到一个叫public的文件夹下，publicPath，我想就是指定静态资源的存放位置。既然我们的生产环境是用 dist/build.js, 它请求的是服务器端dist目录下的资源，所以publicPath 配置成 '/dist/' 就可以了。这里只要记住：保证output 中的publicPath 和path 路径一致，就可以了。

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180117215628881-119775.png)

　　比热更新更为高级的就是热替换HRM,  当文件内容发生变化时，不用刷新整个页面，只是把变化的部分替换掉。当然它的配置有点小麻烦，不过就是按步骤就可以了。

　　首先，它利用webpack-dev-server和 webpack.config.js 配置文件生成一个服务器，在webpack-learning文件夹下， 就是项目根目录下新建一个dev-server.js 文件，代码如下：

 

```
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
/*
option 就是对server 服务器的配置， 
1， 一定要配置hot: true，因为是它开启的热替换
2， publicPath, filename 的配置是保证要和我们html中的src 引用中的保持一致 因为html中
    script 中的引用是scr='dist/build'
*/
var options = {
  hot: true,
  publicPath: config.output.publicPath,
  filename: config.output.filename,
  stats: {
    colors: true
  }
};
var compiler = webpack(config);
var server = new webpackDevServer(compiler, options);

server.listen(8080, 'localhost', () => {
  console.log('dev server listening on port 8080');
});
```

 

　　其次， 修改webpack.config.js 配置文件，

　　一个是对入口文件进行配置，它变成了一个数组，加上了webpack-dev-server 入口

```
entry: [
        path.join(__dirname, 'src/index.js'),
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
      ],  
```

　　　一个是要添加一个webpack自带的插件 HotModuleReplacementPlugin， 所以整个配置文件修改如下：

 

```
var path = require('path');   
var webpack = require('webpack');  // 要使用webpack的插件，所以要引入webpack

module.exports = {
    entry: [                      // 入口文件加入webpack-dev-server入口
        path.join(__dirname, 'src/index.js'),
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
      ], 
    output: {
        path: path.join(__dirname, 'dist'),       
        filename: 'build.js',　　　　　　　　　
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()  // 添加热替换插件
    ]
}
```

 

　　最后修改index.js ，就是我们整个项目的入口文件，它接受热替换

 

```
var mes = require('./mes')
document.body.innerHTML = mes.hi;

 if (module.hot) {  // 接受热替换
        module.hot.accept();
}
```

 

　　这时还要把npm scripts 的build 命令修改成node dev-server.js

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180118103028131-1816303424.png)

　　在命令窗口输入npm run dev 重新启动服务器,   修改mes.js文件的内容，页面内容实时变化，但没有刷新页面，可以看到配置成功了。 

　　**设置环境变量**

　　配置完成后，又引发另外一个问题，当你使用npm run build 打包时，打包到的build.js 有300K 之多，而我们只写了两个js文件，都不到1k, 这是怎么回事? 因为打包的时候，把热替换的代码也打包到里面去了，显然，这是我们不想要的，因为热替换只有在开发环境下使用。 解决方法就是配置环境变量，根据不同的环境变量，使用不同的配置文件。

　　配置环境变量最简单的方法，就是直接在命令行中设置参数，你可能见到过 直接让NODE_ENV 等于一个值，如 "build": "NODE_ENV=pro rimraf dist && webpack",  这时执行npm run build 发现报错了, NODE_ENV 不是一个内部或外部命令。 我刚开始学习的时候，也碰到了这个问题，明明是和别人的代码一样，为什么就是报错呢? 原来这样的设置在mac 系统下是有效的，而在windows下无效，而在windows 系统下，应该使用set 命令 "build": "set NODE_ENV=pro rimraf dist && webpack", 这时执行npm run build 可以看到打包成功。为了屏蔽掉操作系统的差别，我们要可以使用一个cross-env的包，npm install cross-env --save-dev 安装它, package.json中scripts字段修改如下：

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180118113655881-906482696.png)

　　我们给build 命令设置环境变量NODE_ENV 是production, 而dev 设置的是development. 在代码中怎么获取这些环境变量，这要用到node 的process 模块，process.env.NODE_ENV 就可以获取到了。

　　这里还要注意一点，NODE_ENV=development 中间不能有空格，如果写成NODE_ENV = development, 就成了三个命令了:  NODE_ENV 是一个命令，= 是一个命令，development也是一个命令，执行npm run build 同样会报错: NODE_ENV 不是一个内部命令

 　　这时我们获取到环境变量，就可以对wepack.config.js 进行修改，不同的环境下，用不同的配置内容。

 

```
var path = require('path');   
var webpack = require('webpack'); 

var DEV = process.env.NODE_ENV === 'development';  // 判断开发环境
var PRO = process.env.NODE_ENV === 'production';

// 根据不同的环境，执行不同的入口文件
// dev 环境下 执行webpack-dev-server入口
var entry = DEV
    ? [                     
        path.join(__dirname, 'src/index.js'),
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
      ]
    : [path.join(__dirname, 'src/index.js')];

// dev 下配置不同的插件
var plugins = DEV
        ?  [
            new webpack.HotModuleReplacementPlugin()
           ]
        : []
module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),       
        filename: 'build.js',　　　　　　　　　
        publicPath: '/dist/'
    },
    plugins: plugins
}
```

 

　　现在再执行npm run build， 打包后的js代码只有2kb. 执行npm run dev, 热替换依然在起作用，完美了。

　　**使用webpack 的强大的loaders 来处理不同的资源。**

　　webpack 把所有的资源都当做模块，对模块的解析都要用到loader(模块加载器)。指定哪个loader对哪些文件解析是在配置文件中完成，它有一个module 字段，里面就是定义规则的。我们写一个loader 就明白了。现在开发中我们都会用到ES6+ 的语法，然而浏览器不支持，那就用loader 给它编译成ES5, ES6+ 的语法转化成ES5的语法要用到babel loader。

　　使用任何loader之前，都要先安装它。npm install babel-loader babel-core babel-preset-es2015 --save-dev 安装babel-loader, 更新 webpack.config.js 文件

 

```
module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),       
        filename: 'build.js',　　　　　　　　　
        publicPath: '/dist/'
    },
    module: {
      rules: [
          {
              test: /\.js$/, // 这里一定不要用引号把它包括起来，写成'/\.js$/' 
              loader: 'babel-loader',
              include: path.join(__dirname, 'src'),
              exclude: path.join(__dirname, 'node_modules')
          }
      ]  
    },
    plugins: plugins
}
```

 

　　module: 定义打包规则，webpack2 用的是rules 来指定规则，它是一个数组，里面是每一个对象，对不同的文件指定不同的规则。

　　　　test:它是一个正则表达式，表示对哪种类型文件应用这个loader。这里一定不要用引号把它包括起来，写成'/\.js$/'， 如果写成这样，永远不会匹配，代码也就不会做任何转化。

　　　　loader: 指定具体的loaders, 注意，webpack2 中 babel-loader 后面的 -loader 字符最好不要省略。

　　　　include: 它是一个文件夹，或一个数组（包含多个文件夹）， 就是对哪个或哪些文件夹中的js文件执行该loader。

　　　　exclude:  它也是一个文件夹或一个数组(包含多个文件夹)，它是对哪个或哪些文件夹中的js文件不执行该loader。

　　 使用babel 进行转换之前，还要新建一个.babelrc的文件，告诉babel 用什么规则进行编译。在项目根目录中，新建.babelrc

```
{
    "presets": [
        "es2015"
    ]
}
```

　　好了，配置完成后，我们在index.js 中写一点ES6的代码(箭头函数)，体验一下

 

```
var mes = require('./mes')

var newMessage = () => (`<p>${mes.hi}<p>`)
document.body.innerHTML = newMessage();

 if (module.hot) {  // 接受热替换
        module.hot.accept();
}
```

 

　　npm run build, 打包完成后，我们可以看到 生成的build.js文件中箭头函数转化为普通函数

```
var newMessage = function newMessage() {
  return '<p>' + mes.hi + '<p>';
};
```

　　 在开发过程还有一个问题要解决，代码的错误查找。如果代码有错误，我们要知道代码在什么地方出错的。现在webpack-dev-server启动服务器，我们把所有的js代码都打包到一个build.js文件中，我们根本不知道，报错在源代码中的什么位置。这就要用到source-map了，压缩后的代码对应到源代码中。这个只要在配置文件中添加devtools 配置项就可以了。

 

```
module.exports = {
    devtool:'source-map',  // 添加source-map，有利于错误排查
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),       
        filename: 'build.js',　　　　　　　　　
        publicPath: '/dist/'
    },
.........
```

 

　　这时npm run dev 重新启动服务器，打开浏览器控制台的source面板，你会发现，它多了一个wepback// 

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180118164831693-263790269.png)

　　在上面双击，或点击左边的小箭头进行展开，可以看到3个文件夹，点击中间的. 文件夹，可以发现src目录，里面就是我们的源代码。这时，我们在index.js中加入debugger; 或console.log() 语句，你就会发现，它指向是源代码中文件，而不是打包后的build.js。测试一下

　　我们在mes.js中写入console.log(1)

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180118172926896-1573124661.png)

　　然后在webpack.config.js中把 devtools: source-map 注释掉

 ![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180118173018459-2128423224.png)

　　npm run dev 启动服务器，打开控制台, 你可以所有内容指向的是打包后的build.js

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180118174044724-1797887232.png)

 

 　　现在把wepback.config.js 中的devtool： 'source-map' 解注, 再重新启动服务器。配置文件只要有变动，就要重新启动服务器。在控制台中可以看到 1 指向了mes.js

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180118174409115-1121546531.png)

　　点击mes.js ，就会跳转到mes.js 源文件。

　　**利用loader 处理样式**

　　在web开发中，肯定少不了写css, css 作为一种资源，也要有相对loader进行解析，有的还会用sass 来写样式, 那还需要把sass 转换成css. 这时需要安装sass-loader, css-loader, style-loader， sass-loader 还要依赖node-sass,   npm install sass-loader node-sass css-loader  style-loader --save-dev   css-loader 处理的是css文件中的url import 等等， style-loader 是把样式插入html 文件中style 标签中，内嵌样式。配置文件为如下， 这里只是更改module 下的内容，增加css loader

　　对于多个loader 去处理 一个文件时，它用的是use 来指定规则，处理顺序就从右向左。 先使用sass-loader, 把sass 文件转换成 css 文件，所以sass 放在最右边，然后把转换好的css 文件中的url 进行处理，css 放到sass 的左边， 最后把css 样式放入到html 元素中，那就是style-loader, 它放到最左边。

　　**利用loader 处理图片**

　　当然 还有一个常用的 loader 叫url-loader, 处理图片，文字等等， 比如把图片变成转成base64编码的, 这样就可以减少http请求数量。当然也不是所有图片都要转化成base 64 一般都是小于10kb 的图片进行转换，否则，会增大css 文件的大小。这需要options 对这个loader 进行配置。

 

```
 {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
　　　　　　name: "img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
```

 

 　　webpack的基本配置差不多了，我们再使用几个有用的插件。

　　1，UglifyJsPlugin 插件，webpack 中的Tree Shaking 用到它。webpack2中最大的变化就是它原生支持ES6模块化方案，并且由此带来了Tree Shaking 功能。 我们重写一下mes.js

 

```
export function add(a, b) {
    return a + b;
}
export function substract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b 
}
```

 

　　再重新写一下index.js文件

 

```
import {multiply} from './mes'

const newMessage = () => (multiply(3, 4));
document.body.innerHTML = newMessage();

if (module.hot) {  // 接受热替换
        module.hot.accept();
}
```

 

　　可以看到程序正常运行，但是在index.js中，我们只用到了multiply函数，所以打包后的文件中， 我们只想包含multiply 函数，而不用包含其它两个add, substract 函数，这就是tree shaking. Tree shaking 的前提是ES6 的模块化方案。而在webpack1 时，  由于它不支持ES6, 所以webpack 会利用babel 把ES6 转换成commonJs，但现在webpack2中原生支持ES6 的import 和export， 也正是由于ES6 module, 它支持Tree Shaking, 所以我们不想让babel 把ES6 的import 和export  转换成commonJs， 这时需要配置 .babelrc 文件，给es2015 设置为modules: false. 

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180119101615724-2042014249.png)

　　只要设定modules: false, babel 遇见import 和 export 就不会转化成commonjs. 

　　现在执行npm run build进行打包, 打开build.js, 你会发现下面的内容,它把 add和 substract 标住了unused, 没有用到这两个函数.

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180119102612646-919507793.png)

　　既然没有用到这两个函数，那就要把它们从打包后文件中去掉，这用到了webpack 另外一个插件，UglifyJsPlugin， 我们在webpack.config.js 配置一下，由于是插件，并且只在生产环境中使用，我们只要修改一下plugins 就可以了。

![img](https://images2017.cnblogs.com/blog/1013082/201801/1013082-20180119173627178-2036556099.png)

　　npm run build 重新打包，可以看到build.js中只有multiply() 函数。

　　2. DefinePlugin插件， 当我们执行npm run 命令的时候，它会暴露一些全局变量供我们自己的代码使用，这些全局变量是我们自己定义的，而且我们想定义多少就定义多少。

　　定义的方式非常简单，就是给DefinePlugin 传递一个对象参数，使用也是简单，直接使用对象的属性，获取的是对象属性的值，最有用的是设置环境变量参数，因为我们自己写的代码也是有的在生产环境使用，有的在测试环境使用，比如在生产环境中，每次都会调用登陆弹窗，在开发的时候却不需要。直接在上面的代码下面加上

plugins.push(new webpack.DefinePlugin({

 

   'env': JSON.stringify(process.env.NODE_ENV)

 

}))

　　当执行npm run 命令时，它就会暴露一个全局变量 ’env‘, 供我们的代码使用，而它的值就是 我们定义的JSON.stringify(process.env.NODE_ENV)。 在index.js中直接使用env

 

```
import {multiply} from './mes'

// 从webpack.config.js中的DefinePlugin获取环境变量 env
const envValue = env;
const newMessage = () => (multiply(3, 5));
document.body.innerHTML = '现在所在的环境是' + envValue;

if (module.hot) {  // 接受热替换
        module.hot.accept();
}
```

 

　　当执行npm run dev，重新启动服务器的时候，你可看到页面上显示是developement, 和我们预想的一样，那么我们就可以利用env 进行判断，如果它是生产环境，如果它是测试。

你可能使用过axios库发送ajax请求，当在不同的环境时请求的地址不一致，这时就可以使用环境变量进行基本url配置

 

```
// 如果是开发环境，则向103.168.2.17 发送请求，如果生产环境，则使用''
if (env === 'development') {
    axios.defaults.baseURL = '103.168.2.17'; 
} else {
    axios.defaults.baseURL = ''
}
```
