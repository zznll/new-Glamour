define(["jquery"], function() {
    function Img(){
    }
    Img.prototype={
        constructor:Img,
        init(ele){
            this.ele=$(ele);
            if (!this.ele) return;
            this.ele.on("mouseenter", function () {
                this.bigimg();
            }.bind(this))
            this.ele.on("mouseleave", function () {
                this.smallimg();
            }.bind(this))
        },
        bigimg(){
            this.img=$(event.target).find(("img"));
            this.img
            .stop()
            .animate({
                "width":340+"px",
                "height":212+"px",
                "marginLeft":-10+"px",
                "marginTop":-10+"px"
            },600)
        },
        smallimg(){
            this.img
            .stop()
            .animate({
                "width":320+"px",
                "height":192+"px",
                "marginLeft":0,
                "marginTop":0
            },400)
        }
    }   
    return new Img();
});