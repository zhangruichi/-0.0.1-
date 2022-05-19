// pages/com/com.js
let totalnum=-1
Page({

    /**
     * 页面的初始数据
     */
    data: {
               //显示数据库中内容
               list:[],
               statusList: [{//顶部状态按钮
                   "statusName": "全部",
                   "id": "all"
                 },
                 {
                   "statusName": "丢失",
                   "id": "lost"
                 },
                 {
                   "statusName": "认领",
                   "id": "find"
                 },
                 ],
                 isChecked: "all" //判断是否选中
       
    },
    deleteindex:function (e) {
      wx.showModal({
        title: '提示',
        content: '确定要删除该条失物招领吗？',
        success: function (res) {
            if (res.confirm) {
              const fi=e.currentTarget.dataset.id._id
              const db=wx.cloud.database();
              db.collection('lost-find').where({
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
    taplist:function(e) {
      const app=getApp();
      app.globalData.itemone=e;
      wx.navigateTo({
        url: '../xiangqing/xiangqing',
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
        wx.cloud.database().collection("lost-find")
        .limit(10)
        .where({
          _openid:app.globalData.openid
        })
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
    choiceStatus: function (e) {
      var that = this;
      var code = e.currentTarget.id;
      that.setData({
        isChecked: code
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
      wx.cloud.database().collection("lost-find")
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
      let len=this.data.list.length
      wx.cloud.database().collection("lost-find").count()
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
      wx.cloud.database().collection("lost-find")
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