$(function(){
    // 发送ajax请求 把请求到的数据渲染到模板上
    $.ajax({
        url:"http://localhost:9090/api/getcoupon",
        success:function(data){
            console.log(data);
            console.log(data.result[0].couponTitle);

            // 调用模板
            var html = template('getcouponTPL', data);
            $(".main-list").html(html);
        }
    }),

    // 返回到上一级页面
    $(".return-icon").on('tap',function(){
        location="index.html";
    })
})