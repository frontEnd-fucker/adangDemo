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
    renderUI: function() {
      this.boundingBox = $(
        '<div class="window_boundingBox">' +
          '<div class="window_header">' +this.cfg.title+ '</div>' +
          '<div class="window_body">' +this.cfg.content+ '</div>' +
          '<div class="window_footer"><input class="window_alertBtn" type="button" value="' +this.cfg.text4alertBtn+ '"></div>' +
        '</div>'
      );

      // 遮罩层
      if(this.cfg.hasMask) {
        this._mask = $('<div class="window_mask"></div>');
        this._mask.appendTo('body');
      }

      // 关闭按钮
      if(this.cfg.hasCloseBtn) {
        this.boundingBox.append('<span class="window_closeBtn">X</span>');
      }

      this.boundingBox.appendTo(document.body);
    },

    bindUI: function() {
      var that = this;
      this.boundingBox.delegate('.window_alertBtn', 'click', function() {
        that.fire('alert');
        that.destroy();
      }).delegate('.window_closeBtn', 'click', function() {
        that.fire('close');
        that.destroy();
      });
      if(this.cfg.handler4alertBtn) {
        this.on('alert', this.cfg.handler4alertBtn);
      };
      if(this.cfg.handler4closeBtn) {
        this.on('close', this.cfg.handler4closeBtn);
      };
    },

    syncUI: function() {
      this.boundingBox.css({
        width: this.cfg.width + 'px',
        height: this.cfg.height + 'px',
        left: (this.cfg.left || (window.innerWidth-this.cfg.width)/2) + 'px',
        top: (this.cfg.top || (window.innerHeight-this.cfg.height)/2) + 'px'
      });
      if(this.cfg.skinClassName) {
        this.boundingBox.addClass(this.cfg.skinClassName);
      };
      if(this.cfg.isDraggable) {
        if(this.cfg.dragHandle) {
          this.boundingBox.draggable({
            handle: this.cfg.dragHandle
          });
        }else {
          this.boundingBox.draggable();
        }
      }
    },

    destructor: function() {
      this._mask && this._mask.remove();
    },

    alert: function(cfg) {
      $.extend(this.cfg, cfg);
      this.render();
      return this;
    }, 

    confirm: function(){},
    prompt: function(){},

    
  });

  return {
    Window: Window
  }
});