// pages/xiangqing_1/xiangqing_1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid:"",
        pic:"",
        name:"",
        itemone:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    tiaozhuan:function () {
        const app=getApp();
        app.globalData.selectone=this.data.openid;
        wx.navigateTo({
          url: '../person/person',
        })
      },
    onLoad: function (options) {
        const app=getApp();
        this.setData({
            itemone:app.globalData.itemone.currentTarget.dataset.id
        })
        const db=wx.cloud.database();
        db.collection('userinfo')
        .where({
            _openid:this.data.itemone._openid
          })
        .get()
        .then(res=>{
            this.setData({
              pic:res.data[0].url,
              name:res.data[0].name,
              openid:res.data[0]._openid
            })
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