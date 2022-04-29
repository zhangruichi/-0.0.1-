// pages/find/find.js
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
    //绑定顶部状态切换的点击事件
  choiceStatus: function (e) {
    var that = this;
    var code = e.currentTarget.id;
    that.setData({
      isChecked: code
    })
  },
    //点击查找按钮
    btn1_tap:function(opetions){
        wx.navigateTo({
          url: '../search/search',
        })
    },
    //点击发布按钮
    fabubtn_tap: function(){
      wx.navigateTo({
        url: '../FaBu/FaBu',
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
      wx.cloud.database().collection("lost-find")
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