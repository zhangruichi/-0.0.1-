// pages/FaBu/FaBu.js
const DB = wx.cloud.database().collection("lost-find")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //内容描述
        description: "",
        //物品名
        item_name: "",
        //地点
        location: "",
        //联系方式
        contact: 0,
        //时间
        currentDate: '2022-5-19',
        //发布者
        name: "",
        //类型
        array: ["丢失", "认领"],
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
    /**
     * 预览图片方法
     */
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
    /**
     * 长按删除图片
     */
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
    //内容描述事件
    descriptioninput: function (e) {
        console.log(e);
        this.setData({
            description: e.detail.value
        })
    },
    //物品名事件
    item_nameinput: function (e) {
        console.log(e);
        this.setData({
            item_name: e.detail.value
        })
    },
    //地点事件
    locationinput: function (e) {
        console.log(e);
        this.setData({
            location: e.detail.value
        })
    },
    //联系方式事件
    contactinput: function (e) {
        console.log(e);
        this.setData({
            contact: e.detail.value
        })
    },
    nameinput: function (e) {
        console.log(e);
        this.setData({
            name: e.detail.value
        })
    },
    //时间事件
    bindDateChange: function (e) {
        console.log(e);
        this.setData({
            currentDate: e.detail.value
        })
    },
    //类型事件
    LeiXinginput: function (e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },
    //发布事件
    fabutap: function (e) {

        if (this.data.name == "") {
            wx.showToast({
                title: "请输入您的称呼",
                icon: "error",
                duration: 1000
            })
        } else if (this.data.item_name == "") {
            wx.showToast({
                title: "请输入您丢失或拾取的物品名",
                icon: "error",
                duration: 1000
            })
        } else if (this.data.contact == 0) {
            wx.showToast({
                title: "请输入您的联系方式",
                icon: "error",
                duration: 1000
            })
        } else {
            if (this.data.tempFilePaths.length == 0) {
                if (this.data.index == 0) {
                    DB.add({
                        data: {
                            description: this.data.description,
                            item_name: this.data.item_name,
                            location: this.data.location,
                            name: this.data.name,
                            contact: this.data.contact,
                            releaseDate: this.data.currentDate.replace(/-/g, '') * 1,
                            type: this.data.index,
                            url:"https://656e-env-3gn8mpr00af80a85-1310746494.tcb.qcloud.la/resourse/resourse/lost.png?sign=ede7db06bdfa4a0ee0f7b50cd02c51ca&t=1652771545"
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
                } else {
                    DB.add({
                        data: {
                            description: this.data.description,
                            item_name: this.data.item_name,
                            location: this.data.location,
                            name: this.data.name,
                            contact: this.data.contact,
                            releaseDate: this.data.currentDate.replace(/-/g, '') * 1,
                            type: this.data.index,
                            url:"https://656e-env-3gn8mpr00af80a85-1310746494.tcb.qcloud.la/resourse/resourse/lin.png?sign=7cf9fd23d7218d40db21f90fda0fe30b&t=1652772184"
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
            } else {
                const filePath = this.data.tempFilePaths[0]
                const cloudPath = 'my-image' + Date.now() + filePath.match(/\.[^.]+?$/)[0] //上传图片的名字
                wx.cloud.uploadFile({ //将图片上传到云服务器的云存储中
                    cloudPath, //云存储的路径
                    filePath, //本地图片路径
                    success: res => {
                        wx.cloud.getTempFileURL({
                            fileList: [res.fileID],
                            success: res => {
                                DB.add({
                                    data: {
                                        description: this.data.description,
                                        item_name: this.data.item_name,
                                        location: this.data.location,
                                        name: this.data.name,
                                        contact: this.data.contact,
                                        releaseDate: this.data.currentDate.replace(/-/g, '') * 1,
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
            console.log(this.data.description);
            console.log(this.data.item_name);
            console.log(this.data.location);
            console.log(this.data.name);
            console.log(this.data.contact);
            console.log(this.data.currentDate);
            console.log(this.data.currentDate.replace(/-/g, '') * 1);
            console.log(this.data.index);
            wx.navigateBack()
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