// pages/demo3/demo3.js
Page({
    data: {
     userinfo:{},
     tmpname:""
    },
    handlelogin()
    {
        wx.getUserProfile({
          desc: '获取你的昵称，头像，地区及性别',
          success:(res)=>
          {
             var app=getApp();
             this.setData(
               {
                 userinfo:res.userInfo,
                 tmpname:res.userInfo.nickName
               }
             );
             app.globalData.userInfo=res.userInfo;
             app.globalData.islogin=1;
             const db=wx.cloud.database();
             db.collection('userinfo').add(
             {
                data:{
                name:res.userInfo.nickName,
                gender:res.userInfo.gender,
                phone:"",
                mail:"",
                qq:"",
                class:"",
                xueyuan:0,
                     },
                fail(err)
                {
                  
                }
              }
              )
              db.collection('userinfo').where({
                _openid:app.globalData.openid
              }).get()
              .then(rese=>{
                this.setData(
                  {
                    tmpname:rese.data[0].name
                  }
                )
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
      var app=getApp();
      if(app.globalData.islogin==1)
      {
      const db=wx.cloud.database();
      db.collection('userinfo').where({
        _openid:app.globalData.openid
      }).get()
      .then(rese=>{
        this.setData(
          {
            tmpname:rese.data[0].name
          }
        )
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