// app.js
App({
  globalData: {
    userInfo: null,
    openid:'',
    islogin:0
  },
  onLaunch() {
    wx.cloud.init({
      env:"env-3gn8mpr00af80a85"
    })
    // 登录
    let that=this;
    wx.cloud.callFunction(
      {
        name:'login',
        success(res)
        {
          that.globalData.openid=res.result.openid;
        }
      }
    )
  }
})
