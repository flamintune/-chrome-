// var d = document.body;
// console.log(d) // 本质上就是一个顺序问题，此时只创建好了dom数，但是还没生成布局树
var Range;
(async () => {
    const src = chrome.runtime.getURL("./js/Range.js");
    var main = await import(src);
    Range = main.default;
})();

var rangeObj = {} // 保存被选中的内容！

replaceSelectedStrByEle = (className) => {
    rangeObj.applyInlineStyle('b', {
        class: className
    });
    rangeObj.select();
    window.getSelection().empty();
}


addUnderline = (event) => {
    this.replaceSelectedStrByEle('custom-underline')
    let removed = document.getElementsByClassName('iconDiv');
    if (removed.length)
        document.getElementsByTagName("html")[0].removeChild(removed[0]);
}
enableNiteWriterPen = () => {
    this.replaceSelectedStrByEle('nite-writer-pen')
}
function CreateIconDiv(clientx,clienty) {
    let iconDiv = document.createElement('div');
    document.getElementsByTagName("html")[0].appendChild(iconDiv)
    iconDiv.className = "iconDiv"
    iconDiv.innerHTML = '<svg t="1648281930298" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2405" width="30" height="30"><path d="M659.655431 521.588015q23.970037-6.71161 46.022472-13.423221 19.17603-5.752809 39.310861-11.505618t33.558052-10.546816l-13.423221 50.816479q-5.752809 21.093633-10.546816 31.640449-9.588015 25.88764-22.531835 47.940075t-24.449438 38.35206q-13.423221 19.17603-27.805243 35.475655l-117.932584 35.475655 96.838951 17.258427q-19.17603 16.299625-41.228464 33.558052-19.17603 14.382022-43.625468 30.202247t-51.29588 29.243446-59.925094 13.902622-62.801498-4.314607q-34.516854-4.794007-69.033708-16.299625 10.546816-16.299625 23.011236-36.434457 10.546816-17.258427 25.40824-40.749064t31.161049-52.254682q46.022472-77.662921 89.168539-152.449438t77.662921-135.191011q39.310861-69.992509 75.745318-132.314607-45.06367 51.775281-94.921348 116.014981-43.146067 54.651685-95.88015 129.917603t-107.385768 164.434457q-11.505618 18.217228-25.88764 42.187266t-30.202247 50.816479-32.599251 55.131086-33.078652 55.131086q-38.35206 62.322097-78.621723 130.397004 0.958801-20.134831 7.670412-51.775281 5.752809-26.846442 19.17603-67.116105t38.35206-94.921348q16.299625-34.516854 24.928839-53.692884t13.423221-29.722846q4.794007-11.505618 7.670412-15.340824-4.794007-5.752809-1.917603-23.011236 1.917603-15.340824 11.026217-44.58427t31.161049-81.977528q22.052434-53.692884 58.007491-115.535581t81.018727-122.726592 97.797753-117.932584 107.865169-101.153558 110.262172-72.389513 106.906367-32.11985q0.958801 33.558052-6.71161 88.689139t-19.17603 117.932584-25.88764 127.520599-27.805243 117.453184z" p-id="2406"></path></svg>'
    iconDiv.style.left = clientx + 'px';
    iconDiv.style.top = clienty + 'px';
    return iconDiv;
} // 创建一个 icondiv 图标
function showIcon(event) {
    let sel = window.getSelection();
    let sel_str = sel.toString();
    var re = /./;
    if (sel.isCollapsed || !re.exec(sel_str)) // 这里的判断可能是不够健壮的哈 论查表得重要性
        return;
    else {

        let clientx = event.clientX;
        let clienty = event.clientY;
        
        let iconDiv = CreateIconDiv(clientx,clienty);
        
        var getRange = () => {
            var me = window;
            var range = new Range(me.document);
            var sel = window.getSelection();
            if (sel && sel.rangeCount) {
                var firstRange = sel.getRangeAt(0);
                var lastRange = sel.getRangeAt(sel.rangeCount - 1);
                range.setStart(firstRange.startContainer, firstRange.startOffset)
                range.setEnd(lastRange.endContainer, lastRange.endOffset);
            }
            return range
        }
        rangeObj = getRange();


        iconDiv.addEventListener('click', addUnderline); // 给新出现的绑定事件
    }
}

document.addEventListener('mouseup', showIcon)

document.getElementsByTagName('body')[0].onmousedown = function () {
    // if (!window.getSelection().isCollapsed)
    //     return;
    let removed = document.getElementsByClassName('iconDiv');
    if (removed.length)
        document.getElementsByTagName("html")[0].removeChild(removed[0]);
};

