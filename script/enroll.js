function Enroll() {
    this.btn = $(".reg_btn");
    this.phone = $(".hao");
    this.password = $(".pwd");
    this.checke = $(".check");
    this.init();
}
Enroll.prototype = {
    init() {
        // console.log(this.flag)
        this.checke.on("click", function () {
            this.flag = $(this.checke).is(":checked");
            //console.log(this.flag);
            this.check = $(".disagree");
            this.add_rsg();
            //return this.flag;
            if (this.flag) {
                this.btn.click(function () {
                    this.rsg_test()
                    this.act = $(".act_error")
                    this.pwd = $(".Pwd_error")
                    this.add_css();
                    if (!!this.phonetest && !!this.pwdtest) {
                        //console.log(1);
                        this.add_database();
                    }
                }.bind(this));          
            } else {
                this.btn.unbind();
                  // this.btn[0].onclick = this.zhuce;
                // this.btn[0].onclick = null;解除绑定事件；
            }
        }.bind(this))
        console.log(this.flag);

    },
    rsg_test() {
        this.phoneval = this.phone.val();
        var phonereg = /^\d{3,11}$/;
        this.phonetest = phonereg.test(this.phoneval);
        this.pwdval = this.password.val();
        var pwdreg = /^\w{4,10}$/;
        this.pwdtest = pwdreg.test(this.pwdval);
    },
    add_css() {
        if (!this.phonetest) {
            //console.log(this.act);
            $(this.act).css("display", "block");
        } else {
            $(this.act).css("display", "none");
        }
        if (!this.pwdtest) {
            $(this.pwd).css("display", "block");
        } else {
            $(this.pwd).css("display", "none");
        }
    },
    add_rsg() {
        if (this.flag) {
            $(this.check).css(
                {
                    "background": "black",
                    "color": "#fff"
                }
            );
        } else {
            $(this.check).css(
                {
                    "background": "#ddd",
                    "color": "#333"
                }
            );
        }
    },
    add_database() {
        var username = this.phoneval;
        var password = this.pwdval;
        var opts = {
            url: "http://localhost/0516/0516/user.2.php",
            type: "POST",
            data: { username: username, password: password, type: "register" }
        }
        $.ajax(opts)
            .then(function (res) {
                this.res = res;
                if (!!this.res) {
                    this.add_cookie();
                }
            }.bind(this))
    },
    add_cookie() {
        if (!$.cookie("rsgcar")) {
            rsgarr = [
                {
                    username: this.phoneval,
                    password: this.pwdval
                }
            ];
            $.cookie("rsgcar", JSON.stringify(rsgarr));
            alert("注册成功，继续浏览")
            location.href = "index.html";
            return 0;
        };
        var rsgstring = $.cookie("rsgcar");
        var rsgarr = JSON.parse(rsgstring);
        var hasItem = false;
        rsgarr.forEach(function (item) {
            //console.log(this.phoneval);
            if (item.username == this.phoneval) {
                alert("已注册，请登录")
                location.href = "login.html";
                var hasItem = true;
                return 0;
            }
            if (!hasItem) {
                var item = {
                    username: this.phoneval,
                    password: this.pwdval
                }
                rsgarr.push(item)
            }
            $.cookie("rsgcar", JSON.stringify(rsgarr));
            alert("注册成功，继续浏览")
            location.href = "index.html";
        }.bind(this))

    }
}

new Enroll;

