// pages/data/data.js
// var tempStatus = [true, true, true, true, true]
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setInter:'',
    oncolor:'#ff0000',
    color1: '#aaaaff',
    color2: '#aaaaff',
    color3: '#aaaaff',
    color4: '#aaaaff',
    accx: '未知',
    accy: '未知',
    accz: '未知',
    online:'检测中',
    equipid: 'yourequipid',
    apikey:'yourapikey',
    name:[
      {
        id:'1',
        title:'温度',
        unit:'℃',
        data:'未知'
      },
      {
        id: '2',
        title: '湿度',
        unit: '%',
        data: '未知'
      },
      {
        id: '3',
        title: '光照电压',
        unit: 'V',
        data: '未知'
      },
    ],
    status:[
      {
        id: 0,
        name: '名称',
        code:'代码',
        status: '状态'
      },
      {
        id: 1,
        name: '红灯',
        code: 'redled',
        status: 'off'
      },
      {
        id: 2,
        name: '黄灯',
        code: 'yellowled',
        status: 'off'
      },
      {
        id: 3,
        name: '绿灯',
        code: 'greenled',
        status: 'off'
      },
      {
        id: 4,
        name: '蓝灯',
        code: 'blueled',
        status: 'off'
      },
      {
        id: 5,
        name: '蜂鸣器',
        code: 'beep',
        status: 'off'
      }
    ]
    

  },
  te_data:function(e){
    wx.navigateTo({
      url: '../te_data/te_data',
    })
  },
  hu_data: function (e) {
    wx.navigateTo({
      url: '../hu_data/hu_data',
    })
  },
  li_data: function (e) {
    wx.navigateTo({
      url: '../light_data/light_data',
    })
  },
  acc_data: function (e) {
    wx.navigateTo({
      url: '../acc_data/acc_data',
    })
  },

  onGetData:function(){
    var that = this
    wx.request({
      url: 'http://api.heclouds.com/devices/'+that.data.equipid,
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data:{

      },
      success(res){
        var status = res.data.data.online
        if(status){
          that.setData({
            online:'在线'
          })
        }
        else{
          that.setData({
            online: '离线'
          })
        }
      }
    })
    that.getTe()
    that.getHu()
    that.getLi()
    that.getAcc()
    that.getLedandBeep()
  },

  getTe:function(){
    var that = this
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Temperature",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if (res.data.data.count == 1) {
          var te = res.data.data.datastreams[0].datapoints[0].value
          var temp = that.data.name
          temp[0].data = te
          that.setData({
            name: temp
          })
        }
      }
    })
  },
  getHu: function () {
    var that = this
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Humidity",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if (res.data.data.count == 1) {
          var hu = res.data.data.datastreams[0].datapoints[0].value
          var temp = that.data.name
          temp[1].data = hu
          that.setData({
            name: temp
          })
        }
      }
    })
  },
  getAcc: function () {
    var that = this
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Xg,Yg,Zg",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if(res.data.data.count == 3){
          var zg = res.data.data.datastreams[0].datapoints[0].value
          var yg = res.data.data.datastreams[1].datapoints[0].value
          var xg = res.data.data.datastreams[2].datapoints[0].value
          that.setData({
            accx:xg,
            accy:yg,
            accz:zg
          })
        }
      }
    })
  },
  getLi: function () {
    var that = this
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Light",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if (res.data.data.count == 1){
          var Light = res.data.data.datastreams[0].datapoints[0].value
          var temp = that.data.name
          temp[2].data = Light
          that.setData({
            name:temp
          })
        }
      }
    })
  },
  getLedandBeep: function () {
    var that = this
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Red_Led",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if (res.data.data.count == 1) {
          var status = res.data.data.datastreams[0].datapoints[0].value
          var temp = that.data.status
          if (status == 1) {
            temp[1].status = 'on'
          }
          else {
            temp[1].status = 'off'
          }
          that.setData({
            status: temp
          })
        }
      }
    })
    //yellow led
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Yellow_Led",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if (res.data.data.count == 1) {
          var status = res.data.data.datastreams[0].datapoints[0].value
          var temp = that.data.status
          if (status == 1) {
            temp[2].status = 'on'
          }
          else {
            temp[2].status = 'off'
          }
          that.setData({
            status: temp
          })
        }
      }
    })
    // green led
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Green_Led",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if (res.data.data.count == 1) {
          var status = res.data.data.datastreams[0].datapoints[0].value
          var temp = that.data.status
          if (status == 1) {
            temp[3].status = 'on'
          }
          else {
            temp[3].status = 'off'
          }
          that.setData({
            status: temp
          })
        }
      }
    })
    //blue led
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Blue_Led",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if (res.data.data.count == 1) {
          var status = res.data.data.datastreams[0].datapoints[0].value
          var temp = that.data.status
          if (status == 1) {
            temp[4].status = 'on'
          }
          else {
            temp[4].status = 'off'
          }
          that.setData({
            status: temp
          })
        }
      }
    })
    //beep
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Beep",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if(res.data.data.count==1){
          var status = res.data.data.datastreams[0].datapoints[0].value
          var temp = that.data.status
          if (status == 1) {
            temp[5].status = 'on'
          }
          else {
            temp[5].status = 'off'
          }
          that.setData({
            status: temp
          })
        }
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
    var that = this;
    that.data.setInter = setInterval(function () {
      that.onGetData()
      that.notice()
      // that.getStatus1()
    }, 3000)
  },

  notice:function(){
    var tempMax = 16
    if(this.data.name[0].data>tempMax){
      this.setData({
        color1:'#ff0000'
      })
      wx.setTabBarBadge({
        index: 0,
        text: '!'
      })
    }
    else{
      this.setData({
        color1: '#aaaaff'
      })
      wx.setTabBarBadge({
        index: 0,
        text: ''
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.setInter)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.setInter)

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

  },
})
