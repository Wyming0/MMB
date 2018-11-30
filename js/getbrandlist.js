/*
* @Author: 少女心
* @Date:   2018-11-26 17:29:58
* @Last Modified by:   少女心
* @Last Modified time: 2018-11-27 12:10:27
*/

'use strict';

$(function(){
  var brandtitleid=getQueryString('brandtitleid');
  var mmb = new MMB(brandtitleid);
  //十大品牌的销量排行
  // mmb.getbrandproductlist();
  // //获取十大品牌列表
  // mmb.getbrand();
  // //排行商品的评论
  // console.log(mmb.getsuccessAjax);
  // mmb.getproductcom();
  mmb.getalldata();
});

var  MMB = function(brandtitleid){
  this.brandtitleid=brandtitleid;
}

MMB.prototype = {
  productMessage:{},
  getsuccessAjax:0,
  //获取十大品牌列表
  // getbrand:function(){
  //   var that = this;
  //   var obj = {
  //     brandtitleid:this.brandtitleid
  //   }
  //   // return; 
  //   this.MMBajax('http://localhost:9090/api/getbrand','get',obj,function(data){
  //      var html = template("brandTmp",data);
  //      // console.log(html);
  //      $(".content .mediaUl").html(html);
  //   });
  // },
  // // //十大品牌的销量排行
  // getbrandproductlist:function(){
  //   var that = this;
  //   var obj = {
  //     brandtitleid:this.brandtitleid,
  //     pagesize :4
  //   }
  //   // return; 
  //   this.MMBajax('http://localhost:9090/api/getbrandproductlist','get',obj,function(data){
  //       that.productMessage =data.result[0];
  //       var html = template('salesTmp',data);
  //       $(".content .salesTopUl").html(html);
  //       $('.salesTopUl .salesTopItems img').addClass('mui-media-object mui-pull-left saletopImg')
  //   });
  // },
  // // //排行商品的评论api
  // getproductcom:function(){
  //   var that = this;
  //     var id = that.productMessage.productId;
  //     var obj = {
  //       productid:id
  //     }
  //     this.MMBajax('http://localhost:9090/api/getproductcom','get',obj,function(data){
  //         console.log(data);
  //         data.img = that.productMessage.productImg;
  //         var html =template('comTmp',data);
  //         that.getsuccessAjax=0;
  //     });
  //   },
  //获取所有信息
  getalldata:function(){
     var that = this;
    var obj = {
      brandtitleid:this.brandtitleid
    }
    var obj2 = {
      brandtitleid:this.brandtitleid,
      pagesize :4
    }
    // return; 
    that.MMBajax('http://localhost:9090/api/getbrand','get',obj,function(data){
       var html = template("brandTmp",data);
       $(".content .mediaUl").html(html);
       //执行第二次ajax
       var obj2 = {
          brandtitleid:that.brandtitleid,
          pagesize :4
        }
        that.MMBajax('http://localhost:9090/api/getbrandproductlist','get',obj2,function(data){
          that.productMessage =data.result[0];
          var html = template('salesTmp',data);
          $(".content .salesTopUl").html(html);
          $('.salesTopUl .salesTopItems img').addClass('mui-media-object mui-pull-left saletopImg')
    
            //执行第三次ajax
            var obj3 = {
              productid:that.productMessage.productId
            }
              that.MMBajax('http://localhost:9090/api/getproductcom','get',obj3,function(data){
                  console.log(data);
                  data.info = that.productMessage;
                  var html =template('comTmp',data);
                  $(".content .comentUl").html(html);
                  $(".content .comentUl .comentItems img").addClass('mui-media-object mui-pull-left saletopImg')
            });
        });
    });
  },
  //ajax函数
  MMBajax:function(path,type,data,callback){
    $.ajax({
      url: path,
      type: type,
      data: data,
      success:function(data){
        callback(data);
      }
    });
  }
}

//获取url参数
//获取url的值
function getQueryString (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
    }

