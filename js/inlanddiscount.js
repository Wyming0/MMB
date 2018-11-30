/*
* @Author: ÉÙÅ®ÐÄ
* @Date:   2018-11-26 16:27:36
* @Last Modified by:   少女心
* @Last Modified time: 2018-11-28 09:36:58
*/

'use strict';

$(function(){
  var mbb = new MBB();
  mbb.getinlanddiscount();
});

var MBB = function(){

}

MBB.prototype = {
  getinlanddiscount:function(){
    this.MMBajax('http://localhost:9090/api/getinlanddiscount','get','',function(data){
        // console.log(data);
        var html = template("inlanddiscountTmp",data);
        // console.log(html);
        $(".product .productUl").html(html);
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