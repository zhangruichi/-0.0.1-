// pages/search/search.js
const db = wx.cloud.database()
const _ = db.command
let searchnum = -1
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchContent: "",
        searchres: []


    },
    taplist:function(e) {
        const app=getApp();
        app.globalData.itemone=e;
        wx.navigateTo({
          url: '../xiangqing/xiangqing',
        })
      },
    //获取搜索内容
    searchContent: function (e) {
        this.setData({
            searchContent: e.detail.value
        })
    },
    //回车开始搜索
    confirmSC: function (e) {
        console.log(this.data.searchContent)
        searchnum = this.data.searchres.length
        wx.showLoading({
            title: '搜索中',
          })
        wx.cloud.database().collection("lost-find")
            .where(_.or([{
                    item_name: db.RegExp({
                        regexp: this.data.searchContent,
                        options: 'i', //不区分大小写
                    })
                },
                {
                    description: db.RegExp({
                        regexp: this.data.searchContent,
                        options: 'i', //不区分大小写
                    })

                },
                {
                    location: db.RegExp({
                        regexp: this.data.searchContent,
                        options: 'i', //不区分大小写
                    })

                },

            ]))
            .limit(10)
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
    //取消点击事件
    cancaltap: function (e) {
        wx.navigateBack()
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
        console.log(this.data.searchContent)
        searchnum = this.data.searchres.length
        wx.showLoading({
            title: '加载中',
          })
        wx.cloud.database().collection("lost-find")
            .where(_.or([{
                    item_name: db.RegExp({
                        regexp: this.data.searchContent,
                        options: 'i', //不区分大小写
                    })
                },
                {
                    description: db.RegExp({
                        regexp: this.data.searchContent,
                        options: 'i', //不区分大小写
                    })

                },
                {
                    location: db.RegExp({
                        regexp: this.data.searchContent,
                        options: 'i', //不区分大小写
                    })

                },

            ]))
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