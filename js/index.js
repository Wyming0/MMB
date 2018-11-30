$(function(){
    //1.导航 -- 点击更多,显示第三排
    var a = true;
    $('#nav .nav-list').on('tap','.more',function(){
        if(a){
            $('#nav').css('height','auto');
            a=!a;
        }else{
            $('#nav').css('height',225);
            $('#nav').css('overflow','hidden');
            a=!a;
        }
       
    })
  

    //1.1导航--请求数据
    $.ajax({
        url:"http://localhost:9090/api/getindexmenu",
        success:function(data){
            console.log(data);
            var html = template('navTpl',data);
            $('#nav .nav-list').html(html);
        }

    });

    
    


    //2.点击清单跳转相应的商品页面
    $('#list ul').on('tap','li a',function(){
        // 1. 获取当前点击商品商品id
        var id = $(this).data('id');
        console.log(id);
        // 2. 使用location跳转详情页面
        location = 'moneyctrlDetail.html?productid=' + id;
    })



    //2.1清单列表 请求数据
    $.ajax({
        url:'http://localhost:9090/api/getmoneyctrl',
        dataType: "json",
        success:function(data){
            console.log(data);
            var html = template('goodsTpl',{list: data.result});
            $('#list .mui-table-view').html(html);
            $('li img').addClass('mui-media-object mui-pull-left');
            
        }
    });


   
    

















    
    //页面滚动
     mui('.mui-scroll-wrapper').scroll({
         deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
         indicators: false, //是否显示滚动条
     });
})