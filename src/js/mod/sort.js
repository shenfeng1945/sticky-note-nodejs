let sortRank = {
    swap:function(array, left, right) {
        let rightValue = array[right]
        array[right] = array[left]
        array[left] = rightValue
    },
    checkArray:function(array) {
        if (!array || array.length < 2) {
            return;
        }
    },
    insertionPositive:function(array,arr) {
        this.checkArray(array);
        for (let i = 1; i < array.length; i++) {
            for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
                this.swap(array, j, j + 1);
                this.swap(arr,j,j+1)
            }
        }
        return arr;
    },
    insertionNegative:function(array,arr) {
        this.checkArray(array);
        for (let i = 1; i < array.length; i++) {
            for (let j = i - 1; j >= 0 && array[j] < array[j + 1]; j--) {
                this.swap(array, j, j + 1);
                this.swap(arr,j,j+1)
            }
        }
        return arr;
    },
    replaceArray:function(arr,type){
      let array = []
      if(type.direc === '+' && type.kind === 'time'){
         arr.forEach(item=>{
             array.push(Date.parse(item.createdAt))
         })
         return this.insertionPositive(array,arr)
      }else if(type.direc === '-' && type.kind === 'time'){
        arr.forEach(item=>{
            array.push(Date.parse(item.createdAt))
        })
        return this.insertionNegative(array,arr)
      }else if(type.direc === '+' && type.kind === 'star'){
        arr.forEach(item=>{
            array.push(+item.star)
        })
        return this.insertionPositive(array,arr)
      }else if(type.direc === '-' && type.kind === 'star'){
        arr.forEach(item=>{
            array.push(+item.star)
        })
        return this.insertionNegative(array,arr)
      }
    }
}
module.exports.sortRank = sortRank;
