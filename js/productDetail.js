$(function () {
  let productId = getQueryString("productId")||1;
  $.ajax({
    url : "http://localhost:9090/api/getproduct",
    data : {productid :productId},
    success : function (data) {
      let productDetail = template("productDetailTpl",data.result[0]);
      $(".product-detail ").html(productDetail);
      $.ajax({
        url: "http://localhost:9090/api/getcategorybyid",
        type: "get",
        dataType: "json",
        data: {categoryid: data.result[0].categoryId},
        success(obj) {
          $(".reback .categoty").html(obj.result[0].category).data("id",obj.result[0].categoryId);
        }
      })
    }
  })
  $.ajax({
    url : "http://localhost:9090/api/getproductcom",
    data : {productid :productId},
    success : function (data) {
      let comment = template("commentTpl",data);
      $(".comments").html(comment);
    }
  })
  $(".reback .categoty").on("tap",function () {
    let categoryId = $(this).data("id");
    location.href = "productList.html?categoryId="+categoryId;
  })
})
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}