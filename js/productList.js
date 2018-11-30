$(function () {
  let pageId = 1;
  let categotyId = getQueryString("categoryId")||0;
  var productList =new Product(categotyId,pageId);
  productList.getProductList();
  productList.getCategory()
  productList.getNext();
  productList.getLast()
  // mui('.mui-scroll-wrapper').scroll({
  //   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  // });
  //进入商品详情
  $(".product-list-content").on("tap","li" ,function () {
    let productId = $(this).find(".product-id").data("id");
    location.href = "productDetail.html?productId="+productId;
  })
  //三级菜单点击效果
  $(".reback .categoty").on("tap",function () {
    let categoryId = $(this).data("id");
    console.log(categoryId);
    location.href = "productList.html?categoryId="+categoryId;
  })
  //选择页面跳转
  $("#num").on("change",function () {
    productList.pageId = +this.value;
    productList.getProductList();
  })
})

class Product {
  constructor(categotyId, pageId ) {
    this.categotyId = categotyId;
    this.pageId = pageId;
  }
  //获取prodcutList
  getProductList() {
    let that =this;
    $.ajax({
      url: "http://localhost:9090/api/getproductlist",
      type: "get",
      dataType: "json",
      data: {categoryid: this.categotyId, pageid: this.pageId},
      success(data) {
        //实现选择页面
        let totalPage = Math.ceil(data.totalCount/data.pagesize) ;
        $("#num").html("");
        for (var i = 1; i <= totalPage; i++) {
          let opt = document.createElement("option");
          opt.innerHTML = `${i}/${totalPage}`;
          opt.value = i;
          if (i ==that.pageId) {
            opt.selected=true;
          }
          $("#num").append(opt);
        }
        var productHtml = template("productListTpl", data);
        $(".product-list-content ul ").html(productHtml);
        that.maxPage = Math.ceil(data.totalCount/data.pagesize) ;
        
      }
    })
  }
  getCategory(){
    let that =this;
    $.ajax({
      url: "http://localhost:9090/api/getcategorybyid",
      type: "get",
      dataType: "json",
      data: {categoryid: that.categotyId},
      success(data) {
        $(".reback .categoty").html(data.result[0].category).data("id",data.result[0].categoryId);
      }
    })
  }
  //下一页
  getNext() {
    let that = this;
    $(".after").on("tap", function () {
      that.pageId++;
      if (that.pageId >that.maxPage) {
        mui.toast( "已经是最后一页了", { duration:'short', type:'div' })
        that.pageId =that.maxPage;
        return false;
      }
      that.getProductList();
    })
  }
  //上一页
  getLast(){
    let that = this;
    $(".before").on("tap", function () {
      that.pageId--;
      if (that.pageId < 1) {
        mui.toast( "已经是第一页了", { duration:'short', type:'div' })
        that.pageId =1;
        return false;
      }
      that.getProductList();
    })
  }
}
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}



