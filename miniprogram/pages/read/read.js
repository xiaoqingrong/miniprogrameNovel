Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    background: ['#d4f0d2', '#fefbed', '#f0e4c9','#f8f8f8', '#cfdce5', '#000000'],
    backgroundColor:'#000000',
    color:'#ffffff',
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    color_show:false,
    windowHeight:0,
    windowWidth:0,
    wordData : [],
    wordNum :0,
    positionTop:0,
    bookId:1,
    currentChapter:1,
    directory:[],
    chapterIsshow:false
  },
  onLoad:function(options){
    console.log(options)
    this.initWindowHeight();
    if(options.bookid){
      this.setData({
        bookId:options.bookid
      })
      this.getWord(options.bookid);
      this.getDirectory(options.bookid);
    }
    
  },
  showChapter(){
    this.setData({
      chapterIsshow:true
    })
  },
  chooseChapter(e){
    this.setData({
      currentChapter:e.currentTarget.dataset.chapterid,
      chapterIsshow:false
    })
    this.getWord();
  },
  getWord:function(){
    var strArr = []; 
    var n = this.data.wordNum;     
    let _this = this;
    wx.request({
      url: 'http://localhost:3000/chapter',
      data:{
        bookid:this.data.bookId,
        chaptebookid:this.data.currentChapter
      },
      success(res){
        _this.setData({
          wordData:res.data[0].chapter_content
        })        
      }
    })
  },
  getDirectory:function(i){
    let _this = this;
    wx.request({
      url: 'http://localhost:3000/haodema',
      data:{
        bookid:i
      },
      success(res){
        _this.setData({
          directory:res.data
        })
      }
    })
  },
  multipleTap: function(e){
    let curTime = e.timeStamp;
    let lastTime = this.lastTapDiffTime;
    this.lastTapDiffTime = curTime;    
    //两次点击间隔小于300ms, 认为是双击
    let diff = curTime - lastTime;
    if (diff < 300) {
      this.setData({
        color_show:!this.data.color_show,
        chapterIsshow:false
      })
    }
  },
  colorChange:function(e){
    if(e.target.dataset.color === '#000000'){
      this.setData({
        color:'#ffffff'
      })
    }else{
      this.setData({
        color:'#000000'
      })
    }
    this.setData({
      backgroundColor:e.target.dataset.color
    })
  },
  initWindowHeight: function () {
    //获取屏幕高度
    var that = this;
    wx.getSystemInfo({
        success: function (res) {
          let dataLength = (parseInt((res.windowWidth-10)/30)*parseInt((res.windowHeight-30)/30))*2;
            that.setData({
                windowHeight: res.windowHeight,
                windowWidth:res.windowWidth,
                wordNum:dataLength,
                positionTop:res.windowHeight-111
            })
        }
    })
},
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})