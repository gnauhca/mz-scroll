# mz-scroll jquery 插件 

插件用于简化元素监听scroll事件的方法，当你页面中又一个元素在滚动到某个位置的时候需要触发一些动作的时候,可以使用这个插件，比如图片的延时加载，滚动出现播放css动画等等。

使用方法


	$(selector).addScroll(options);


 
options {obj} 配置 如果传false则删除此元素监听任务
 
---

 * 具体配置选项：
 *
 * once {boolean} 是否执行一次 default false
 * sensitive 默认为 false 既元素完全离开屏幕才触发 scrollOut，设置为 true 时元素只要离开激活区域就触发 scrollOut 
 * topOffset {int} 元素顶部到窗口底部的距离多少算进入区域 default 0
 * bottomOffset {int} 元素底部到窗口顶部部的距离多少算进入区域 default 0
 * setUp {function} 如需要做一些准备工作可以写在这里
 * activeClass {string} 元素进入区域要添加的类
 * scrollIn {function} 元素进入区域的回调
 * scrollOut {function} 元素离开区域的回调
 * scrolling {function(scrolloffset)} 元素处于激活状态时处理滚动的函数

## 更新日志

### 1.0.4
* 修复手机在浏览电脑网站时，底部元素动画不触发的问题

### 1.0.3
* 加入 sensitive 参数，解决小元素循环触发的问题

### 1.0.2, 1.0.1
* 解决当topOffset bottomOffset 设置过大时出现盲区的问题

### 1.0.0
* 初版