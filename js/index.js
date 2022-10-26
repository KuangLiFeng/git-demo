window.onload = function() {
    // 缓动函数
    function move(obj, target){
        clearInterval(obj.timer)
        obj.timer = setInterval(() => {
            if(obj.offsetLeft === target){
                clearInterval(obj.timer)
            }
            let step = (target - obj.offsetLeft) / 15
            step = step > 0? Math.ceil(step) : Math.floor(step)
            obj.style.left = obj.offsetLeft + step + 'px'
        },15)
    }
    
    // 轮播图区域
    let swiperBox = document.querySelector('.swiper')
    // 轮播图结构
    let swiper = document.querySelector('.swiper .swiper-cont')
    // 上一张按钮
    let prevBtn = document.querySelector('.swiper .prev')
    // 下一张按钮
    let nextBtn = document.querySelector('.swiper .next')
    // 小圆点
    let circles = document.querySelectorAll('.pagination li')
    // 复制第一张图片到最后位置 实现无缝滚动
    let firstLi = swiper.children[0].cloneNode(true)
    swiper.append(firstLi)
    // 记录当前位置
    let index = 0
    nextBtn.addEventListener('click', function(){
        if(index == 3){
            index = 0
            swiper.style.left = '0px'
        }
        index++
        let indexC = index
        if(indexC == 3){
            indexC = 0
        }
        move(swiper, -index * 1240)
        // 改变小圆点样式
        changeCircle(indexC)
    })
    prevBtn.addEventListener('click', function(){
        if(index == 0){
            index = 3
            swiper.style.left = (swiper.children.length -1) * -1240 + 'px'
        }
        index--
        move(swiper, -index * 1240)
        changeCircle(index)
    })

    // 点击小圆点切换图片
    circles.forEach((item, i) => {
        item.addEventListener('click', function() {
            index = i
            move(swiper, -index * 1240)
            changeCircle(i)
        })

    })

    let timer = setInterval(function(){
        nextBtn.click()
    },2000)

    swiperBox.addEventListener('mouseenter',function(){
        clearInterval(timer)
    })
    swiperBox.addEventListener('mouseleave', function(){
        timer = setInterval(function(){
            nextBtn.click()
        },3000)
    })

    // 改变小圆点样式函数
    function changeCircle(i){
        circles.forEach((item) => item.classList.remove('active'))
        circles[i].classList.add('active')
    }
}