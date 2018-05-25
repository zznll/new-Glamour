; +function ($) {
    $.fn.Navimove = function (ele,data,pos) {
        new Navmove(ele,data,pos);
    }

    function Navmove(ele,data,pos) {
        this.init(ele, data,pos)
    }
    Navmove.prototype = {
        constructor: Navmove,
        init(ele,data,pos) {
            this.ele = $(ele);
            this.move=data;
            this.pos=pos;
            $(window).scroll(function () {
                this.nav_move();
            }.bind(this))
        },
        nav_move() {
            this.scroll = $("html,body").scrollTop();
            //console.log(this.ele,this.scroll)
            //console.log(this.ele.scrollTop())
            if (this.scroll > this.move) {
                this.ele.css({
                    "position": "fixed",
                    "top": this.pos,
                    "zIndex": 99999999
                })
            } else {
                this.ele.css({
                    "position": "relative",
                    "top": 0,
                    "zIndex": 9
                })
            }
        }
    }


}(jQuery);
