;
(function () {
    // 获取滚动元素数组及长度
    let elem = document.querySelectorAll('.item');
    const len = elem.length;
    // 以下用于计算的，
    let pos = [];
    const srart_pos = 90.75;
    const s = 0.52 * Math.PI / 180;
    const RADIUS = 250;

    function allocationItems() {
        // elems 滚动元素，需重新获取排序后的数组
        let elems = document.querySelectorAll('.item');

        // 数组，计算位置用的
        pos[0] = srart_pos;
        for (i = 1; i < len; i++) {
            pos[i] = pos[i - 1] - 0.2;
        }
        // elem left,top 赋值
        Array.from(elems).forEach((item, index) => {
            item.style.left = 240 + RADIUS * Math.sin(pos[index]) + 'px';
            item.style.top = 240 + RADIUS * Math.cos(pos[index]) + 'px';
        });
        imgShow(elems[6]);
    }

    // 图片显示
    function imgShow(ele) {
        let pic = document.querySelector('#pic');
        var pp = ele.getElementsByTagName('a')[0].getAttribute('data-img');
        pic.style.backgroundImage = "url('" + pp + "')";
        pic.className = "img-box";
    }

    allocationItems();

    function animation(args, flag) {
        const SPEED = 400;
        let el = document.querySelectorAll('.item');

        function animate(draw, duration, callback) {
            var start = performance.now();
            requestAnimationFrame(function animate(time) {
                //time?
                var timePassed = time - start;
                if (timePassed > duration)
                    timePassed = duration;
                draw()
                if (timePassed < duration) {
                    requestAnimationFrame(animate);
                } else {
                    callback()
                };
            });
        };

        animate(() => {
            // 滚动元素移动的动画
            Array.from(el).forEach((item, index) => {
                item.style.left = 240 + RADIUS * Math.sin(pos[index]) + 'px';
                item.style.top = 240 + RADIUS * Math.cos(pos[index]) + 'px';
                if (flag) {
                    pos[index] += s;
                } else {
                    pos[index] -= s;
                }
            });

        }, SPEED, () => changeItems(flag));
    }

    // 滚动元素重新排序
    function changeItems(flag) {
        const list = document.querySelector('#list');
        let ch = flag ? list.firstElementChild : list.lastElementChild
        ch.remove();
        if (flag) {
            list.appendChild(ch);
        } else {
            list.insertBefore(ch, list.firstChild);
        }
        allocationItems();
    }



    let prev = document.querySelector('.prev');
    prev.addEventListener('click', () => animation({}, 1));

    let next = document.querySelector('.next');
    next.addEventListener('click', () => animation({}, 0));
})();