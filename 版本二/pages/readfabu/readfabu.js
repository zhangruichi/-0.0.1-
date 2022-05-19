// pages/readfabu/readfabu.js
var util= require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        description:"",
        image:"",
        name:""
    },
    descriptioninput: function (e) {
        this.setData({
            description: e.detail.value
        })
    },
    liuyan:function () {
        const db=wx.cloud.database();
        const app=getApp();
        const open=app.globalData.openid;
        db.collection('userinfo')
        .where({
            _openid:open
        })
        .get()
        .then(rese => {
            this.setData({
              name: rese.data[0].name,
              image: rese.data[0].url
            })
            db.collection('message')
        .add({
            data: {
                message:this.data.description,
                target:app.globalData.selectone,
                image:this.data.image,
                name:this.data.name,
                createTime:Date.now()
              },
            success(res)
            {
                wx.showToast({
                    title: '发布成功',
                    icon: "success",
                    duration: 2000
                })
                wx.navigateBack()
            }
        })
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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