define(["jquery"], function () {
    function Pop() {
    }
    Pop.prototype = {
        constructor: Pop,
        init(selector) {
            this.ele = $(selector);
            if (!this.ele) return;
            this.ele.on("mouseenter", function () {
                this.addpop();
            }.bind(this))
            this.ele.on("mouseleave", function () {
                this.removepop();
            }.bind(this))
        },
        addpop() {
            this.popele = $(event.target).find(("div"));
            this.popele.addClass("pop-css")              
            //console.log(event.target);
            this.span = $(event.target).find(("span"));
            //console.log(this.span.html());
            this.popele.html(this.span.html());
        },
        removepop() {
            this.popele.removeClass("pop-css")
            this.popele.html("");
        }
    }
    return new Pop();
});
