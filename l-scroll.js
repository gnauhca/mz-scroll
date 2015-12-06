var Scroller = function() {
	var scrollTasks = [],
		defaults = {
			once: true,
			delay: 0,
			inScreen: 0.5,
			topOffset: 0,
			bottomOffset: 0,
			activeClass: '',
			scrollIn: null,
			scrollOut: null,
			scrolling: null
		};

	//初始化，监听window scroll事件
	function init() {
		var $window = $(window),
			lastScrollTop = $window.scrollTop(),
			scrollOffset = 0;

		$(window).on('scroll', function() {
			scrollOffset = $window.scrollTop() - lastScrollTop;
			lastScrollTop = $window.scrollTop();
			fireTasks(scrollOffset);
		});
	}

	function fireTasks(scrollOffset) {
		var task,
			inScreen,
			sizeInfo,
			actived;

		//debug.innerHTML = '';
		for (var i = 0, l=scrollTasks.length; i < l; i++) {
			task = scrollTasks[i];
			sizeInfo = getSizeInfo(task.elem, task.options.topOffset, task.options.bottomOffset);


			if (sizeInfo.scrollIn) {
				actived = true;
				if (task.actived !== actived) {
					setTimeout((function(task) {
						return function() {
							if (!task.actived) return;
							$(task.elem).addClass(task.options.activeClass)
							task.options.scrollIn && task.options.scrollIn.call(task.elem);
						}
					})(task), task.options.delay);						
				}
				task.options.scrolling && task.options.scrolling.call(task.elem, scrollOffset);
				task.actived = actived;
			} else if (sizeInfo.scrollOut){
				actived = false;
				if (task.actived !== actived) {
					task.options.scrollOut && task.options.scrollOut.call(task.elem);
					$(task.elem).removeClass(task.options.activeClass);
					task.actived = actived;
					
					if (task.options.once) {
						scrollTasks.splice(i, 1);
					}
				}
			}
			//debug.innerHTML += '<br> ' + task.elem.id + ': ' + task.actived + '<br />';
		}
	}


	function getSizeInfo(elem, topOffset, bottomOffset) {
		var elemHeight = elem.offsetHeight,
			elemOfsTop = $(elem).offset().top,
			windowScrollTop = $(window).scrollTop(),
			windowHeight = $(window).height(),
			sizeInfo = {/*scrollOut, scrollIn*/};	

		//判断scrollIn时机，注意scrollIn，scrollOut时机并不是互斥的
		if (elemOfsTop < windowScrollTop + windowHeight + topOffset &&
			elemOfsTop + elemHeight > windowScrollTop - bottomOffset) {
			sizeInfo.scrollIn = true;
		} else {
			sizeInfo.scrollIn = false;
		}

		//判断scrollOut时机
		if (elemOfsTop > windowScrollTop + windowHeight + (bottomOffset < 0 ? 0: bottomOffset) ||
			elemOfsTop + elemHeight < windowScrollTop + (topOffset > 0 ? 0 : topOffset)) {
			sizeInfo.scrollOut = true;
		} else {
			sizeInfo.scrollOut = false;
		}
		return sizeInfo;
	}

	this.addTask = function(elem, taskOptions) {
		var taskOptions = $.extend(true, defaults, taskOptions),
			elem = elem;

		scrollTasks.push({
			'elem': elem,
			'actived': false,
			'options': taskOptions
		});
		fireTasks(0);
	}

	this.removeTask = function(elem) {
		for (var i = scrollTasks.length - 1; i >= 0; i--) {
			if (scrollTasks[i].elem === elem) {
				scrollTasks.splice(i, 1);
			}
		};
	}
	init();
}

/*
 * options 配置 如果传false则删除此元素监听任务
 *
 * once {boolean} 是否执行一次 default false
 * delay {int} 元素进入区域延时
 * topOffset {int} 元素顶部到窗口底部的距离多少算进入区域 default 0
 * bottomOffset {int} 元素底部到窗口顶部部的距离多少算进入区域 default 0
 * activeClass {string} 元素进入区域要添加的类
 * scrollIn {function} 元素进入区域的回调
 * scrollOut {function} 元素离开区域的回调
 * scrolling 
 * 
 */
$.fn.addScroll = (function() {
	var scroller = new Scroller();

	return function(options) {

		this.each(function() {
			if (options === false) {
				scroller.removeTask(this);
			} else {
				scroller.addTask(this, options);
			}
		});
		return this;
	}
})()