define(['jquery', 'jqueryUI'], function($, $UI) {

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

  Window.prototype = { 
    alert: function(cfg) {

      $.extend(this.cfg, cfg); // 合并配置项

      /* renderUI
      ========================================= */
      var boundingBox = $(
        '<div class="window_boundingBox">' +
          '<div class="window_header">' +this.cfg.title+ '</div>' +
          '<div class="window_body">' +this.cfg.content+ '</div>' +
          '<div class="window_footer"><input class="window_alertBtn" type="button" value="' +this.cfg.text4alertBtn+ '"></div>' +
        '</div>'
      );

      // 遮罩层
      if(this.cfg.hasMask) {
        var _mask = $('<div class="window_mask"></div>');
        _mask.appendTo('body');
      };

      // 关闭按钮
      if(this.cfg.hasCloseBtn) {
        boundingBox.append('<span class="window_closeBtn">X</span>');
      };

      boundingBox.appendTo(document.body);

      /* bindUI
      ========================================= */
      var that = this;
      boundingBox.delegate('.window_alertBtn', 'click', function() {
        that.cfg.handler4alertBtn && that.cfg.handler4alertBtn();
        that.cfg.hasMask && _mask.remove();
        boundingBox.remove();
      });
      boundingBox.delegate('.window_closeBtn', 'click', function() {
        that.cfg.handler4closeBtn && that.cfg.handler4closeBtn();
        that.cfg.hasMask && _mask.remove();
        boundingBox.remove();
      });

      /* syncUI
      ========================================= */
      boundingBox.css({
        width: this.cfg.width + 'px',
        height: this.cfg.height + 'px',
        left: (this.cfg.left || (window.innerWidth-this.cfg.width)/2) + 'px',
        top: (this.cfg.top || (window.innerHeight-this.cfg.height)/2) + 'px'
      });

      // 换肤
      if(this.cfg.skinClassName) {
        boundingBox.addClass(this.cfg.skinClassName);
      };

      // 拖动
      if(this.cfg.isDraggable) {
        if(this.cfg.dragHandle) {
          boundingBox.draggable({
            handle: this.cfg.dragHandle
          });
        }else {
          boundingBox.draggable();
        };
      };

      return this; // 实现连缀语法
    },

    confirm: function(){},
    prompt: function(){}

    
  };

  return {
    Window: Window
  }
});