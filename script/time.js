function Gettime() {
    this.day = $(".day");
    this.hour = $(".hour");
    this.min = $(".min");
    this.sed = $(".sed");
    this.init();
}
Gettime.prototype = {
    constructor: Gettime,
    init() {
        this.get_time();
        this.rander_page();
        setInterval(function () {
            this.get_time();
            this.rander_page();
        }.bind(this), 1000)
    },
    get_time() {
        var EndTime = new Date('2018/06/01 17:30:00');
        var NowTime = new Date();
        var t = EndTime.getTime() - NowTime.getTime();
        if (t >= 0) {
            this.d = Math.floor(t / 1000 / 60 / 60 / 24);
            this.h = Math.floor(t / 1000 / 60 / 60 % 24);
            this.m = Math.floor(t / 1000 / 60 % 60);
            this.s = Math.floor(t / 1000 % 60);
        }
    },
    rander_page() {
        //console.log(this.day)
        this.day.html(this.d);
        this.hour.html(this.h);
        this.min.html(this.m);
        this.sed.html(this.s);
    }
}
new Gettime();
