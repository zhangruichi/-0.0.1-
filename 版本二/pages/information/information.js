// pages/information/information.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selfgender:"",
        selfname:"",
        array:["男","女"],
        array_2:["计算机学院","地球科学学院","资源学院","材料与化学学院","环境学院","工程学院","地球物理与空间信息学院","机械与电子信息学院","经济管理学院","外国语学院","地理与信息工程学院","数学与物理学院","体育学院","珠宝学院","艺术与传媒学院","公共管理学院","马克思学院","自动化学院","海洋学院","未来技术学院"],
        array_3:["否","是"],
        index:0,
        index_2:0,
        index_3:0,
        name:"",
        phone:"",
        mail:"",
        qq:"",
        class:"",
    },
    nameinput:function(e)
    {
        this.setData(
            {
                name:e.detail.value
            }
        )
    },
    phoneinput:function(e)
    {
        this.setData(
            {
                phone:e.detail.value
            }
        )
    },
    mailinput:function(e)
    {
        this.setData(
            {
                mail:e.detail.value
            }
        )
    },
    qqinput:function(e)
    {
        this.setData(
            {
                qq:e.detail.value
            }
        )
    },
    classinput:function(e)
    {
        this.setData(
            {
                class:e.detail.value
            }
        )
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    LeiXinginput:function(e){
        this.setData({
            index:e.detail.value
        })
    },
    xueyuaninput:function(e){
        this.setData({
            index_2:e.detail.value
        })
    },
    yinsi:function (e) {
        this.setData({
            index_3:e.detail.value
        })
    },
    xiugai()
    {
        if(this.data.name=="")
        {
            wx.showModal({
                title:"名字不能为空",
                showCancel:false,
              })
        }
        else{
            const app=getApp();
            const db=wx.cloud.database();
            db.collection('userinfo').where(
                {
                    _openid:app.globalData.openid
                }
            ).update(
                {
                    data:{
                    name:this.data.name,
                    gender:this.data.index,
                    phone:this.data.phone,
                    mail:this.data.mail,
                    qq:this.data.qq,
                    class:this.data.class,
                    xueyuan:this.data.index_2,
                    yinsi:this.data.index_3
                    },
                    success:function(res) {
                        wx.showModal({
                            title:"修改成功",
                            showCancel:false,
                          })
                    }
                }
            )
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
        else
        {
        const db=wx.cloud.database();
        db.collection("userinfo").where(
            {
                _openid:app.globalData.openid
            }
        ).get()
        .then(res=>
        {
        this.setData(
            {
                selfname:res.data[0].name,
                name:res.data[0].name,
                index:res.data[0].gender,
                phone:res.data[0].phone,
                mail:res.data[0].mail,
                qq:res.data[0].qq,
                class:res.data[0].class,
                index_2:res.data[0].xueyuan,
                index_3:res.data[0].yinsi
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