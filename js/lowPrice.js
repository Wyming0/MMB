$(function () {
    // 创建实例
    var manbuy = new ManBuy();

    
    manbuy.queryTitle();
    manbuy.queryContent();
    manbuy.tapTitle();
    manbuy.pullDownUp();

    
mui(document).on('tap', 'a', function () {
    var a = document.createElement('a');
    a = this.cloneNode(true);
    a.click();
})
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
});


});

var ManBuy = function () {

};

ManBuy.prototype = {
    titleid: 0,
    // 白菜价标题
    queryTitle: function () {
        // 页面一开始就发送请求
        $.ajax({
            url: "http://localhost:9090/api/getbaicaijiatitle",
            success: function (data) {
                // console.log(data);
                // 调用模板   
                var html = template('titleTpl', data);
                // 添加到页面上
                $('.head-tab ul').html(html);

                // 当li被点击时添加一个active类
                $('.head-tab ul').on('tap', 'li', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                })

            }
        })
    },
    // 白菜价内容
    queryContent: function () {
        var that = this;
        $.ajax({
            url: "http://localhost:9090/api/getbaicaijiaproduct",
            data: {
                titleid: that.titleid
            },
            success: function (data) {
                // console.log(id);
                // console.log(data);
                var html = template('mainTpl', data);
                    $('#main ul').html(html);
                    // $('.mui-scroll').css('transform','translate3d(0px, 0px, 0px) translateZ(0px)');                    
            }
        })
    },
    // 点击标题事件
    tapTitle: function () {
        var that = this;
        $('.head-tab ul').on('tap', 'li a', function () {
            that.titleid = $(this).data('titleid');
            console.log(that.titleid);
            
            that.queryContent();
            // console.log(id);
             mui('.mui-scroll-wrapper').scroll().setTranslate(0,0);
 
        })
    },
    // 下拉刷新
    pullDownUp: function () {
        var that = this;
        mui.init({
            pullRefresh: {
                container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                up: {
                    auto: false,//可选,默认false.首次加载自动上拉刷新一次
                    contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                       if(true){
                        $.ajax({
                            url: "http://localhost:9090/api/getbaicaijiaproduct",
                            data: {
                                titleid: that.titleid
                            },
                            success: function (data) {
                                // console.log(id);
                                // console.log(data);
                                var html = template('mainTpl', data);
                                    $('#main ul').append(html);
                                    // $('.mui-scroll').css('transform','translate3d(0px, 0px, 0px) translateZ(0px)');                    
                            }
                        })
                       }
                       mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                    }
                   
                }
            }

        });

    }
}

