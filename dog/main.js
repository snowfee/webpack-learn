
!function(){
  class DogAnimation {
    constructor(canvas) {
      canvas.width = window.innerWidth;
      window.onresize = () => canvas.width = window.innerWidth;
      canvas.height = 200;
      // 记录上一帧的时间
      this.lastWalkingTime = Date.now();
      // 记录当前画的索引
      this.keyFrameIndex = -1;
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      // 静态数据 图片数 存放路径
      this.IMG_COUNT = 8;
      this.RES_PATH = "./images";
      this.dog = {
        // 一步10px
        stepDistance: 9,
        // 狗的速度 
        speed: 0.15,
        // 鼠标的x坐标(狗狗的位置)
        mouseX: -1,
        // 往前走停留的位子
        frontStopX: -1,
        // 往回走停留的位置
        backStopX: window.innerWidth
      }
      // 存放加载后狗的图片
      this.dogPictures = [];
      this.start();
    }
    async start() {
      // 等待资源加载完
      await this.loadResources();
      this.pictureWidth = this.dogPictures[0].naturalWidth / 2;
      // 
      this.dog.mouseX = window.innerWidth - this.pictureWidth;
      // 记录鼠标位置
      this.recordMousePosition();
      // 给下一帧注册一个函数
      window.requestAnimationFrame(this.walk.bind(this))
    }
    recordMousePosition() {
      // 监听鼠标移动
      window.addEventListener("mousemove", event => {
        // 向前走（右），如果没减掉图片的宽度，小狗就跑到鼠标右边去了
        this.dog.frontStopX = event.clientX - this.pictureWidth;
        this.dog.backStopX = event.clientX
      })
      window.addEventListener("touchstart", event => {
        this.dog.frontStopX = event.touches[0].clientX - this.pictureWidth;
        this.dog.backStopX = event.touches[0].clientX;
      });
    }
    loadResources() {
      let imagesPath = [];
      // 准备图片的src
      for (let i = 0; i <= this.IMG_COUNT; i++) {
        imagesPath.push(`${this.RES_PATH}/${i}.png`);
      }

      let works = [];
      imagesPath.forEach(imgPath => {
        // 图片加载完之后触发Promise的resolve
        works.push(new Promise(resolve => {
          let img = new Image();
          img.onload = () => resolve(img);
          img.src = imgPath;
        }))
      })

      // 这里再套一个Promise是为了让调用者能够知道处理好了
      return new Promise(resolve => {
        // 使用Promise.all知道所有图片都加载好了
        Promise.all(works).then(dogPictures => {
          this.dogPictures = dogPictures;
          resolve()
        })
      })
    }
    walk() {
      // 绘制狗的图片, 没过100ms就画一张
      let now = Date.now();
      let distance = (now - this.lastWalkingTime) * this.dog.speed;
      // 每一步至少走stepDistance
      if (distance < this.dog.stepDistance) {
        window.requestAnimationFrame(this.walk.bind(this))
        return;
      }
      // 获取下一张图片的索引
      this.keyFrameIndex = ++this.keyFrameIndex % this.IMG_COUNT;
      
      // stopWalking表示小狗是否停下来 direct表示小狗的方向
      let direct = -1,
        stopWalking = false;
      // 如果鼠标在狗的前面则往前走
      if (this.dog.frontStopX > this.dog.mouseX) {
        direct = 1;
      } else if (this.dog.backStopX < this.dog.mouseX) {
        direct = -1;
        // 鼠标在小狗图片宽度区域执行else里的内容
      } else {
        stopWalking = true;
        // 如果鼠标在小狗图片中间的右边，则direct为正，否则为负
        direct = this.dog.frontStopX === -1 ? -1 :
          this.dog.backStopX - this.dog.mouseX
            > this.pictureWidth / 2 ? 1 : -1;
        // 如果停住的话就用0.png
        this.keyFrameIndex = -1;
      }
      let ctx = this.ctx;
      // 先清掉上次画的内容
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      ctx.save();
      // 计算小狗目前的位置,一步一步累加
      if (!stopWalking) {
        this.dog.mouseX += this.dog.stepDistance * direct;
      }
      if (direct === -1) {
        // 左右翻转
        ctx.scale(direct, 1);
      }
      // 从第二张开始
      let img = this.dogPictures[this.keyFrameIndex + 1];
      let drawX = 0;
      // 
      drawX = this.dog.mouseX * direct - (direct === -1 ? this.pictureWidth : 0);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, 20, img.naturalWidth / 2, img.naturalHeight / 2);
      ctx.restore();
      this.lastWalkingTime = now;
      // 继续给下一帧注册一个函数
      window.requestAnimationFrame(this.walk.bind(this))
    }
  }
  let canvas = document.getElementById('dog-walking');
  let dogAnimation = new DogAnimation(canvas);
  dogAnimation.start();
}();