
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchres: []
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
        let searchnum = this.data.searchres.length
        wx.showLoading({
            title: '搜索中',
        })
        wx.cloud.database().collection("message")
            .where({
                target: app.globalData.openid
            })
            .orderBy("createTime","desc")
            .get()
            .then(res => {
                console.log("搜索成功", res)
                this.setData({
                    searchres: res.data
                })
                if (this.data.searchres.length == 0) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '未找到相关内容',
                        icon: "error",
                        duration: 1000
                    })
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '搜索成功',
                        icon: "success",
                        duration: 1000
                    })
                }

            })
            .catch(res => {
                console.log("搜索失败", res)
            })
        }
    },

    tap(e){
        console.log(e)
        const app=getApp()
        console.log(e.currentTarget.dataset.id)
        app.globalData.itemone=e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../message_x/message_x',
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
        const app = getApp();
        
        let searchnum = this.data.searchres.length
        wx.showLoading({
            title: '刷新中',
        })
        wx.cloud.database().collection("message")
            .where({
                target: app.globalData.openid
            })
            .orderBy("createTime","desc")
            .get()
            .then(res => {
                console.log("搜索成功", res)
                this.setData({
                    searchres: res.data
                })
                if (this.data.searchres.length == 0) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '未找到相关内容',
                        icon: "error",
                        duration: 1000
                    })
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '搜索成功',
                        icon: "success",
                        duration: 1000
                    })
                }

            })
            .catch(res => {
                console.log("搜索失败", res)
            })
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log(this.data.searchContent)        
        const app = getApp()  
        let searchnum = this.data.searchres.length
        wx.showLoading({
            title: '加载中',
          })
        wx.cloud.database().collection("message")
            .where({
                target: app.globalData.openid
            })
            .orderBy("createTime","desc")
            .skip(searchnum)
            .get()
            
            .then(res => {
                console.log("搜索成功", res)
                this.setData({
                    searchres: this.data.searchres.concat(res.data)
                })
                if (this.data.searchres.length == 0) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '未找到相关内容',
                        icon: "error",
                        duration: 1000
                    })
                }
                else if(this.data.searchres.length==searchnum){
                    wx.hideLoading()
                    wx.showToast({
                        title: '没有更多啦~',
                        icon: "none",
                        duration: 1000
                    })
                }
                else{
                    wx.hideLoading()
                    wx.showToast({
                      title: '搜索成功',
                      icon:"success",
                      duration:1000
                    })
                }
            })
            .catch(res => {
                console.log("搜索失败", res)
            })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})