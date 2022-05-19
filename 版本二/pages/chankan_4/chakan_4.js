// pages/chakan_3/chakan_3.js
let totalnum=-1
Page({

    /**
     * 页面的初始数据
     */
    swiperNav:function(e){
        　var w=wx.getSystemInfoSync().windowWidth;
        　var leng=this.data.swiperNav.arr.length;
        　var i = e.target.dataset.i;
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
        　　　{ v: 0, txt: "代取快递" },
        　　　{ v: 1, txt: "代取外卖" },
        　　　{ v: 2, txt: "其他悬赏" },
        　　]
        　},
  
        x:0,
        y:500,
        imgUrl:"../icons_1/fabu.png"
    },
    transmit: function(e){
        wx.navigateTo({
          url: '../fabu_3/fabu',
        })
      },
      searchtap(e){
        wx.navigateTo({
          url: '../search_3/search',
        })
      },
      deleteindex:function (e) {
        wx.showModal({
          title: '提示',
          content: '要将其设置为已完成状态吗？',
          success: function (res) {
              if (res.confirm) {
                const fi=e.currentTarget.dataset.id._id
                const db=wx.cloud.database();
                db.collection('todo').where({
                  _id:fi
                })
                .remove()
                .then(res=>{
                  wx.showToast({
                    title: '设置成功',
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    const app=getApp();
    const open=app.globalData.openid;
      wx.cloud.database().collection("todo")
      .where({
          _openid:open,
          zhuangtai:2
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
        const open=app.globalData.openid;
        wx.cloud.database().collection("todo")
        .where({
            _openid:open,
            zhuangtai:2
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