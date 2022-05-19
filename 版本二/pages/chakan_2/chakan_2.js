// pages/chakan_2/chakan_2.js
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

    /**
     * 生命周期函数--监听页面加载
     */
    taplist:function(e) {
        const app=getApp();
        app.globalData.itemone=e;
        wx.navigateTo({
          url: '../xiangqing_1/xiangqing_1',
        })
      },
      deleteindex:function (e) {
        wx.showModal({
          title: '提示',
          content: '确定要删除该条交易吗？',
          success: function (res) {
              if (res.confirm) {
                const fi=e.currentTarget.dataset.id._id
                const db=wx.cloud.database();
                db.collection('Trade').where({
                  _id:fi
                })
                .remove()
                .then(res=>{
                  wx.showToast({
                    title: '删除成功',
                    icon: "success",
                    duration: 1000
                })
                })
              } else if (res.cancel) {
  
                  return false;
              }
          }
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
    onLoad: function (options) {
        const app=getApp();
        wx.cloud.database().collection("Trade")
        .where({
            _openid:app.globalData.openid
        })
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
        const app=getApp();
        wx.cloud.database().collection("Trade")
        .where({
            _openid:app.globalData.openid
        })
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})