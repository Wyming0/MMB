$(function(){
    var id= getQueryString('id');
    console.log(id);
    var title= getQueryString('title');
    console.log(title);
    // 发送列表ajax请求 把请求到的数据渲染到模板上
    $.ajax({
        url:"http://localhost:9090/api/getcouponproduct",
        data:{couponid:id},
        success:function(data){
            console.log(data);
            
            // 调用模板
            var html = template('getcouponproductTPL', data);
            $(".main-content").html(html);
            
            $(".main-content>li img").addClass('mui-media-object mui-pull-left');

            titleId= $("#main h4").data("id");

            //调用标题模板
            var html = template('titleTop',{title:title});
            console.log(html);
            
            $(".head-box").html(html);
            
            //调用指示模板
            // 注意 如果调用模板用的是字符串 那么就要用对象包起来
            // 模板语法规定是这样的
            var html = template('indicateTop',{title:title});
            $(".present").html(html);
            
            $(".return-icon").on('tap',function(){
                location="coupon.html";
            });

            // 区域滚动初始化
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0115 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

            // 调用遮罩层模板
            var html = template('shadeTpl',data);
            console.log(html);
            $(".shade-content").html(html);
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
              interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 当图片列表中的li被点击时
            $(".main-content").on('tap','li',function(){
                $("#description").show();
                console.log('我被点击了');
                // $("#description").css('display','block');
            })

            $("#description .close").on('tap',function(){
                $("#description").hide();
                console.log('我被点击了');
                
            })
        }
    });
    
    
    

    

    

});



//别人使用正则写的获取url地址栏参数的方法
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
        // return unescape(r[2]);
        return decodeURI(r[2]);
    }
    return null;
}
