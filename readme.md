# mz-scroll jquery 插件

插件用于简化元素监听scroll事件的方法，当你页面中又一个元素在滚动到某个位置的时候需要触发一些动作的时候,可以使用这个插件，比如图片的延时加载，滚动出现播放css动画等等。

使用方法


	$(selector).addScroll(options);


 
options {obj} 配置 如果传false则删除此元素监听任务
 
---

 * 具体配置选项：
 * once {boolean} 是否只执行一次 default false
 * topOffset {int} 定义元素顶部到窗口底部的距离多少算进入区域 default 0
 * bottomOffset {int} 定义元素底部到窗口顶部部的距离多少算进入区域 default 0
 * activeClass {string} 元素进入区域要添加的类名
 * scrollIn {function} 元素进入区域的回调
 * scrollOut {function} 元素离开区域的回调
