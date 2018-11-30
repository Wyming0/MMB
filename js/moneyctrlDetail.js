/*
* @Author: ÉÙÅ®ÐÄ
* @Date:   2018-11-26 16:27:36
* @Last Modified by:   少女心
* @Last Modified time: 2018-11-27 21:43:25
*/

'use strict';

$(function(){
  var productid = getQueryString('productid');
  var mbb = new MBB(productid);
  mbb.getmoneyctrlproduct();
});

var MBB = function(productid){
  this.productid=productid;
}

MBB.prototype = {
  getmoneyctrlproduct:function(){
    var obj ={
      productid:this.productid
    }
    this.MMBajax('http://localhost:9090/api/getmoneyctrlproduct','get',obj,function(data){
        console.log(data);
        // var str = data.result[0].productCity;
        // data.result[0].productCity= str.replace(/[\r\n]/g, '');
        // console.log(data.result[0].productCity);
        // str =data.result[0].productComment;
        // data.result[0].productCity= str.replace(/[\r\n]/g, '');
        var html = template("moneyctrlDetailTmp",data);
        console.log(html);
        $("#main").html(html);
    });
  },
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

//获取url的值
function getQueryString (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
    }