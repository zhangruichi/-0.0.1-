// pages/person/person.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        it:"",
        pic:"",
        name:"",
        gender:"",
        telephone:"",
        email:"",
        qq:"",
        class:"",
        xueyuan:"",
        array:["男","女"],
        array_2:["计算机学院","地球科学学院","资源学院","材料与化学学院","环境学院","工程学院","地球物理与空间信息学院","机械与电子信息学院","经济管理学院","外国语学院","地理与信息工程学院","数学与物理学院","体育学院","珠宝学院","艺术与传媒学院","公共管理学院","马克思学院","自动化学院","海洋学院","未来技术学院"],
        yinsi:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    faxiaoxi:function () {
       wx.navigateTo({
         url: '../readfabu/readfabu',
         success: (result) => {},
         fail: (res) => {},
         complete: (res) => {},
       })
    },
    onLoad: function (options) {
        const app=getApp();
        this.setData({
            it:app.globalData.selectone
        })
        const db=wx.cloud.database();
        db.collection('userinfo')
        .where({
            _openid:this.data.it
          })
        .get()
        .then(res=>{
            if(res.data[0].yinsi==1)
            {
               console.log("ss");
               wx.showModal({
                 title:"该用户设置了隐私模式，无法查看信息",
                 showCancel:false,
                 success(res)
                 {
                     wx.navigateBack()
                 }
               })
           }
           else{
            this.setData({
              pic:res.data[0].url,
              name:res.data[0].name,
              gender:res.data[0].gender,
              telephone:res.data[0].phone,
              email:res.data[0].mail,
              qq:res.data[0].qq,
              class:res.data[0].class,
              xueyuan:res.data[0].xueyuan,
              yinsi:res.data[0].yinsi
            })
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