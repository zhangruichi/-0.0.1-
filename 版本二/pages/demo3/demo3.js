// pages/demo3/demo3.js
Page({
  data: {
    userinfo: {},
    tmpname: "",
    userimage: ""
  },
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,            //选择一张图片
      sizeType: ['compressed'],   //压缩图
      sourceType: ['album', 'camera'],    //相册或拍照
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + Date.now() + filePath.match(/\.[^.]+?$/)[0]   //上传图片的名字
        wx.cloud.uploadFile({    //将图片上传到云服务器的云存储中
          cloudPath, //云存储的路径
          filePath,  //本地图片路径
          success: res => {
           wx.cloud.getTempFileURL({
             fileList:[res.fileID],
             success:res=>{
              const app=getApp();
              const db=wx.cloud.database();
            db.collection('userinfo').where(
                {
                    _openid:app.globalData.openid
                }
            ).update(
                {
                    data:{
                    url:res.fileList[0].tempFileURL
                    },
                    success:function(res) {
                        wx.showModal({
                            title:"修改成功",
                            showCancel:false,
                          })
                    }
                }
            )
           onShow();
             }
           })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
       
      }
    })
  },
  handlelogin() {
    wx.getUserProfile({
      desc: '获取你的昵称，头像，地区及性别',
      success: (res) => {
        var app = getApp();
        this.setData({
          userinfo: res.userInfo,
          tmpname: res.userInfo.nickName
        });
        app.globalData.userInfo = res.userInfo;
        app.globalData.islogin = 1;
        const db = wx.cloud.database();
        db.collection('userinfo').add({
          data: {
            name: res.userInfo.nickName,
            gender: res.userInfo.gender,
            phone: "",
            mail: "",
            qq: "",
            class: "",
            xueyuan:0,
            url: res.userInfo.avatarUrl,
            yinsi:0
          },
          fail(err) {

          }
        })
        db.collection('userinfo').where({
            _openid: app.globalData.openid
          }).get()
          .then(rese => {
            this.setData({
              tmpname: rese.data[0].name,
              userimage: rese.data[0].url
            })
          })
      }
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
    var app = getApp();
    if (app.globalData.islogin == 1) {
      const db = wx.cloud.database();
      db.collection('userinfo').where({
          _openid: app.globalData.openid
        }).get()
        .then(rese => {
          this.setData({
            tmpname: rese.data[0].name,
            userimage:rese.data[0].url
          })
        })
    }
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
    var app = getApp();
    if (app.globalData.islogin == 1) {
      const db = wx.cloud.database();
      db.collection('userinfo').where({
          _openid: app.globalData.openid
        }).get()
        .then(rese => {
          this.setData({
            tmpname: rese.data[0].name,
            userimage:rese.data[0].url
          })
          wx.stopPullDownRefresh();
        })
    }
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