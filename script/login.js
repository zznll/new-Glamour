function Enroll() {
    this.btn = $(".reg_btn");
    this.phone = $(".hao");
    this.password = $(".pwd");
    this.checke = $(".check");
    this.ul = $(".change");
    this.rl = $(".rlogin");
    this.rl.hide();
    this.init();
}
Enroll.prototype = {
    init() {
        this.checke.on("click", function () {
            this.flag = $(this.checke).is(":checked");
            console.log(this.flag);
            this.check = $(".disagree");
            this.add_rsg();
            //return this.flag;
        }.bind(this))

        // this.ul.children().on("click", function () {
        //     this.change_css();
        // }.bind(this))

        this.ul.children().on("click",$.proxy(this.change_css,this))

        this.btn.click(function () {
            this.rsg_test()
            this.act = $(".act_error")
            this.pwd = $(".Pwd_error")
            this.add_css();
            if (!!this.phonetest && !!this.pwdtest) {
                //console.log(1);
                this.add_database();
            }
        }.bind(this))
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
            //console.log(this.act);
            //console.log(this.pwd)
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
    change_css(event) {
        this.ll = $(".llogin");
        this.rl = $(".rlogin");
        $(event.target).parent().siblings().children("").removeClass("active")
        var index = $(event.target).data("index");
        if (index == 1) {
            this.ll.hide();
            this.rl.show ();
            // console.log($(item).index())      
        } else if (index == 0) {
            this.rl.hide();
            this.ll.show();
            console.log(this.rl.hide(), this.ll.show())
        }
        $(event.target).addClass("active")
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

            alert("未注册，请先注册")
            location.href = "login.html";
            return 0;
        };
        var rsgstring = $.cookie("rsgcar");
        var rsgarr = JSON.parse(rsgstring);
        var hasItem = false;
        rsgarr.forEach(function (item) {
            //console.log(this.phoneval);
            if (item.username == this.phoneval) {
                alert("登陆成功，继续浏览")
                location.href = "index.html";
                var hasItem = true;
                return 0;
            }
            if (!hasItem) {
                alert("未注册，请先注册")
                location.href = "login.html";
            }
        }.bind(this))

    }
}

new Enroll;
