// pages/map/map.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
  	markers:[],
      //纬度
      latitude:'',
      //经度
      longitude:'',
    },
    // 地图
  getLocation(e){
    console.log(e);
    wx.openLocation({
      latitude:this.data.latitude,
      longitude: this.data.longitude,
      scale: 25,
    })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this; 
        //  获取当前定位的经纬度信息
        wx.showLoading({
          title:"定位中",
          mask:true
        })
        wx.getLocation({
          type: 'gcj02',
          altitude:true,//高精度定位
          //定位成功，更新定位结果
          success: function (res) {
            var latitudee = res.latitude
            var longitudee = res.longitude
            that.setData({
              longitude:parseFloat(longitudee),
              latitude: parseFloat(latitudee),
            })
          },
          //定位失败回调
          fail:function(){
            wx.showToast({
              title:"定位失败",
              icon:"none"
            })
          },
          complete:function(){
            //隐藏定位中信息进度
            wx.hideLoading()
          }
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