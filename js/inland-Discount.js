$(function(){
    $.ajax({
        url:'http://localhost:9090/api/getinlanddiscount',
        type: 'get', 
        dataType: 'json', 
        success:function(data){
            console.log(data);
            var html =template('inland-DiscountTpl',data);
            $('.mui-row').html(html);
        }
    });

// mui.init({
//     pullRefresh : {
//       container:refreshContainer,//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
//       up : {
//         height:50,//可选.默认50.触发上拉加载拖动距离
//         auto:true,//可选,默认false.自动上拉加载一次
//         contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
//         contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
//         callback :function(){
//             setTimeout(function(){
//                 $.ajax({
//                     url:'http://localhost:9090/api/getinlanddiscount',
//                     type: 'get', 
//                     dataType: 'json', 
//                     success:function(data){
//                         console.log(data);
//                         var html =template('inland-DiscountTpl',data);
//                         $('.mui-row').html(html);
//                     }
//                 })
//             },500)
//             this.endPullupToRefresh(true|false);
//         } 
//       }
//     }
//   });

mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

})