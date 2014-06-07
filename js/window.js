define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {

  function Window() {
    this.cfg = {
      title: '系统消息',
      content: '',
      width: 500,
      height: 300,
      hasCloseBtn: false,
      text4alertBtn: '确定',
      handler4alertBtn: null,
      handler4closeBtn: null,
      skinClassName: null,
      hasMask: true,
      isDraggable: false,
      dragHandle: null 
    };
  }

  Window.prototype = $.extend({}, new widget.Widget(), { // 继承Widget类
    alert: function(cfg){

      var CFG = $.extend(this.cfg, cfg);
      var that = this;

      var boundingBox = $('<div class="window_boundingBox">' +
                            '<div class="window_header">' +CFG.title+ '</div>' +
                            '<div class="window_body">' +CFG.content+ '</div>' +
                            '<div class="window_footer"><input class="window_alertBtn" type="button" value="' +CFG.text4alertBtn+ '"></div>' +
                          '</div>');
      boundingBox.appendTo('body');

      // 遮罩层
      if(CFG.hasMask) {
        mask = $('<div class="window_mask"></div>');
        mask.appendTo('body');
      }

      // 确定按钮
      var btn = boundingBox.find('input');
      btn.appendTo(boundingBox);
      btn.click(function() {
        CFG.handler4alertBtn && CFG.handler4alertBtn();
        boundingBox.remove();
        CFG.hasMask && mask.remove();
        that.fire('alert');
      });      

      // 关闭按钮
      if(CFG.hasCloseBtn) {
        var closeBtn = $('<span class="window_closeBtn">X</span>');
        closeBtn.appendTo(boundingBox);
        closeBtn.click(function() {
          CFG.handler4closeBtn && CFG.handler4closeBtn();
          boundingBox.remove();
          CFG.hasMask && mask.remove();
          that.fire('close');
        });
      }

      // 弹框大小和定位
      boundingBox.css({
        width: CFG.width + 'px',
        height: CFG.height + 'px',
        left: (CFG.left || (window.innerWidth-CFG.width)/2) + 'px',
        top: (CFG.top || (window.innerHeight-CFG.height)/2) + 'px'
      });

      // 皮肤设置
      if(CFG.skinClassName) {
        boundingBox.addClass(CFG.skinClassName);
      }

      // 拖动
      if(CFG.isDraggable) {
        if(CFG.dragHandle) {
          boundingBox.draggable({
            handle: CFG.dragHandle
          });
        }else {
          boundingBox.draggable();
        }        
      }

      // if(CFG.handler4alertBtn) {
      //   this.on('alert', CFG.handler4alertBtn);
      // }
      // if(CFG.handler4closeBtn) {
      //   this.on('close', CFG.handler4closeBtn);
      // }

      // 实现连缀语法
      return this;
    },    

    confirm: function(){},
    prompt: function(){},

    
  });

  return {
    Window: Window
  }
});