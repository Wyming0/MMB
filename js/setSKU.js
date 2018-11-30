'use strict';
$(function () {
    var mmb = new MMB();

    mmb.getShop();
    mmb.getPlaceInfo();
    mmb.leftTap();
    mmb.upDownInit();
    mmb.leftTap();
    mmb.tapAllPrice();
    mmb.goTop();
    console.log($(document).scrollTop());
    // console.log($(document).body.scrollTop());
    console.log(document.body.scrollTop);
    $(window).scroll(function () {  //输出垂直的滚动距离
          
        console.log($(this).scrollTop());  //输出水平的滚动距离
        //   console.log( $(this).scrollLeft() );
    });

})
var MMB = function () {

}
MMB.prototype = {
    id: 0,
    cookieId: 0,
    checked: {
        check: true,
        is: 'shopping'
    },
    shopId: 0,
    areaId: 0,
    select: {
        check: true,
        is: 'place'
    },
    string: '',
    str: '',
    choose: {},

    page: 1, //当前页数
    pageSize: 6, //一页显示4个
    totalPage: 0, //总页数  通过获取的数据长度  result.length/pageSize  

    shoppingId: 0, //商场id
    addressId: 0, //地区id
    // 菜单栏的点击事件  会展开菜单

    // 所有价格
    html: '<div class="allPrice fa fa-check" data-id="0">1元</div><div class="allPrice" data-id="1">2元</div>' +
        '<div class="allPrice" data-id="2">3元</div><div class="allPrice" data-id="3">4元</div>',

    getShop: function () {
        var that = this;


        $('.shopping').on('tap', function () {
            // console.log(id);
            // 发送请求，菜单显示
            // var str;
            that.pullInfo('http://localhost:9090/api/getgsshop', that.checked, that.id, function (data) {

                console.log(data);
                //循环遍历
                for (var i = 0; i < data.result.length; i++) {
                    that.id = $('.menu-ul').data('shopping-id');
                    console.log(that.id);

                    if (that.id == data.result[i].shopId) {
                        data.result[i].select = true;
                    }
                }
                var html = template('singleTpl', data);
                // console.log(html);

                $('.menu-ul').html(html).show();


            }, '.shopping span');
        })
    },
    // 点击所有价格
    tapAllPrice: function () {
        var that = this;
        // 盒子隐藏

        that.isPrcie = true;
        $('.allPrice').on('tap', function () {
            if (that.isPrcie) {
                $('.menu-ul').show();
                $('.menu-ul').html(that.html);
                // if ($('.menu-ul div').data('select')) {
                $('.allPrice.fa.fa-caret-down').addClass('fa-caret-up').removeClass('fa-caret-down');
                $('.menu-ul div[data-select=true]').addClass('fa fa-check').siblings().removeClass('fa fa-check');

                // }

                that.isPrcie = false;
            } else {
                $('.menu-ul').hide();
                that.isPrcie = true;

            }

            $('.menu-ul').on('tap', '.menu-ul div', function () {
                $(this).addClass('fa fa-check').siblings().removeClass('fa fa-check');
                // var priceId=$(this).data('id');
                // $('.allPrice.fa').data('select-id',priceId);
                $(this).attr('data-select', true).siblings().removeAttr('data-select');
                that.html = $('.menu-ul').html()
                console.log(that.html);

                $('.menu-ul').hide();
                $('.allPrice.fa').html($(this).html());

                $('.allPrice.fa.fa-caret-up').addClass('fa-caret-down').removeClass('fa-caret-up');
                that.isPrcie = true;
            })
        })


    },
    // 获取地区信息
    getPlaceInfo: function () {
        var that = this;
        $('.place').on('tap', function () {
            // console.log(id);
            // 发送请求，菜单显示
            // var str;
            that.pullInfo('http://localhost:9090/api/getgsshoparea', that.select, that.cookieId, function (data) {
                $(that.select).attr('check', 'false');
                // console.log(data);

                //循环遍历
                for (var i = 0; i < data.result.length; i++) {
                    // console.log(that.cookieId);
                    that.cookieId = $('.menu-ul').data('place-id');
                    // console.log(that.cookieId);
                    var st = data.result[i].areaName;

                    st = st.substr(0, 2);
                    // console.log(st);

                    data.result[i].str = st;
                    // console.log(data);

                    if (that.cookieId == data.result[i].areaId) {
                        data.result[i].select = true;

                    }
                }
                var html = template('placeTpl', data);
                $('.menu-ul').html(html).show();

            }, '.place span');
        })
    },
    // 获取信息 渲染页面
    pullInfo: function (api, choose, id, callback, string) {

        var that = this;
        that.choose = choose;
        that.string = string;
        var temId = id;
        console.log(string);
        // api 地址  
        // param 是中介参数 
        // id 不同api接口的id  shopId areaId
        // callback  回调函数
        if (that.choose.check) {
            $.ajax({
                url: api,
                success: callback,
            });
            if (that.choose.is == 'place') {
                $('.place.fa.fa-caret-down').addClass('fa-caret-up').removeClass('fa-caret-down');
            } else {
                $('.shopping.fa.fa-caret-down').addClass('fa-caret-up').removeClass('fa-caret-down');
            }

            // 列表的点击选中事件
            that.choose.check = false;
            that.leftTap();

        } else {

            if (that.choose.is == 'place') {
                $('.place.fa.fa-caret-up').addClass('fa-caret-down').removeClass('fa-caret-up');
            } else {
                $('.shopping.fa.fa-caret-up').addClass('fa-caret-down').removeClass('fa-caret-up');
            }

            $('.menu-ul').hide();
            that.choose.check = true;

        }

    },

    // 获取商品信息
    getProduct: function (shopId, areaId, callback) {
        // var the.shopId=
        $.ajax({
            url: 'http://localhost:9090/api/getgsproduct',
            data: {
                shopid: shopId,
                areaid: areaId,
            },
            success: callback,
            // success: function(data){
            //     callback(data);
            // },
        })
    },
    // 事件发生地点 动态添加的菜单 .menu-ul li

    leftTap: function () {
        var that = this;

        $('.menu-ul').on('tap', '.menu-ul li', function (string, id) {
           
            var the = this;
            // 加字体图标
            $(this).addClass('fa fa-check').siblings().removeClass('fa fa-check');


            that.str = $(the).html();

            id = $(the).data('id');

            if (that.choose.is == 'place') {
                $('.menu-ul').data('place-id', id);
            } else {
                $('.menu-ul').data('shopping-id', id);
            }

            $(that.string).html(that.str);
            
            $('.menu-ul').hide();
            $('div.fa.fa-caret-up').addClass('fa-caret-down').removeClass('fa-caret-up');
            that.choose.check = false;



            that.shoppingId = $('.menu-ul').data('shopping-id');
            that.addressId = $('.menu-ul').data('place-id');
          


            that.getProduct(that.shoppingId, that.addressId, function (data) {

                console.log(data);
                that.page = 1;
                // 只显示4个商品
                // that.page
                var obj = {};
                obj.result = [];
                for (var i = 0; i < that.page * that.pageSize; i++) {
                    obj.result.push(data.result[i]);
                    console.log(obj);
                }

                var html = template('productTpl', obj);
                $('.box').html(html);
                mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
                $('.mui-scroll').css('transform', 'translateY(0px)');
                mui('#refreshContainer').pullRefresh().refresh(true);
                $('.top.fa').css('display', 'none');
            });
            mui.init();
           
        })
    },
    // 刷新
    refreshpProduct: function () {

    },
    // 下拉刷新 上拉加载
    upDownInit: function () {

        var that = this;
        mui.init({
            pullRefresh: {
                container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    auto: true, //可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        that.getProduct(that.shoppingId, that.addressId, function (data) {
                            console.log(data);
                            that.page = 1;
                            // 只显示4个商品
                            // that.page
                            var obj = {};
                            obj.result = [];
                            for (var i = 0; i < that.page * that.pageSize; i++) {
                                obj.result.push(data.result[i]);
                                console.log(obj);
                            }

                            var html = template('productTpl', obj);
                            $('.box').html(html);
                        });
                        // 结束下拉刷新
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        // 重置上拉加载
                        mui('#refreshContainer').pullRefresh().refresh(true);
                        
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                //   上拉
                up: {
                    height: 50, //可选.默认50.触发上拉加载拖动距离
                    auto: true, //可选,默认false.自动上拉加载一次
                    contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                        setTimeout(() => {

                            that.getProduct(that.shoppingId, that.addressId, function (data) {
                                console.log(data);
                                that.totalPage = Math.ceil(data.result.length / that.pageSize);
                                // 只显示4个商品
                                // that.page
                                var obj = {};
                                obj.result = [];

                                var num = that.page;
                                for (var i = that.page * that.pageSize; i < (num + 1) * that.pageSize; i++) {

                                    if (data.result[i]) {
                                        that.page = num + 1;
                                        obj.result.push(data.result[i]);
                                    }

                                    // console.log(obj);
                                    // that.page++;

                                }

                                var html = template('productTpl', obj);
                                // console.log(html);

                                $('.box').append(html);
                                // 一直加载
                                if (that.page == that.totalPage) {
                                    // 只是结束上拉加载  当前页  判断是不是最后一页了
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                } else {
                                    // 停止上拉加载 没有数据就停止上拉  显示没有数据了
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                }

                            });

                        }, 2000);
                    }
                }
            }
        });
    },
    // 回到顶部
    goTop: function () {
        console.log(document.body.scrollTop); //没结果
        $('.mui-scroll').scroll(function () { //滚动监听
            console.log($('.mui-scroll').scrollTop());

            if ($(".mui-scroll").offset().top < -1000) {
                // 判断是否id发生变化  可以在menu-ul li  的点击事件中加
               
                $('.top.fa').css('display', 'block');
                $('.top.fa').on('tap', function () {
                    mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
                    $('.top.fa').css('display', 'none');
                });

            }

        })


    }
}