;
(function () {
    function allocationItems() {
        let elem = document.querySelectorAll('.item');
        let pos = setPosition(elem.length);
        console.log(pos);
        Array.from(elem).forEach((item, index) => {
            item.style.left = pos[index].left + 'px';
            item.style.top = pos[index].top + 'px';
        });
    }

    function setPosition(len) {
        const RADIUS = 250;
        let pos = [];
        const N = 12; // n 半圆分成的份数

        for (let i = 0; i < len; i++) {
            let RAD = Math.PI * (90 - 180 / N * i) / 180;
            pos.push({
                left: 240 + RADIUS * Math.cos(RAD),
                top: i > N - 1 ? 600 : 240 - RADIUS * Math.sin(RAD)
            })
        }

        return pos;
    }

    function imgShow(ele) {
        let pic = document.querySelector('#pic');
        var pp = ele.getElementsByTagName('a')[0].getAttribute('data-img');
        pic.style.backgroundImage = "url('" + pp + "')";
        pic.className = "img-box";
    }

    allocationItems();

    function animation(args, flag) {
        const SPEED = 400;
        document.getElementById("pic").className = "hide";

        function animate(draw, duration, callback) {
            var start = performance.now();
            requestAnimationFrame(function animate(time) {
                var timePassed = time - start;
                console.log(time, start)
                if (timePassed > duration)
                    timePassed = duration;
                draw(timePassed);
                if (timePassed < duration) {
                    requestAnimationFrame(animate);
                } else callback();
            });
        }
        animate(function (timePassed) {
            allocationItems();

        }, SPEED, changeItems(flag));
    }

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
        imgShow(elem[6]);
    }

    let prev = document.querySelector('.prev');
    prev.addEventListener('click', () => animation({}, 1));

    let next = document.querySelector('.next');
    next.addEventListener('click', () => animation({}, 0));
})();