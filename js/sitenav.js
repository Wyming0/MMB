$(function () {
  var mmb = new MMB();
  mmb. getsitena();
})

var MMB = function () {

}
MMB.prototype = {
    baseURL: 'http://localhost:9090/',
    getsitena: function () {
        var that = this;
        $.ajax({
            url:that.baseURL+'api/getsitenav',
            success:function(data){
                console.log(data);
                var html = template('getsitenaTpl',data);
                $('.link').html(html);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                    indicators: false, //是否显示滚动条
                });
            }
        });
    }
    
}