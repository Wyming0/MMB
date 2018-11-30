$(function(){
    // // 页面渲染
    // $.ajax({
    //     url:"http://localhost:9090/api/getmoneyctrl",
    //     data:{pageid:0},
    //     success:function(data){
    //         var html=template("saveMoneyTpl",data);
    //         $("#main ul").html(html);
    //     }
    // });
    // // 下拉框数量
    // var pages;
    // $.ajax({
    //     url:"http://localhost:9090/api/getmoneyctrl",
    //     data:{pageid:0},
    //     success:function(data){
    //         pages=Math.ceil(data.totalCount/data.pagesize);
    //         var html=template("saveMoneyTplOp",{opt:Math.ceil(pages)});
    //         $("#select").html(html);
    //     }
    // });
    // console.log(pages);

    // // 下拉框改变事件
    // $("#select").on("change",function(){
    //     var page=$("select").val();
    //     $.ajax({
    //         url:"http://localhost:9090/api/getmoneyctrl",
    //         data:{pageid:page-1},
    //         success:function(data){
    //             var html=template("saveMoneyTpl",data);
    //             $("#main ul").html(html);
    //         }
    //     })
    // })
    // // 上一页点击事件
    // $(".btn-up").on("tap",function(){
    //     var page=$("select").val();
    //     if (page>1) {
    //         $.ajax({
    //             url:"http://localhost:9090/api/getmoneyctrl",
    //             data:{pageid:page-2},
    //             success:function(data){
    //                 var html=template("saveMoneyTpl",data);
    //                 $("#main ul").html(html);
    //             }
    //         });
    //         console.log(page-1);
            
    //         $("#select").val(page-1);
    //     }
    // });
    // // 下一页点击事件
    // $(".btn-down").on("tap",function(){
    // });
    
    var zwh=new Zwh();
    zwh.render();
    zwh.optCreate();
    zwh.optChange();
    zwh.upClick();
    zwh.downClick();
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
});
var Zwh=function(){};
Zwh.prototype={
    page:"",
    pages:"",
    // 页面渲染
    render:function(page){
        $.ajax({
            url:"http://localhost:9090/api/getmoneyctrl",
            data:{pageid:page||0},
            success:function(data){
                var html=template("saveMoneyTpl",data);
                $("#main ul").html(html);
            }
        });
    },
    // 下拉框数量
    optCreate:function(){
        var that=this;
        $.ajax({
            url:"http://localhost:9090/api/getmoneyctrl",
            data:{pageid:0},
            success:function(data){
                that.pages=Math.ceil(data.totalCount/data.pagesize);
                var html=template("saveMoneyTplOp",{opt:Math.ceil(that.pages)});
                $("#select").html(html);
            }
        });
    },
    // 下拉框改变事件
    optChange:function(){
        var that=this;
        $("#select").on("change",function(){
            that.page=$("select").val();
            that.render(that.page-1);
        });
    },
    // 上一页点击事件
    upClick:function(){
        var that=this;
        $(".btn-up").on("tap",function(){
            that.page=$("select").val();
            if (that.page>1) {
                that.render(that.page-2);
                $("#select").val(that.page-1);
            }
        });
        return that;
    },
    // 下一页点击事件
    downClick:function(){
        var that=this;
        $(".btn-down").on("tap",function(){
            // console.log(that.pages);
            that.page=$("select").val();
            // console.log(that.page);
            if (that.page<that.pages) {
                that.render(+that.page);
                $("select").val(+that.page+1);
            }
        });
    }
}