// pages/FaBu/FaBu.js
const DB = wx.cloud.database().collection("lost-find")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //内容描述
        description:"",
        //物品名
        item_name:"",
        //地点
        location:"",
        //联系方式
        contact:0,
        //时间
        currentDate: '2020-10-01',
        //发布者
        name:"",
        //类型
        array:["丢失","认领"],
        index:0


    },
    //内容描述事件
    descriptioninput:function(e){
        console.log(e);
        this.setData({
            description:e.detail.value
        })
    },
    //物品名事件
    item_nameinput:function(e){
        console.log(e);
        this.setData({
            item_name:e.detail.value
        })
    },
    //地点事件
    locationinput:function(e){
        console.log(e);
        this.setData({
            location:e.detail.value
        })
    },
    //联系方式事件
    contactinput:function(e){
        console.log(e);
        this.setData({
            contact:e.detail.value
        })
    },
    nameinput:function(e){
        console.log(e);
        this.setData({
            name:e.detail.value
        })
    },
    //时间事件
    bindDateChange:function(e){
        console.log(e);
        this.setData({
            currentDate:e.detail.value
        })
    },
    //类型事件
    LeiXinginput:function(e){
        console.log(e);
        this.setData({
            index:e.detail.value
        })
    },
    //发布事件
    fabutap:function(e){
        
        if(this.data.name==""){
            wx.showToast({
                title: "请输入您的称呼",
                icon: "error",
                duration: 1000
              })
        }
        else if(this.data.item_name==""){
            wx.showToast({
                title: "请输入您丢失或拾取的物品名",
                icon: "error",
                duration: 1000
              })
        }
        else if(this.data.contact==0){
            wx.showToast({
                title: "请输入您的联系方式",
                icon: "error",
                duration: 1000
              })
        }
        else{
        DB.add({
            data: {
                description:this.data.description,
                item_name:this.data.item_name,
                location:this.data.location,
                name:this.data.name,
                contact:this.data.contact,
                releaseDate:this.data.currentDate.replace(/-/g,'')*1,
                type:this.data.index,

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
        console.log(this.data.description);
        console.log(this.data.item_name);
        console.log(this.data.location);
        console.log(this.data.name);
        console.log(this.data.contact);
        console.log(this.data.currentDate);
        console.log(this.data.currentDate.replace(/-/g,'')*1);
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