const DB = wx.cloud.database().collection("todo")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "",
    name: "",
    con: 0,
    val: "",
    arr: ["代取快递","代取外卖","其他悬赏"],
    index: 0
  },
  bindKeyInput: function (e) {
    this.setData({
      info: e.detail.value
    })
  },
  bindKeyInput1: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      con: e.detail.value
    })
  },
  bindKeyInput3: function (e) {
    var value = e.detail.value;
    value = value.replace(/[^\d\.]|^\./g, '').replace(/\.{2}/g, '.').replace(/^([1-9]\d*|0)(\.\d{1,2})(\.|\d{1})?$/, '$1$2').replace(/^0\d{1}/g, '0');
    this.setData({
      val: value
    })
  },
  bindchange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  fabutap(e) {
    if (this.data.info == "") {
      wx.showToast({
        title: "请输入商品信息",
        icon: "error",
        duration: 1000
      })
    } else if (this.data.name == "") {
      wx.showToast({
        title: "请输入您的称呼",
        icon: "error",
        duration: 1000
      })
    } else if (this.data.con == 0) {
      wx.showToast({
        title: "请输入联系方式",
        icon: "error",
        duration: 1000
      })
    } else if (this.data.val == "") {
      wx.showToast({
        title: "请输入商品价格",
        icon: "error",
        duration: 1000
      })
    } else {
      if (parseFloat(this.data.val) > 100000) {
        wx.showToast({
          title: "价格过大!",
          icon: "error",
          duration: 1000
        })
      } else {
        console.log(this.data)
        DB.add({
          data: {
            info: this.data.info,
            name: this.data.name,
            contact: this.data.con,
            value: this.data.val,
            type: this.data.index,
            zhuangtai:1,
            target:""
          },
          success(res) {
            console.log("添加成功", res)
            wx.showToast({
              title: '发布成功',
              icon: "success",
              duration: 1000
            })
            wx.navigateBack()
          },
          fail(res) {
            console.log("添加失败", res)
            wx.showToast({
              title: '发布失败',
              icon: "error",
              duration: 1000
            })
          }
        })
      }
    }


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