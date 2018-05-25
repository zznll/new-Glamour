function Addcar() {
    this.init()
}
Addcar.prototype = {
    constructor: Addcar,
    init() {
        this.btn = $(".listmain").find("button");
        console.log(this.btn)
        this.btn.on("click", function () {
            this.addcar();
        }.bind(this))
    },
    addcar(event) {
        var shopid = $(event.target).attr("data-id");
        console.log(shopid)
    }
}
new Addcar();