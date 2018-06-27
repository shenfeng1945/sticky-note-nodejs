var WaterFall = (function () {
    let $ct
    let $items

    function render($c) {
        //container
        $ct = $c
        //note list ----nodelist
        $item = $ct.children()
        let noteWidth = $item.outerWidth(true) //为true，margin也计算在内
        let colNum = parseInt($ct.width() / noteWidth)
        let colSumHeight = []
        for (var i = 0; i < colNum; i++) {
            colSumHeight.push(0)
        }
        $item.each(function(){
            let $cur = $(this);
            let idx = 0;
            let minSumHeight = colSumHeight[0]
            for (var i = 0; i < colSumHeight.length; i++) {
                if (colSumHeight[i] < minSumHeight) {
                    idx = i;
                    minSumHeight = colSumHeight[i]
                }
            }
            $cur.css({
                left: noteWidth * idx,
                top: minSumHeight
            })
            colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx]
        })
    }
    $(window).on('resize', () => {
        render($('#content'))
    })
    return {
        init: render
    }
})()

module.exports = WaterFall
