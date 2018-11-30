$(function(){
    var mmb = new Mmb();
    mmb.queryCategory();
    //mmb.queryCategoryList();
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006});
    });
//mui框架a标签无法跳转的委托事件
    mui('#main').on('tap','a',function(){
        console.log(this);
        window.top.location.href=this.href;
    });

});

    var Mmb = function(){};
    Mmb.prototype = {
        index : 0,
        //获取大分类
        queryCategory:function(){
            var that = this;
            $.ajax({
                url:"http://localhost:9090/api/getcategorytitle",
                dataType:'json',
                success:function(result){
                    var html = template('categoryTitleTpl',result);
                    $('.categoryContent').html(html);
                    //调用渲染，取到每一个大分类的id，传给列表的请求
                    for(i=0;i<result.result.length;i++){
                        titleid =  result.result[i].titleId;
                        that.queryCategoryList(titleid);

                    }

                }
            })

        },
        //获取小分类
        queryCategoryList:function(titleid){
            var that =this;
            console.log(titleid);
            $.ajax({
                url:"http://localhost:9090/api/getcategory",
                data:{titleid:titleid},
                dataType:'json',
                success:function(data){//data是个对象
                    //console.log(data);//data={result: Array(10)}   data.result=10个数组  each data.result value= 每个数组里的对象 value.id=id
                    //var html = template('categoryTitleTpl',data.result);

                    var html = template('categoryListTpl',{'result':data.result});//直接取出数组里的数据，拿到模板里遍历

                    //console.log(html);//所有分类，8组
                    //$('.productList').html(html);
                    //var pp = $('.productList').html();//8组数据全都加进小分类，覆盖，取最后一次，数据不是想要的
                    //console.log(pp);

                    $('.productList')[that.index].innerHTML=html;
                    that.index++;//每次添加完++，避免再次覆盖
                }
            })
        }
    }