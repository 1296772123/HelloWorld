# Token 介绍

Token 对于计算机网络请求很重要，简单理解，token就是验证用户的一个钥匙（类似身份证号码）。

运行机制：当用户登录时，需要提交用户名和密码等信息。此时通过验证，服务器就返回一个token作为验证。以后用户进行数据请求等操作，只需要将token放入请求中，不需要每次提交用户名和密码进行验证。那么token需要注意下面几个问题：

### Token 应该保存起来（放到本地的session storage 或者 cookies）

在SPA单页网页中，客户刷新浏览器后会带来一些token问题。解决方法：把 token 保存到起来：[放到 session storage, local storage 或者是客户端的 cookie 里](https://github.com/auth0/angular-token-auth/blob/master/auth.client.js#L31)。如果当前浏览器不支持 session storage 时，应该转存到 cookies 里。

如果你想“我把 token 保存到 cookie ，不就跟以前没有任何分别？”。可是在这种情况下你只是把 cookie 当作一个储存机制，而不是一种[验证机制](http://sitr.us/2011/08/26/cookies-are-bad-for-you.html)。（比如说，这个 cookie 不会被 Web 框架用于用户验证，所以没有 XSRF 攻击的危险）。

### Tokens 具有有效期

Tokens 应该有一个有效期，否则只要登录过一次，就可以永远地通过 API 的验证。Cookies 基于同样的原理，也有一个有效期。

在 Cookies 的使用中，有不同的选项可以控制 cookie 的生命周期。而在 tokens 的使用中，一旦 token 过期，只需要重新获取一个。你可以使用一个接口去刷新 token。你甚至可以把 token 原来的发布时间也保存起来。如果你需要撤回 tokens（当 token 的生存期比较长的时候这很有必要）那么你需要一个 token 的生成管理器去作检查。

### Local / session storage 不会跨域工作，请使用一个标记 cookie

如果你设置一个 cookie 的域名为 .yourdomain.com 它将可以被 youdomain.com 和 app.yourdomain.com 获取，这样用户登录并且转到 app.yourdomain.com 后也能很容易地从主域名找回这个 cookie（假如你的是电商网站）。

而另一方面，保存在 local / session storage 的 tokens，就不能从不同的域名中读取（甚至是子域名也不行）。那你能怎么做？

一个可能的选择是，当用户通过 app.yourdomain.com 上面的验证时你生成一个 token 并且作为一个 cookie 保存到 .yourdomain.com。

然后，在 youromdain.com 中你可以检查这个 cookie 是不是已经存在了，并且如果存在的话就转到 app.youromdain.com去。从这以后，这个 token 将会对程序的子域名以及之后通常的流程都有效（直到这个 token 超过有效期）。

不过这将会导致 cookie 存在但 token 被删除了或其他意外情况的发生。在这种情况下，用户将不得不重新登录。但重要的是，像我们之前说的，我们不会这个用 cookie 作为验证方法，只是作为一个存储机制去支持存储信息在不同的域名中。

### 每个 CORS（跨域资源共享）请求都会带上预请求（Preflight request）

有些人指出 Authorization header 不是一个[simple header](http://www.w3.org/TR/cors/)，因此对于一个特定的 URLs 的所有请求都会带上一个预请求。

但这只会发生在你发送 Content-Type: application/json 时。不过这说明已经出现在绝大多数的程序中了。

一个小小的警告，the OPTIONS 请求不会带有 Authorization header 自身，所以你的网络框架应该支持区别对待 OPTISON 和后来的请求。（微软的 IIS 因为某些原因好像会有问题）。

### 当你需要流传送某些东西，请用 token 去获取一个已签名的请求。

当使用 cookies 时，你可以很容易开始一个文件的下载或流传送内容。然而，在 tokens 的使用中，请求是通过 XHR 完成的，你不能依赖于它。而解决方法应该是像 AWS 那样通过生成一个签名了的请求，例如，Hawk Bewits 是一个很好的框架去启用它：这个 ticket 是无状态并且是基于 URL 的：host + path + query + headers + timestamp + HMAC，并且有一个有效期。所以它可以用于像只能在5分钟内去下载一个文件。

###  [XSS](http://baike.baidu.com/view/50325.htm) 比 [XSRF](http://baike.baidu.com/view/1609487.htm) 要更容易防范

XSS 攻击的原理是，攻击者插入一段可执行的 JavaScripts 脚本，该脚本会读出用户浏览器的 cookies 并将它传输给攻击者，攻击者得到用户的 Cookies 后，即可冒充用户。但是要防范 XSS 也很简单，在写入 cookies 时，将 HttpOnly 设置为 true，客户端 JavaScripts 就无法读取该 cookies 的值，就可以有效防范 XSS 攻击。因为 Tokens 也是储存在本地的 session storage 或者是客户端的 cookies 中，也是会受到 XSS 攻击。所以在使用 tokens 的时候，必须要考虑过期机制，不然攻击者就可以永久持有受害用户帐号。

相比 XSS，XSRF 的危害性更大，因为大多数 Web 框架都已经内置了 XSS 防范机制（例如在 Ruby on Rails 中，用户的输入在输出的时候都会做转义操作，攻击者插入的脚本就无法执行），对于大部分开发者而言，甚至连 XSRF 都不知道是什么玩意，更别提防范了。XSRF 目前并不是每个 Web 框架都有防范机制，因此开发者更应该留意 XSRF 。

### 注意 token 的大小

**Token 机制在每次请求 API 的时候，都需要带上一个** **Authorization** **的 Http Header 。**这一点很重要。

Token 的大小其实由你储存在 token 中的信息量所决定，例如可能有 nickname，openid 等开发者另外加上的信息。

但是 session cookies 机制只需要一个字串作为用户标识即可（例如 PHP 的 PHPSESSIONID），其中关于用户的信息都会直接储存到服务端的数据库中，当用户请求时才从数据库中捞出来用。

当然 Token 机制也可以仿照 session cookies 机制这么做了，也是个有效控制 token 大小的方法。

Token 中只保留关键的几条身份标识信息，其余都放到数据库里面了，权限控制的时候再捞出。这样做的好处是，开发者可以完全掌控 token，因为关键信息都已经是你代码和数据库中的一部分了。

另外值得一提的是，你也可以把东西都丢 Cookies 里面（而不是只丢个身份标识字串）。只要确保资料经过了严格的加密，攻击者无法利用，现在有些 Web 框架已经有类似机制，例如 Nodejs 的这个插件 [mozilla/node-client-sessions](https://github.com/mozilla/node-client-sessions)。

### 有需要的话，要加密并且签名 token

虽然 TLS/SSL 机制可以隔绝大多数中间人攻击，但是如果 token 中带有了用户的敏感信息，开发者也应该要加密这些信息。

使用 JWT（文中第 9 点） 可以加密 token，但是由于目前大多数 Web 框架还未支持 JWT，所以可以使用 AES-CBC 算法加密 token。当然可以用文中的第 7 点，直接将敏感信息丢数据库中。

### 将 JSON Web Tokens 应用到 OAuth 2

OAuth 2 是一个解决身份验证的授权协议，并且广泛地使用了 token 。

用户通过 OAuth 2 协议授权第三方应用权限，然后服务器返回一个 access_token 给第三方应用，通常也带有 scope 参数，第三方应用通过带上 access_token 请求服务器，可以在授权范围（scope）内调用 API。

一般来说，类似这种 token 是不透明的，就是核心数据都储存以 hash-table 结果储存在服务器中，客户端只持有一个令牌（access_token），任何人都可以用这个令牌在授权范围（scope）内调用服务器端的 API。

Signed tokens（例如 [JWT](http://jwt.io/))）和这种形式的 token 最主要的区别是，JWT 是无状态的，它不储存在服务端 hash-table 中，服务端中不保留 JWT 请求的相关信息，JWT 会把授权信息和 API 调用返回都丢一起返回给客户端。

JWT 通常以 Base64 + AES 方式编码传输。OAuth 2 协议也支持 JWT，因为 OAuth 2 并未限制 access_token 数据格式，你可以将 JWT 应用在 OAuth 2 上。

### Tokens 不是万能的解决方法，得根据你的需求自行采用

这些年来，我们帮助过不少大企业实现了他们的以 Token 为基础的验证授权架构。曾经有一家 10k + 员工，有着大量数据的企业，他们想实现一个中央权限管理系统，其中有一个需要是某个员工只能读取某个国家某个医院某个床位的id和name字段数据，想想这样的细粒度的权限管理是多么难实现，无论是技术上还是行政上。

当然采用 tokens 与否，得看具体需求，但是，要忠告是，不要什么内容都写到 tokens 了，加之前想想有没有这个必要。

