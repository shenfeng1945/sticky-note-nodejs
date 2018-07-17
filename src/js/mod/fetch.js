let Toast = require('./toast.js').Toast;
function fetch(url,data){
    if(data){
        return new Promise((resolve,reject)=>{
            $.post(url,data)
             .done(res=>{
               resolve(res)
             }).fail(()=>{
                Toast('网络异常')
             })
        })
    }else{
        return new Promise((resolve,reject)=>{
            $.get(url)
             .done(res=>{
               resolve(res)
             }).fail(()=>{
                Toast('网络异常')
             })
        })
    }
    
}
module.exports.fetch = fetch;