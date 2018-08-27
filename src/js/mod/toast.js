function toast(msg, time,status) {
    this.msg = msg
    this.showTime = time||1000
    this.createEl(status)
    this.showToast()
}
toast.prototype = {
    createEl: function(status){
        var tpl = '';
        if(status === 'success'){
          tpl = `<div class="toast">${this.msg}</div>`;
        }else if(status === 'error'){
          tpl = `<div class="toast error">${this.msg}</div>`;
        }else{
          tpl = `<div class="toast">${this.msg}</div>`;
        }
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

function Toast(msg, time, status) {
    return new toast(msg, time, status);
}

module.exports.Toast = Toast;