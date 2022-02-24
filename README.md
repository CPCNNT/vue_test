# 笔记

## CLI 文件结构

  ```text
  vue_test
  ├── babel.config.js
  ├── package-lock.json  包版本控制文件
  ├── package.json  应用包配置文件
  ├── public
  │   ├── favicon.ico  页签图标
  │   └── index.html  主页面
  ├── README.md  应用描述文档
  ├── src  
  │   ├── App.vue  汇总所有组件
  │   ├── assets  存放静态资源
  │   │   └── logo.png
  │   ├── components  存放组件
  │   │   ├── School.vue
  │   │   └── Student.vue
  │   └── main.js  入口文件
  └── vue.config.js  CLI配置文件
  ```

<br />

## 关于不同版本的 Vue

- vue.js 与 vue.runtime.xxx.js 的区别：
  - vue.js 是完整版的 Vue，包括：核心功能 + 模板解析器。
  - vue.runtime.xxx.js 是运行版本的 Vue，只包含核心功能，没有模板解析器。

- 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，而需要使用 render 配置项，如：`render: h => h(App)`。

<br />

## vue.config.js 配置文件

> 使用如下命令可以查看到 Vue-CLI 的默认配置。

```bash
$ vue inspect > output.js
```

> 使用 vue.config.js 可以对脚手架进行个性化定制，详情见：[https://cli.vuejs.org/zh](https://cli.vuejs.org/zh)。

<br />

## ref 属性

1. 被用来给元素或子组件注册引用信息（id 的替代者）。
2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象。
3. 使用方式：
    - 打标识：`<h1 ref="xxx">...</h1>` 或 `<School ref="xxx"><School/>`
    - 获取：`this.$refs.xxx`

<br />

## 配置项 props

- 功能：让组件接收外部传入的数据。
  1. 传递数据：`<Demo name="xxx"/>`
  2. 接收数据：
      - 第一种方式（只接收）：`props: ['name', 'age']`
      - 第二种方式（限制类型）：

        ```js
        props: {
          name: String,
          age: Number
        }
        ```

      - 第三种方式（限制类型+限制必要性+指定默认值）：

        ```js
        props: {
          name: {
            type: String,  // 类型
            required: true  // 必要性
          },
          age: {
            type: Number,
            default: 18  // 默认值
          }
        }   
        ```

- 备注：props 是只读的，Vue 底层会监测对 props 的修改，如果修改，则会发出警告，但是修改对象的属性时，props 无法监测到。如果业务需求更改，可以复制 props 的内容到 data 中一份，然后去修改 data 中的数据。

<br />

## mixin（混入）

- 功能：可以把多个组件共用的配置提取成一个混入对象。
- 使用方式：
  1. 第一步定义混合，例如：

      ```javascript {.line-numbers}
      export const mixin = {
        ...
        data() {
          return {
            ...
          } 
        },
        methods: {
          ... 
        }
      }
      ```

  2. 第二步使用混合，例如：
      - 引入：`import {mixin} from './mixin.js'`
      - 全局混入：`Vue.mixin(xxx)`
      - 局部混入：`mixins: ['xxx', 'yyy']`

<br />

## 插件

- 功能：用于增强 Vue。
- 本质：包含 `install` 方法的一个对象，`install` 的第一个参数是 `Vue`，第二个以后的参数是插件使用者传递的数据。
- 定义插件：

  ```js
  export default {
    install(Vue, options) {
      // 全局过滤器
      Vue.filter(...)

      // 全局自定义指令
      Vue.directive(...)

      // 配置全局 mixin
      Vue.mixin(...)

      // 给Vue原型上添加一个方法，vm与vc就都能用了
      Vue.prototype.myMethod = function () {...}
      Vue.prototype.myProperty = xxx   
    }
  }
  ```

- 使用插件：

  ```js
  import plugins form './plugins.js'

  Vue.use(plugins)
  ```

<br />

## scoped 样式

- 作用：让样式在局部生效，防止冲突。
- 写法：`<style scoped></style>`

<br />

## 总结TodoList案例

1. 组件化编码流程：

    （1）拆分静态组件：组件要按照功能点拆分，命名不要与 html 元素冲突。

    （2）实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
      - 一个组件在用：放在组件自身即可
      - 一些组件在用：放在他们共同的父组件上（<span style="color: red">状态提升</span>）

    （3）实现交互：从绑定事件开始。

2. props 适用于：

    （1）父组件 ==> 子组件 通信

    （2）子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用 v-model 时要切记：v-model 绑定的值不能是 props 传过来的值，因为 props 是不可以修改的！

4. props 传过来的若是对象类型的值，修改对象中的属性时 Vue 不会报错，但不推荐这样做。

<br />

## webStorage
1. 存储内容大小一般支持5MB左右（不同浏览器可能不一样）。

2. 浏览器端通过 `window.sessionStorage` 和 `window.localStorage` 属性来实现本地存储数据。

3. 相关 API：

    - `xxxStorage.setItem('key', 'value');`
      
      该方法接受一个键和值作为参数，会把健值对添加到存储中，如果键名存在，则更新其对应值。

    - `xxxStorage.getItem('key');`

      该方法接受一个键名作为参数，返回键名对应的值。

    - `xxxStorage.removeItem('key');`

      该方法接受一个键名作为参数，并把该键名从存储中删除。

    - `xxxStorage.clear();`

      该方法会清空存储中的所有数据。

4. 备注：

    - SessionStorage 存储的内容会随着浏览器窗口关闭而消失。

    - LocalStorage 存储的内容需要手动清除才会消失。

    - 对于 `xxxStorage.getItem('key')`，如果 key 对应的 value 获取不到，那么 getItem 的返回值是 `null`。

    - `JSON.parse(null)` 的结果依然是 `null`。

<br />

## 组件的自定义事件

1. 一种组件间通信的方式，适用于 <span style="color: red">子组件 ==> 父组件</sapn>。

2. 使用场景：A 是父组件，B 是子组件，B 想传给 A 数据，那么就要在 A 中给 B 绑定自定义事件（<span style="color: red">事件的回调在 A 中</sapn>）。

3. 绑定自定义事件：
    - 第一种方式，在父组件中：`<Demo v-on:atguigu="test">` 或 `<Demo @atguigu="test">`

    - 第二种方式，在父组件中：
      ```js
      <Demo ref="demo"/>
      ...
      export default {
        ...
        methods: {
          test() {
            ...
          }
        },
        mounted() {
          this.$refs.demo.$on('atguigu', this.test)
        }
      }
      ```
    
    - 若想让自定义事件只触发一次，可以使用 `once` 修饰符，或 `$once()` 方法。

4. 触发自定义事件：`this.$emit('atguigu', 数据)`

5. 解绑自定义事件：`this.$off('atguigu')`

6. 组件上也可以绑定原生 DOM 事件，但需要使用 `native` 修饰符。

7. 注意：通过 `this.$refs.xxx.$on('atguigu', 回调函数)` 绑定自定义事件时，回调要么配置在 methods 中，要么用箭头函数，否则 this 指向的是子组件而不是父组件

<br />

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color: red">任意组件间通信</span>。

2. 安装全局事件总线：
    ```js
    new Vue({
      ...
      beforeCreate() {
        Vue.prototype.$bus = this  // 安装全局事件总线，$bus 就是当前应用的 vm
      },
      ...
    })
    ```

3. 使用事件总线：
    - 接收数据：A 组件想接收数据，则在 A 组件中给 `$bus` 绑定自定义事件，事件的<span style="color: red">回调留在 A 组件自身</span>。

      ```js
      methods: {
        demo(data) {
          ...
        }
      },
      ...
      mounted() {
        this.$bus.$on('xxx', this.demo)
      },
      beforeDestroy() {
        this.$bus.$off('xxx')
      }
      ```
    - 提供数据：`this.$bus.$emit('xxx', 数据)`

4. 最好在 `beforeDestroy` 钩子中，用 `$off` 去解绑<span style="color: red">当前组件</span>所用到的事件。

<br />

## 消息订阅与发布（pubsub）
- 一种组件间通信的方式，适用于<span style="color: red">任意组件间通信</span>。

- 使用步骤：

  1. 安装 pubsub：
      ```bash
      $ npm i pubsub-js
      ```

  2. 引入：`import pubsub from 'pubsub-js'`

  3. 接收数据：A 组件想接收数据，则在 A 组件中订阅消息，订阅的<span style="color: red">回调留在 A 组件自身</span>。

      ```js
      methods: {
        demo(msgName, data) {
          ...
        }
      },
      mounted() {
        this.subId = pubsub.subscribe('消息名', this.demo)  // 订阅消息
      },
      beforeDestroy() {
        pubsub.unsubscribe(this.subId)  // 取消订阅
      }
      ```
  
  4. 提供数据：`pubsub.publish('消息名', data)`

  5. 最好在 `beforeDestroy` 钩子中，用 `pubsub.unsubscribe(this.subId)` 去<span style="color: red">取消订阅</span>。

<br />

## nextTick
1. 语法：`this.$nextTick(回调函数)`

2. 作用：在下一次 DOM 更新后执行其指定的回调。

3. 什么时候用：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 `Vue.nextTick` 一样，不同的是回调的 `this` 自动绑定到调用它的实例上。

<br />

## Vue 封装的过渡与动画
1. 作用：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。

2. 图示：
    ```js
                      Enter                                          Leave
    Opacity: 0  ---------------->  Opacity: 1      Opacity: 1  ------------------>  Opcaity: 0
        |                               |               |                                |
        |                               |               |                                | 
      v-enter                      v-enter-to        v-leave                        v-leave-to
    |                                        |    |                                           |
     ----------------------------------------      -------------------------------------------
                        |                                               |
                  v-enter-active                                  v-leave-active
    ```

3. 写法：
    1. 准备好样式：

        - 元素进入的样式：

            - v-enter：进入的起点

            - v-enter-active：进入过程中

            - v-enter-to：进入的终点

        - 元素离开的样式：

          -  v-leave：离开的起点

          - v-leave-active：离开过程中

          - v-leave-to：离开的终点
    
    2. 使用 `<transition>` 包裹要过渡的元素，并配置 `name` 属性，若欲使初始显示时应用一次动画，请使用 `appear` 属性：
        ```html
        <transition name="hello" appear>
          <h1 v-show="show">你好啊！</h1>
        </transition>  
        ```

    3. 备注：若有多个元素需要过渡，需使用：`<transition-group>`，且每个元素都要指定 `key` 值。

<br />

## vue-cli 配置代理
- 方法一

  在 `vue.config.js` 中添加如下配置：
  ```js
  module.exports = {
    devServer: {
      proxy: 'http://localhost:5000'
    }
  }
  ```

  说明：
  - 优点：配置简单，请求资源时直接发给前端（8080）即可。

  - 缺点：不能配置多个代理，不能灵活地控制请求是否走代理。

  - 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源）

- 方法二 

  编写 `vue.config.js` 配置具体代理规则：
    ```js {.line-numbers}
    module.exports = {
      // 开启代理服务器（方式二）
      devServer: {
        proxy: {
          '/atguigu': {  // 匹配所有以 '/atguigu' 开头的请求路径
            target: 'http://localhost:5000',  // 代理目标的基础路径
            pathRewrite: {'^/atguigu': ''},
            ws: true,  // 用于支持 websocket
            changeOrigin: true  // 用于修改请求头中的 host 值
          },
          '/demo': {
            target: 'http://localhost:5001',
            pathRewrite: {'^/demo': ''},
            ws: true,  // 用于支持 websocket
            changeOrigin: true  // 用于修改请求头中的 host 值
          }
        }
      }
      /*
        changeOrigin 设置为 true 时，服务器收到的请求头中的 host 为：localhost:5000
        changeOrigin 设置为 false 时，服务器收到的请求头中的 host 为：localhost:8080
        changeOrigin 的默认值为 true
      */
    }
    ```
  
  说明：
  - 优点：可以配置多个代理，且可以灵活地配置请求是否走代理
  - 缺点：配置略微繁琐，请求资源时必须加前缀

<br />

## 插槽
1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <span style="color: red">子组件 ===> 父组件</sapn>。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：
    - 默认插槽：
      ```js
      父组件中：
        <Category>
          <div>html 结构</div>
        </Category>
      
      子组件中：
        <template>
          <div>
            <!-- 定义一个插槽 -->
            <slot>插槽默认内容</slot>
          </div>
        </template>
      ```
    
    - 具名插槽：
      ```js
      父组件中：
        <Category>
          <template slot="center">
            <div>html 结构1</div>
          </template>

          <template v-slot:footer>
            <div>html 结构2</div>
          </template>
        </Category>
      
      子组件中：
        <template>
          <div>
            <!-- 定义一个插槽 -->
            <slot>插槽默认内容</slot>
          </div>
        </template>
      ```

    - 作用域插槽：
      - 理解：<span style="color: red">数据在组件的自身，但根据数据生成的结构需要使用者来决定</span>。例如：`games` 数据在 `Category` 组件中，但是用数据所遍历出来的结构由 `App` 组件决定。

      - 具体编码：
        ```js
        父组件中：
          <Category>
            <template scope="scopeData">
              <ol>
                <li v-for="(g, index) in scopeData.games" :key="index">{{ g }}</li>
              </ol>
            </template>
          </Category>

          <Category>
            <template slot-scope="{games}">  <!-- slot-scope 为新api，{games} 为解构赋值 -->
              <h4 v-for="(item, index) in games" :key="index">{{ item }}</h4>
            </template>
          </Category>
        
        子组件中：
          <template>
            <div class="category">
              <slot v-bind:games="games"></slot>
            </div>
          </template>

          <script>
            export default {
              name: 'Category',
              props: ['title'],
              // 数据在子组件自身
              data() {
                return {
                  games: ['HearthStone', 'Overwatch', 'Heroes of Storm']
                }
              }
            }
          </script>
        ```

<br />

## Vuex
1. 概念
    
        在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 Vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

2. 何时使用？

        多个组件需要共享数据时。

3. 搭建 Vuex 环境
    
    1. 创建文件：`src/store/index.js`
        ```js {.line-numbers}
        // 该文件用于创建 Vuex 中最为核心的 store


        import Vue from 'vue'
        // 引入 Vuex
        import Vuex from 'vuex'

        // 使用 Vuex 插件
        Vue.use(Vuex)

        // 准备 actions，用于响应组件中的动作
        const actions = {}
        // 准备 mutations，用于操作数据（state）
        const mutations = {}
        // 准备 state，用于存储数据
        const state = {}

        // 创建并导出 store
        export default new Vuex.Store({
          actions,
          mutations,
          state
        })
        ```

    2. 在 `main.js` 中创建 `vm` 时传入 `store` 配置项
        ```js
        ...
        // 引入 store
        import store from './store/index.js'
        ...

        // 创建 vm
        const vm = new Vue({
          el: '#app',
          render: h => h(App),
          store,
          beforeCreate() {
            Vue.prototype.$bus = this
          }
        })
        ```

4. 基本使用

    1. 初始化数据、配置 `actions`、配置 `mutations`，操作文件 `store.js`
        ```js {.line-numbers}
        import Vue from 'vue'
        // 引入 Vuex
        import Vuex from 'vuex'

        // 应用 Vuex 插件
        Vue.use(Vuex)

        // 准备 actions，用于响应组件中的动作
        const actions = {
          incrementOdd(context, value) {
            context.commit('INCREMENT', value)
          }
        }
        // 准备 mutations，用于操作数据（state）
        const mutations = {
          INCREMENT(state, value) {
            state.sum += value
          }
        }
        // 准备 state，用于存储数据
        const state = {
          sum: 0  // 当前的和
        }

        // 创建并导出 store
        export default new Vuex.Store({
          actions,
          mutations,
          state
        })
        ```
    
    2. 组件中读取 Vuex 中的数据：`$store.state.xxx`

    3. 组件中修改 Vuex 中的数据：`$store.dispatch('actions中的方法名', 数据)` 或 `$store.commit('mutations中的方法名', 数据)`

            备注：若没有网络请求或其他业务逻辑，组件中也可以越过 actions，即不写 dispatch，直接编写 commit。

5. getters 的使用
    1. 概念：当 `state` 中的数据需要经过加工后再使用时，可以使用 `getters` 加工

    2. 在 `store.js` 中追加 `getters` 配置
        ```js
        ...
        const getters = {
          bigSum(state) {
            return state.sum * 10
          }
        }

        export default new Vuex.Store({
          ...
          getters
        })
        ```

    3. 组件中读取数据：`$store.getters.bigSum`

6. 四个 map 方法的使用
    - mapState 方法：用于帮助我们映射 `state` 中的数据为计算属性
      ```js
      computed: {
        // 借助 mapState 生成计算属性，从 state 中读取数据。（对象写法）
        ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),

        // 借助 mapState 生成计算属性，从 state 中读取数据。（数组写法）
        ...mapState(['sum', 'school', 'subject']),
      },
      ```

    - mapGetters 方法：用于帮助我们映射 `getters` 中的数据为计算属性
      ```js
      computed: {
        // 借助 mapGetters 生成计算属性，从 getters 中读取数据。（对象写法）
        ...mapGetters({bigSum: 'bigSum'}),

        // 借助 mapGetters 生成计算属性，从 getters 中读取数据。（数组写法）
        ...mapGetters(['bigSum']),
      },
      ```

    - mapActions 方法：用于帮助我们生成与 actions 对话的方法，即：包含 $store.dispatch(xxx) 的函数
      ```js
      // 借助 mapActions 生成对应的方法，方法中会调用 dispatch 去联系 actions （对象写法）
      ...mapActions({incrementOdd: 'incrementOdd', incrementWait: 'incrementWait'}),

      // 借助 mapActions 生成对应的方法，方法中会调用 dispatch 去联系 actions （数组写法）
      ...mapActions(['incrementOdd', 'incrementWait']),
      ```

    - mapMutations 方法：用于帮助我们生成与 mutations 对话的方法，即：包含 $store.commit(xxx) 的函数
      ```js
      // 借助 mapMutations 生成对应的方法，方法中会调用 commit 去联系 mutations （对象写法）
      ...mapMutations({increment: 'INCREMENT', decrement: 'DECREMENT'}),

      // 借助 mapMutations 生成对应的方法，方法中会调用 commit 去联系 mutations （数组写法）
      ...mapMutations(['INCREMENT', 'DECREMENT']),
      ```

          备注：mapActions 与 mapMutations 使用时，若需要传递参数，则需在模板中绑定事件时传递好参数，否则参数是实例对象。
  
7. 模块化 + 命名空间
    
    1. 目的：让代码更好维护，让多种数据分类更加明确。

    2. 修改 `store.js`
        ```js
        // 该文件用于创建 Vuex 中最为核心的 store


        import Vue from 'vue'
        // 引入 Vuex
        import Vuex from 'vuex'

        import countOptions from './count.js'
        import personOptions from './person.js'

        // 只有先应用 Vuex 插件，才能 new Vuex.Store()
        Vue.use(Vuex)

        // 创建并导出 store
        export default new Vuex.Store({
          modules: {
            countRelated: countOptions,
            personRelated: personOptions,
          }
        })
        ```

        ```js
        // 求和功能相关的配置 store/count.js
        export default {
          namespaced: true,  // 开启命名空间
          actions: {...},
          mutations: {...},
          state: {...},
          getters: {
            bigSum(state) {
              return state.sum * 10
            },
          },
        }
        ```

        ```js
        // 求和功能相关的配置 store/person.js
        export default {
          namespaced: true,  // 开启命名空间
          actions: {...},
          mutations: {...},
          state: {...},
          getters: {...},
        }
        ```
    
    3. 开启命名空间后，组件中读取 `state` 数据：
        ```js
        // 方式一：自己直接读取
        this.$store.state.personRelated.personList
        // 方式二：借助 mapState 读取
        ...mapState('countRelated', ['sum', 'school', 'subject']),
        ...mapState('personRelated', ['personList']),
        ```

    4. 开启命名空间后，组件中读取 `getters` 数据：
        ```js
        // 方式一：自己直接读取
        this.$store.getters['personRelated/firstPersonName']
        // 方式二：借助 mapGetters 读取
        ...mapGetters('countRelated', ['bigSum']),
        ```
    
    5. 开启命名空间后，组件中调用 `dispatch`：
        ```js
        // 方式一：自己直接 dispatch
        this.$store.dispatch('personRelated/addPersonWang', personObj)
        // 方式二：借助 mapActions 
        ...mapActions('countRelated', ['incrementOdd', 'incrementWait']),
        ```
    
    6. 开启命名空间后，组件中调用 `commit`：
        ```js
        // 方式一：自己直接 commit
        this.$store.commit('personRelated/ADD_PERSON', personObj)
        // 方式二：借助 mapMutations 
        ...mapMutations('countRelated', {increment: 'INCREMENT', decrement: 'DECREMENT'}),
        ```

<br />

## 路由
- 理解：一个路由（route）就是一组映射关系（key-value），多个路由需要路由器（router）进行管理。

- 前端路由：key 是路径，value 是组件。

- 基本使用

  1. 安装 vue-router，命令：
      ```dash
      $ npm i vue-router
      ```
  
  2. 引入及应用路由：
      ```js
      ...
      import VueRouter from 'vue-router'
      ...
      Vue.use(VueRouter)
      ```
  
  3. 编写 router 配置项（在 src 文件夹下新建 router 文件夹，并在其中创建 index.js 文件）：
      ```js {.line-numbers}
      // 该文件专门用于创建整个应用的路由器

      import VueRouter from 'vue-router'

      import About from "../components/About.vue"
      import Home from "../components/Home.vue"

      // 创建并导出一个路由器
      export default new VueRouter({
        routes: [
          {
            path: '/about',
            component: About,
          },
          {
            path: '/home',
            component: Home,
          },
        ]
      })
      ```
  
  4. 实现切换（active-class="active" 可配置高亮样式）
      ```html
      <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
      ```

  5. 指定展示位置
      ```html
      <router-view></router-view>
      ```
  
- 几个注意点

  1. 路由组件通常存放在 pages 文件夹，一般组件通常存放在 components 文件夹。

  2. 通过切换，“隐藏”了的路由组件，默认是被销毁的，需要的时候再去挂载。

  3. 每个组件都有自己的 `$route` 属性，其中存储着自己的路由信息。

  4. 整个应用只有一个 router，可以用通过组件的 `$router` 属性获取。

- 多级路由（嵌套路由）

  1. 配置路由规则，使用 `children` 配置项：
      ```js
      routes: [
        {
          path: '/about',
          component: About,
        },
        {
          path: '/home',
          component: Home,
          children: [  // 通过 children 配置子级路由
            {
              path: 'news',  // 此处一定不要加 /
              component: News,
            },
            {
              path: 'message',
              component: Message,
            },
          ]
        },
      ]
      ```
  
  2. 跳转（要写完整路径）：
      ```html
      <router-link active-class="active" to="/home/news">News</router-link>
      ```

- 路由的 query 参数

  1. 传递参数
      ```html
      <!-- 跳转路由并携带query参数，to的字符串写法 -->
      <router-link :to="`/home/message/detail?id=${msg.id}&title=${msg.title}`">{{msg.title}}</router-link>

      <!-- 跳转路由并携带query参数，to的对象写法 -->
      <router-link :to="{
        path: '/home/message/detail',
        query: {
          id: msg.id,
          title: msg.title,
        }
      }">
        {{msg.title}}
      </router-link>
      ```

  2. 接收参数：
      ```js
      $route.query.id
      $route.query.title
      ```

- 命名路由
  - 作用：可以简化路由的跳转。

  - 如何使用
    
    1. 给路由命名：
        ```js
        routes: [
          {
            path: '/about',
            component: About,
          },
          {
            path: '/home',
            component: Home,
            children: [
              {
                path: 'news',
                component: News,
              },
              {
                path: 'message',
                component: Message,
                children: [
                  {
                    name: 'det',
                    path: 'detail',
                    component: Detail,
                  }
                ]
              },
            ]
          },
        ]
        ```
    
    2. 简化跳转：
        ```html
        <!-- 跳转路由并携带query参数，to的对象写法 -->
        <router-link :to="{
          // path: '/home/message/detail',  // 简化前，需要写完整的路径
          name: 'det',  // 简化后，直接通过名字跳转
          query: {
            id: msg.id,
            title: msg.title,
          }
        }">
          {{msg.title}}
        </router-link>
        ```
- 路由的 params 参数

  1. 配置路由，声明接受 params 参数
      ```js
      {
        path: '/home',
        component: Home,
        children: [
          {
            path: 'news',
            component: News,
          },
          {
            path: 'message',
            component: Message,
            children: [
              {
                name: 'det',
                path: 'detail/:id/:title',  // 使用占位符声明接受 params 参数
                component: Detail,
              }
            ]
          },
        ]
      },
      ```
  
  2. 传递参数
      ```html
      <!-- 跳转路由并携带params参数，to的字符串写法 -->
      <router-link :to="`/home/message/detail/${msg.id}/${msg.title}`">{{msg.title}}</router-link>

      <!-- 跳转路由并携带params参数，to的对象写法 -->
      <router-link :to="{
        // path: '/home/message/detail',
        name: 'det',
        params: {
          id: msg.id,
          title: msg.title,
        }
      }">
        {{msg.title}}
      </router-link>
      ```

        特别注意：路由携带 params 参数时，若使用 to 的对象写法，则不能使用 path 配置项，必须使用 name 配置！
  
  3. 接收参数：
      ```js
      $route.params.id
      $route.params.title
      ```

- 路由的 props 参数
    
  作用：让路由组件更方便地收到参数

  ```js
  {
    name: 'det',
    path: 'detail',
    component: Detail,
    // props第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件。
    // props: {a:1, b:'hello'}

    // props第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props形式传给Detail组件。
    // props: true

    // props第三种写法，值为函数
    props($route) {
      return { id: $route.query.id, title: $route.query.title }
    }
    // props({query: {id, title}}) {  // 连续解构赋值
    //   return { id, title }
    // }
  }
  ```

- router-link 的 replace 属性

  1. 作用：控制路由跳转时操作浏览器历史记录的模式

  2. 浏览器的历史记录有两种写入方式：分别为 `push` 和 `replace`，`push` 是追加历史记录，`replace` 是替换当前记录。路由跳转时默认为 `push`。

  3. 如何开启 `replace` 模式：`<router-link replace ...>News</router-link>` 或 `<router-link :replace="true" ...>News</router-link>`

- 编程式路由导航

  1. 作用：不借助 `<router-link>` 实现路由跳转，让路由跳转更加灵活

  2. 具体编码：

      ```js
      $router 的两个 api

      this.$router.push({
        name: 'det',
        query: {
          id: msg.id,
          title: msg.title,
        }
      })

      this.$router.replace({
        name: 'det',
        query: {
          id: msg.id,
          title: msg.title,
        }
      })

      this.$router.back()  // 后退
      this.$router.forward()  // 前进
      this.$router.go()  // 可前进
      ```

- 缓存路由组件

  1. 作用：让不展示的路由组件保持挂载，不被销毁

  2. 具体编码：
      ```html
      <keep-alive include="News">
        <router-view></router-view>
      </keep-alive>  
      ```

- 两个新的生命周期钩子

  1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。

  2. 具体名称：
      
      - `activated` 路由组件被激活时触发

      - `deactivated` 路由组件失活时触发

- 路由守卫

  1. 作用：对路由进行权限控制

  2. 分类：全局守卫、独享守卫、组件内守卫

  3. 全局守卫：
      ```js
      // 全局前置路由守卫——初始化时以及每次路由切换之前被调用
      router.beforeEach((to, from, next) => {
        console.log('前置路由守卫', to, from)
        if (to.meta.isAuth) {  // 判断是否需要鉴定权限
          if (localStorage.getItem('school') === 'atguigu') {
            next()
          } else {
            alert('学校名不正确，无权限查看！')
          }
        } else {
          next()
        }
      })

      // 全局后置路由守卫——初始化时以及每次路由切换之后被调用
      router.afterEach((to, from) => {
        console.log('后置路由守卫', to, from)
        if(to.meta.title) {
          document.title = to.meta.title  // 修改网页的 title
        } else {
          document.title = 'vue_test'
        }
      })

      export default router
      ```

  4. 独享守卫：
      ```js
      beforeEnter: (to, from, next) => {
        console.log('前置路由守卫', to, from)
        if (to.meta.isAuth) {  // 判断当前路由是否需要鉴定权限
          if (localStorage.getItem('school') === 'atguigu') {
            next()
          } else {
            alert('学校名不正确，无权限查看！')
          }
        } else {
          next()
        }
      }
      ```

  5. 组件内守卫：
      ```js
      // 进入守卫，通过路由规则，进入该组件时
      beforeRouteEnter (to, from, next) {
        
      },
      // 离开守卫，通过路由规则，离开该组件时
      beforeRouteLeave (to, from, next) {
        next()
      }
      ```

- 路由器的两种工作模式

  1. 对于一个 url 来说，什么是 hash 值？—— # 及其后面的内容就是 hash 值。

  2. hash 值不会包含在 HTTP 请求中，即：hash 不会带给服务器。

  3. hash 模式：
  
      - 地址中永远带着 #，不美观

      - 若以后将地址通过第三方手机 app 分享，且 app 校验严格，则地址会被标记为不合法

      - 兼容性较好
  
  4. history 模式：

      - 地址干净，美观

      - 兼容性与 hash 模式相比略差

      - 应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题（可以使用 npm 中的 connect-history-api-fallback）

<br />
<br />
<br />

# Original README

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
