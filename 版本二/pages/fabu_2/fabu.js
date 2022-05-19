const DB = wx.cloud.database().collection("Trade")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "",
    name: "",
    con: 0,
    val: "",
    arr: ["文具", "电子产品", "日用品", "书籍", "其他商品"],
    index: 0,
    tempFilePaths: []
  },
  upload: function () {
    let that = this;
    wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
            wx.showToast({
                title: '正在上传...',
                icon: 'loading',
                mask: true,
                duration: 1000
            })
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            let tempFilePaths = res.tempFilePaths;

            that.setData({
                tempFilePaths: tempFilePaths
            })
            /**
             * 上传完成后把文件上传到服务器
             */
        }
    })
},
deleteImage: function (e) {
  var that = this;
  var tempFilePaths = that.data.tempFilePaths;
  var index = e.currentTarget.dataset.index; //获取当前长按图片下标
  wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
          if (res.confirm) {
              console.log('确定');
              tempFilePaths.splice(index, 1);
          } else if (res.cancel) {
              console.log('取消');
              return false;
          }
          that.setData({
              tempFilePaths
          });
      }
  })
},
listenerButtonPreviewImage: function (e) {
  let index = e.target.dataset.index;
  let that = this;
  console.log(that.data.tempFilePaths[index]);
  console.log(that.data.tempFilePaths);
  wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
      //这根本就不走
      success: function (res) {
          //console.log(res);
      },
      //也根本不走
      fail: function () {
          //console.log('fail')
      }
  })
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
        if (this.data.tempFilePaths.length == 0)
        {
          DB.add({
            data: {
              info: this.data.info,
              name: this.data.name,
              contact: this.data.con,
              value: this.data.val,
              type: this.data.index,
              url:"https://656e-env-3gn8mpr00af80a85-1310746494.tcb.qcloud.la/resourse/resourse/good.jpeg?sign=bb92ec8bcbb8f9c24167391382f3c889&t=1652884780"
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
        else
        {
                const filePath = this.data.tempFilePaths[0]
                const cloudPath = 'good-image' + Date.now() + filePath.match(/\.[^.]+?$/)[0] //上传图片的名字
                wx.cloud.uploadFile({ //将图片上传到云服务器的云存储中
                    cloudPath, //云存储的路径
                    filePath, //本地图片路径
                    success: res => {
                        wx.cloud.getTempFileURL({
                            fileList: [res.fileID],
                            success: res => {
                                DB.add({
                                    data: {
                                        info: this.data.info,
                                        name: this.data.name,
                                        contact: this.data.con,
                                        value: this.data.val,
                                        type: this.data.index,
                                        url:res.fileList[0].tempFileURL
                                    },
                                    success(res) {
                                        console.log("添加成功", res)
                                        wx.showToast({
                                            title: '发布成功',
                                            icon: "success",
                                            duration: 1000
                                        })
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
                        })
                    }
                })
      }
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