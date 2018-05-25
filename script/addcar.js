function Addcar() {
    this.init()
}
Addcar.prototype = {
    constructor: Addcar,
    init() {
        this.carnum = $(".shopcar");
        this.carmoney = $(".shopmoney");
        this.carnum.html(this.change_num());
        this.carmoney.html("￥"+this.change_pic());
        $(".listmain").on("click", ".addcarbtn", function () {
            this.addcar();
            this.carnum.html(this.change_num());
            this.carmoney.html("￥"+this.change_pic());
        }.bind(this))
    },
    addcar() {
        var shopid = $(event.target).attr("data-id");
        this.shoppic = $(event.target).attr("data-pic");
        if (!$.cookie("shopcar")) {
            var cararr = [
                {
                    id: shopid,
                    num: 1,
                    pic: this.shoppic
                }
            ]
            $.cookie("shopcar", JSON.stringify(cararr));
            console.log($.cookie("shopcar"));
            return 0;
        }
        var carstr = $.cookie("shopcar");
        var cararr = JSON.parse(carstr);
        var hasitem = false;
        cararr.forEach(function (item) {
            if (item.id == shopid) {
                item.num++;
                item.pic=item.num*this.shoppic;
                hasitem = true;
            }
        }.bind(this));
        if (!hasitem) {
            var item = {
                id: shopid,
                num: 1,
                pic:this.shoppic
            }
            cararr.push(item);
        }
        $.cookie("shopcar", JSON.stringify(cararr));
        console.log($.cookie("shopcar"));
    },
    change_num() {
        var carstr = $.cookie("shopcar");
        if (!!carstr) {
            var cararr = JSON.parse(carstr);
            var sum = 0;
            cararr.forEach(function (item) {
                sum += Number(item.num)
            });
            return sum;
        }
        return 0;
    },
    change_pic() {
        var carstr = $.cookie("shopcar");
        if (!!carstr) {
            var cararr = JSON.parse(carstr);
            var picsum = 0;
            cararr.forEach(function (item) {
                picsum += Number(item.pic)
            });
            return picsum;
        }
        return 0;
    }
}
new Addcar();