function Shopcar() {
    this.init();
}
Shopcar.prototype = {
    constructor: Shopcar,
    init() {
        this.ul = $(".goodsboxs");
        this.load_data()
            .then(function (res) {
                this.json = res.data[1];
                this.get_data();
                this.li = $(".goods");
                this.li.on("click", "button", function () {
                    this.remove_goods();
                }.bind(this))
                this.li.on("click", ".addnum", function () {
                    this.add_num();
                }.bind(this))
                this.li.on("click", ".rednum", function () {
                    this.red_num();
                }.bind(this))
            }.bind(this))
    },
    load_data() {
        opts = {
            url: "http://localhost/Glamour/data/data.json",
            dataType: "json",
            data: { data: this.page }
        }
        return $.ajax(opts);
    },
    get_data() {
        var carstr = $.cookie("shopcar");
        var cararr = JSON.parse(carstr);
        this.newcararr = [];
        cararr.forEach(function (item) {
            this.json.forEach(function (data) {
                if (item.id == data.id) {
                    data.num = item.num;
                    data.pic = item.pic;
                    this.newcararr.push(data);
                }
            }.bind(this))
        }.bind(this));
        //console.log(this.newcararr)
        this.rander_page();
    },
    rander_page() {
        var html = "";
        this.newcararr.forEach(function (item) {
            //console.log(item);
            html += `<li class="goods" data-id=${item.id} data-pic=${item.price}>
                    <span class="checkall "></span>
                    <img src="${item.bigimg[1]}" alt="">
                    <p>DOLCE&GABBANA</p>
                    <i>${item.name}</i>
                    <span class="goodpic">￥${item.price}</span>
                    <div class="numbox">
                        <span class="rednum">-</span>                            
                        <input class="innum" type="text" placeholder="1" value="${item.num}">
                        <span class="addnum">+</span>
                    </div>
                    <span class="you">￥0.00</span>
                    <span class="count">￥${item.pic}</span>
                    <button class="removen">删除</button>
                    </li>`
        });
        this.ul.html(html);
    },
    remove_goods(){
        var goodsid=$(event.target).parent("li").attr("data-id");
        //console.log(goodsid);
        var carstr = $.cookie("shopcar");
        var cararr = JSON.parse(carstr);
        cararr.forEach(function (item) {
            if(goodsid==item.id){
                cararr.splice(item,1);
                console.log(cararr)
            }
        });
        $.cookie("shopcar", JSON.stringify(cararr));
        location.reload();
    },
    add_num(){
        var goodsid=$(event.target).parent().parent("li").attr("data-id");
        var goodspic=$(event.target).parent().parent("li").attr("data-pic");
        //console.log(goodsid);
        var carstr = $.cookie("shopcar");
        var cararr = JSON.parse(carstr);
        cararr.forEach(function (item) {
            if(goodsid==item.id){
                item.num++
                item.pic=item.num*goodspic;
                //console.log(item.num)
            }
        });
        $.cookie("shopcar", JSON.stringify(cararr));
        location.reload();
    },
    red_num(){
        var goodsid=$(event.target).parent().parent("li").attr("data-id");
        var goodspic=$(event.target).parent().parent("li").attr("data-pic");
        //console.log(goodsid);
        var carstr = $.cookie("shopcar");
        var cararr = JSON.parse(carstr);
        cararr.forEach(function (item) {
            if(goodsid==item.id && item.num>0){
                item.num--
                item.pic=item.num*goodspic;
                //console.log(item.num)
            }
        });
        $.cookie("shopcar", JSON.stringify(cararr));
        location.reload();
    }
}
new Shopcar();