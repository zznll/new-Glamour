function Pag() {
    this.ul = $(".listmain");
    this.btn = $(".paga");
    this.span = this.btn.find("span");
    this.pag = 1;
    this.pagnum = 5;
    this.init();
}
Pag.prototype = {
    init() {
        this.pnum=$(".pnum");
        this.pagnumbtn = $(".pagbtn");
        this.pre = $(".pre");
        this.next = $(".next");
        this.tpre=$(".pag2");
        this.tnext=$(".pag3");
        this.load_data()
            .then(function (res) {
                // console.log(res.data);
                this.json = res.data[1];
                this.rander_page();
            }.bind(this));

        this.btn.on("click", "span", function () {
            this.change_pag();
        }.bind(this));

        this.pre.on("click", { type: "pre" }, $.proxy(this.pre_next, this));
        this.tpre.on("click", { type: "pre" }, $.proxy(this.pre_next, this));
        this.next.on("click", { type: "next" }, $.proxy(this.pre_next, this));
        this.tnext.on("click", { type: "next" }, $.proxy(this.pre_next, this));
        this.pagnumbtn.on("click", { type: "input" }, $.proxy(this.pre_next, this));
    },
    load_data() {
        opts = {
            url: "http://localhost/Glamour/data/data.json",
            dataType: "json",
            data: { data: this.page }
        }
        return $.ajax(opts);
    },
    rander_page() {
        var html = "";
        this.json.forEach(function (item) {
            //console.log(item);
            html += `<li>
                    <img src="${item.bigimg[0]}">
                    <p>DOLCE&GABBANA</p>
                    <a href="###">${item.name}</a>
                    <span class="redpic">￥${item.price}</span>
                    <span class="underpic">￥${item.preprice}</span>
                    <button class="addcarbtn" data-id=${item.id}>加入购物车</button>
                    <div class="imgshowbox">
                            <ul class="imgtop clear">
                                <li class="m1">${item.size[0]}</li>
                                <li class="m2">${item.size[1]}</li>
                                <li class="m3">${item.size[2]}</li>
                            </ul>
                            <div class="smallimg">
                                <img class="img1" src="${item.smallimg[0]}" alt="">
                                <img class="img2" src="${item.smallimg[1]}" alt="">
                                <img class="img3" src="${item.smallimg[2]}" alt="">
                            </div>
                        </div>
                    </li>`
        });
        this.ul.html(html);
    },
    change_pag() {
        var target = $(event.target).index();
        //console.log(target)
        this.page = target + 1;
        this.load_data()
            .then(function (res) {
                //console.log(1);
                this.json = res.data[this.page]
                this.rander_page();
            }.bind(this))
        $(event.target).siblings().removeClass("bspan");
        $(event.target).addClass("bspan");
        this.pnum.html(this.page);
    },
    pre_next(event) {
        var targetnum = this.btn.find(".bspan").index();
        this.page = targetnum + 1;
        var typelist = {
            "pre": function () {
                //console.log(this.page)
                if (this.page == 1) {
                    this.page = 5;
                } else {
                    this.page -= 1;
                }
                this.load_data()
                    .then(function (res) {
                        //console.log(1);
                        this.json = res.data[this.page]
                        this.rander_page();
                    }.bind(this))
                $(this.span[this.page - 1]).siblings().removeClass("bspan");
                $(this.span[this.page - 1]).addClass("bspan");
                this.pnum.html(this.page);
            }.bind(this),
            "next": function () {
                if (this.page == 5) {
                    this.page = 1;
                } else {
                    this.page += 1;
                }
                this.load_data()
                    .then(function (res) {
                        this.json = res.data[this.page]
                        this.rander_page();
                    }.bind(this))
                $(this.span[this.page - 1]).siblings().removeClass("bspan");
                $(this.span[this.page - 1]).addClass("bspan");
                this.pnum.html(this.page);
            }.bind(this),
            "input": function () {
                var num = $(".pagin").val();
                this.page = num;
                this.load_data()
                    .then(function (res) {
                        this.json = res.data[this.page]
                        this.rander_page();
                    }.bind(this))
                    $(this.span[this.page - 1]).siblings().removeClass("bspan");
                    $(this.span[this.page - 1]).addClass("bspan");
                    this.pnum.html(this.page);
            }.bind(this)
        }
        typelist[event.data.type]();
    }
}
new Pag();