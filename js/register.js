$(function () {
    var check = new Check();
    var code = null;
    var userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
    console.log(userInfo);
    $(".username").on("focus",function () {
      $(this).next().removeClass("icon-duicuo").removeClass("icon-duicuo-").removeClass("flag1").removeClass("flag");
    })
    $(".username").on("blur ",function () {
      check.checkEl(this);
    });
    $(".password1").on("focus",function () {
      check.checkEl(".username");
      $(this).next().removeClass("icon-duicuo").removeClass("icon-duicuo-").removeClass("flag1").removeClass("flag");
    })
    $(".password1").on("blur ",function () {
      check.checkEl(this);
      check.checkPwd($(this).val(),this);
    });
    $(".password2").on("focus",function () {
      check.checkEl(".username");
      // check.checkEl(".password1");
      $(this).next().removeClass("icon-duicuo").removeClass("icon-duicuo-").removeClass("flag1").removeClass("flag");
    
    })
    $(".password2").on("blur ",function () {
      check.checkEl(this);
      if ($(".password1").val()!=$(this).val()){
        mui.toast( "密码不一致,请重新输入", { duration:'short', type:'div' });
        $(this).next().removeClass("icon-duicuo-").addClass("icon-duicuo").removeClass("flag").addClass("flag1");
      }
    });
    $(".tel").on("focus",function () {
      check.checkEl(".username");
      // check.checkEl(".password1");
      // check.checkEl(".password2");
      $(this).next().removeClass("icon-duicuo").removeClass("icon-duicuo-").removeClass("flag1").removeClass("flag");
    
    })
    $(".tel").on("blur ",function () {
      check.checkPhone($(this).val(),this);
    });
    $(".code-num").on("focus",function () {
      check.checkEl(".username");
      // check.checkEl(".password1");
      // check.checkEl(".password2");
      $(this).next().removeClass("icon-duicuo").removeClass("icon-duicuo-").removeClass("flag1").removeClass("flag");
    
    })
    $(".code-num").on("blur ",function () {
      check.checkEl(this);
    });
    $(".email").on("focus",function () {
      check.checkEl(".username");
      // check.checkEl(".password1");
      // check.checkEl(".password2");
      check.checkEl(".code-num");
      $(this).next().removeClass("icon-duicuo").removeClass("icon-duicuo-").removeClass("flag1").removeClass("flag");
    })
    $(".email").on("blur ",function () {
      check.checkEl(this);
      check.checkEmail($(this).val(),this)
    });
    $(".code").on("tap",function () {
      if (check.checkPhone($(".tel").val())) {
        code = getRandom();
        console.log(code);
      }
    })
    $(".register-btn").on("tap",function () {
      var inputCode = $(".code-num").val().trim();
      var result =  check.checkPhone($(".tel").val());
      check.checkEl(".email");
      check.checkEmail($(".email").val(),$(".email"));
      if ($(".flag1").length > 0 || $(".flag").length==0 || !result) {
        mui.toast( "注册信息不正确,请仔细检查", { duration:'short', type:'div' });
      }else if (code != inputCode || inputCode ==""){
        mui.toast( "验证码错误", { duration:'short', type:'div' });
      }else {
        var flag = true
        var username  = $(".username").val();
        var password1 = $(".password1").val();
        var tel = $(".tel").val();
        var email = $(".email").val();
        var user = {
          username,
          password1,
          tel,
          email
        }
        for (var i = 0; i < userInfo.length; i++) {
          if (userInfo[i].username == username) {
            mui.toast( "用户名重复", { duration:'short', type:'div' });
            flag = false;
            break;
          }else if (userInfo[i].tel == tel){
            mui.toast( "手机账号已被使用", { duration:'short', type:'div' });
            flag = false;
            break;
          }else if (userInfo[i].email = email){
            mui.toast( "邮箱已被使用", { duration:'short', type:'div' });
            flag = false;
            break;
          }
        }
        if (flag ){
          userInfo.push(user)
          mui.alert( "恭喜!注册成功", "提示", "开始登录", function () {
            location.href = "login.html";
          })
          
          localStorage.setItem("userInfo",JSON.stringify(userInfo));
        }
      }
    })
  })
  var Check = function () {
  }
  Check.prototype = {
    flag : true,
    checkEl(el) {
    if($(el).val().trim()){
      $(el).next().removeClass("icon-duicuo").addClass("icon-duicuo-").removeClass("flag1").addClass("flag");
    }else {
      $(el).next().removeClass("icon-duicuo-").addClass("icon-duicuo").removeClass("flag").addClass("flag1");
      this.flag = false
    }
  },
    checkPwd(newpsd ,el) {
    var reg = /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i;
    if (reg.test(newpsd)) {
      $(el).next().removeClass("icon-duicuo").addClass("icon-duicuo-").removeClass("flag1").addClass("flag");
    } else {
      $(el).next().removeClass("icon-duicuo-").addClass("icon-duicuo").removeClass("flag").addClass("flag1");
      this.flag = false
      mui.toast( "密码格式不正确,请重新输入", { duration:'short', type:'div' });
    }
  },
    checkEmail(str,el){
    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (re.test(str)) {
      $(el).next().removeClass("icon-duicuo").addClass("icon-duicuo-").removeClass("flag1").addClass("flag");
    } else {
      $(el).next().removeClass("icon-duicuo-").addClass("icon-duicuo").removeClass("flag").addClass("flag1");
      this.flag = false
      mui.toast( "邮箱格式不正确,请重新输入", { duration:'short', type:'div' });
    }
  },
   checkPhone(phone,el){
    if(!(/^1[34578]\d{9}$/.test(phone))){
      this.flag = false;
      mui.toast( "手机号码不正确,请重新输入", { duration:'short', type:'div' });
      return false;
    }else {
      return true;
    }
  }
  }
  function getRandom() {
    var code ="";
    for (var i = 0; i < 6; i++) {
      code += Math.floor(Math.random()*10) ;
    }
    return code;
  }