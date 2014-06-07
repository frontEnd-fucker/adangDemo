require.config({
  paths: {
    jquery: 'jquery-1.11.1.min', // 模块名到文件名的映射
    jqueryUI: 'jquery-ui-1.10.4.custom.min'
  }
});

require(['jquery', 'window'], function($, w) { // 因为我们在应用层也需要用到jquery模块，所以即使window模块已经引入了jquery模块这里也需要再引入一次。如果不这样做的话，在这里就不能应用到jquery。虽然window模块和这里都把jquery模块引进来了，但是requireJs只会加载一次。
  $('#a').click(function() {
    var win = new w.Window();
    win.alert({
      title: '提示',
      content: 'welcome!',      
      width: 300,
      height: 150,
      top: 100,
      isDraggable: true,
      dragHandle: '.window_header',
      skinClassName: 'window_skin_a',
      hasCloseBtn: true,
      text4alertBtn: 'ok',
      handler4alertBtn: function() {
        alert('u click a alert btn');
      },
      handler4closeBtn: function() {
        alert('u click a close btn');
      }
    });

    win.on('alert', function() {
      alert('the second alert handler');
    });
    win.on('alert', function() {
      alert('the third alert handler');
    });
    win.on('close', function() {
      alert('the second close handler');
    });
  });
});