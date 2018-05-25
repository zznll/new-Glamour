function Banner() {
    this.$span = $(".btnlist").children();
    //console.log(this.$span);
    this.$oul = $(".bannerul");
    this.$lbtn = $(".lbtn");
    this.$rbtn = $(".rbtn");
    this.$img = this.$oul.children("li");
    this.index = 0;
    // console.log(this.$img);
    // console.log(this.$oul);
    this.init();
}
Banner.prototype = {
    constructor: Banner,
    init() {
        this.ulwidth();
        //this.$img=this.$oul.find("li");
        this.show = 0;
        this.hidden = 0;
        this.point = 0;
        $(this.$rbtn)
            .on("click.changeIndex", { turn: "right" }, $.proxy(this.indexturn, this))
            .on("click.move", { turn: "right" }, $.proxy(this.imgmove, this))
            .on("click.omove", { turn: "spanmove" }, $.proxy(this.indexturn, this))
        $(this.$lbtn)
            .on("click.changeIndex", { turn: "left" }, $.proxy(this.indexturn, this))
            .on("click.move", { turn: "left" }, $.proxy(this.imgmove, this))
            .on("click.spanmove", { turn: "spanmove" }, $.proxy(this.indexturn, this))
        //this.auto();
    },
    indexturn(event) {
        var turnlist = {
            "left": function () {
                this.hidden = this.index;
                //console.log(this.$img.length)
                if (this.index == 0) {
                    this.index = this.$img.length - 2;
                    this.show = this.index;
                    $(this.$oul).css({
                        "margin-left": -this.$img[0].offsetWidth * (this.$img.length - 1) + "px"
                    })
                } else {
                    this.show = --this.index;
                }
            }.bind(this),
            "right": function () {
                this.hidden = this.index;
                //console.log(this.$img.length)
                if (this.index == this.$img.length - 1) {
                    this.index = 1;
                    this.show = this.index;
                    $(this.$oul).css({
                        "margin-left": 0
                    })
                } else {
                    this.show = ++this.index;
                }
            }.bind(this),
            "spanmove": function () {
                if (this.show == this.$img.length - 1 || this.show == 0) {
                    this.point = 0;
                } else {
                    this.point = this.show;
                }
                for (var i = 0; i < this.$span.length; i++) {
                    removeclassname(this.$span[i], "active");
                }
                addclassname(this.$span[this.point], "active");
            }.bind(this)
        }
        if (!(typeof turnlist[event.data.turn] == "function")) return 0;
        turnlist[event.data.turn]();
    },
    imgmove() {
        //move(this.$oul[0], this.show * -this.$img[0].offsetWidth, "marginLeft");
        $(this.$oul)
            .stop()
            .animate({
                "margin-left": this.show * -this.$img[0].offsetWidth + "px"
            })
    },
    ulwidth() {
        $ele = $(this.$img[0]).clone(true);
        //console.log($ele)
        $(this.$oul).append($ele);
        this.$img = this.$oul.children("li");
        //console.log(this.$oul)
        $(this.$oul).css({
            "width": this.$img[0].offsetWidth * this.$img.length + "px"
        })
        //console.log(this.$oul.width())
    }
}
new Banner();

function Removepart() {
    this.init()
}
Removepart.prototype = {
    constructor: Removepart,
    init() {
        this.top = $(".returntop");
        this.ul = $(".shopnavul");
        this.car = $(".shopsmallcar");
        //console.log($("html"))
        $(window).scroll(function () {
            this.addele();
        }.bind(this))

        window.onmousewheel = function (event) {
            var evt = event || window.event;
            this.addele(evt.wheelDelta);
        }.bind(this);

        this.top.on("click", function () {
            this.backtop();
        }.bind(this))

        this.ul.on("mouseenter", function () {
            //console.log(this.car)
            this.car.css({
                "display": "block"
            })
        }.bind(this))

        this.ul.on("mouseleave", function () {
            //console.log(this.car)
            this.car.css({
                "display": "none"
            })
        }.bind(this))
    },
    addele(data) {
        this.scroll = $("html,body").scrollTop();
        this.clientHeight = document.documentElement.clientHeight;
        this.nav = $(".navi");
        this.shoplist = $(".shoplist");
        if (this.scroll > this.clientHeight) {
            this.top.css({ "display": "block" })
        } else {
            this.top.css({ "display": "none" })
        }
        if (this.scroll > 150) {
            this.nav.css({
                "position": "fixed",
                "top": 0,
                "zIndex": 99999999
            })
        } else {
            this.nav.css({
                "position": "relative",
            })
        }
        if (data < 0) {
            console.log(this.shoplist);
            this.shoplist
                .stop()
                .animate({
                    "margin-top": "-=80",
                }, 200)
            var tops = parseInt(this.shoplist.css("margin-top"));
            console.log(tops);
            if (tops < -500) {
                this.shoplist
                .stop()
                .animate({
                    "margin-top": -550,
                }, 200)
                .stop()
            }
        } else if (data > 0) {
            this.shoplist
            .stop()
            .animate({
                "margin-top": "+=80",
            }, 100)
            var tops = parseInt(this.shoplist.css("margin-top"));
            console.log(tops);
            if (tops > -101) {
                this.shoplist
                .stop()
                .animate({
                    "margin-top": -100,
                }, 200)
                .stop()
            }
        }
    },
    backtop() {
        if (this.scroll > this.clientHeight) {
            console.log($("html"));
            $("html")
                .stop()
                .animate({
                    "scrollTop": 0
                }, 300)
            this.shoplist
                .stop()
                .animate({
                    "margin-top": -100,
                }, 200)
        }
    }
}
new Removepart();
