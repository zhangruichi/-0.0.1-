// pages/message_x/message_x.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        image:"",
        name:"",
        createtime:0,
        message:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const app=getApp()
        this.setData({
            image:app.globalData.itemone.image,
            name:app.globalData.itemone.name,
            createtime:app.globalData.itemone.createTime,
            message:app.globalData.itemone.message
        })
    },
    huifu_tap(e){
        const app=getApp()
        app.globalData.selectone=app.globalData.itemone._openid
        wx.navigateTo({
          url: '../readfabu/readfabu',
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