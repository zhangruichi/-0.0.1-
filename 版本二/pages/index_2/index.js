let totalnum=-1
Page({

  /**
   * 页面的初始数据
   */
  

    swiperNav:function(e){
      　var w=wx.getSystemInfoSync().windowWidth;
      　var leng=this.data.swiperNav.arr.length;
      　var i = e.target.dataset.i;
        console.log(i)
      　var disX = (i - 2) * w / leng;
      　if(i!=this.data.swiperNav.i){
      　　this.setData({
      　　　'swiperNav.i':i,
            choose:i
      　　})
      　}
      　this.setData({
      　　'swiperNav.x':disX
      　})
      },
  data: {
    list:[],
    choose:0,
    swiperNav:{
      　　i:0,
      　　arr:[
      　　　{ v: 0, txt: "文具" },
      　　　{ v: 1, txt: "电子产品" },
      　　　{ v: 2, txt: "日用品" },
      　　　{ v: 3, txt: "书籍" },
      　　　{ v: 4, txt: "其他商品" }
      　　]
      　},

      x:0,
      y:500,
      imgUrl:"../icons/cart-o.png"
  },


  taplist:function(e) {
    const app=getApp();
    app.globalData.itemone=e;
    wx.navigateTo({
      url: '../xiangqing_1/xiangqing_1',
    })
  },
  transmit: function(e){
    wx.navigateTo({
      url: '../fabu_2/fabu',
    })
  },
  searchtap(e){
    wx.navigateTo({
      url: '../search_2/search',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app=getApp();
    if(app.globalData.islogin==0)
      {
          wx.showModal({
            title:"请先登录",
            showCancel:false,
            success(res)
            {
                wx.navigateBack()
            }
          })
      }
      else{
    wx.cloud.database().collection("Trade")
      .limit(10)
      .get()
      .then(res=>{
        console.log("获取成功",res)
        this.setData({
          list:res.data,
        })
      })
      .catch(res=>{
        console.log("获取失败",res)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.cloud.database().collection("Trade")
      .limit(10)
      .get()
      .then(res=>{
        console.log("获取成功",res)
        this.setData({
          list:res.data
        })
      })
      .catch(res=>{
        console.log("获取失败",res)
      })
      wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let len=this.data.list.length
      wx.cloud.database().collection("Trade").count()
      .then(res=>{
        totalnum=res.total
      })
      if(totalnum==len){
        wx.showToast({
          title: '没有更多啦~ ~',
          icon: "none",
          duration: 1000
        })
        return
      }
      wx.showLoading({
        title: '加载中',
      })
      console.log(len)
      wx.cloud.database().collection("Trade")
      .skip(len)
      .get()
      .then(res=>{
        console.log("获取成功",res)
        this.setData({
          list:this.data.list.concat(res.data)
        })
        wx.hideLoading()
        wx.showToast({
          title: '加载成功',
          icon: "success",
          duration: 1000
        })
      })
      .catch(res=>{
        console.log("获取失败",res)
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          icon: "error",
          duration: 1000
        })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})