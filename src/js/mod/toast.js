require('less/toast.less')
function toast(msg, time) {
    this.msg = msg
    this.showTime = time||1000
    this.createEl()
    this.showToast()
}
toast.prototype = {
    createEl: function(){
        var tpl = `<div class="toast">${this.msg}</div>`;
        console.log(this);
        
        this.$toast = $(tpl);
        $('body').append(this.$toast);
    },
    showToast: function(){
        this.$toast.fadeIn(300, () => {
            setTimeout(() => {
                this.$toast.fadeOut(300, () => this.$toast.remove())
            }, this.showTime)
        })
    }
}

function Toast(msg, time) {
    return new toast(msg, time);
}

module.exports.Toast = Toast;