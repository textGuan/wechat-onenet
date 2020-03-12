// pages/acc_data/acc_data.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setInter: '',
    dataList: [
      {
        time: 'none',
        datax: 'none',
        datay: 'none',
        dataz: 'none'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onGetData: function () {
    var that = this
    wx.request({
      url: 'http://api.heclouds.com/devices/' + app.equipid + "/datapoints?datastream_id=Zg,Yg,Xg&limit=10",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": app.apikey
      },
      data: {
      },
      success(res) {
        var temp = [
          {
            time: 'none',
            datax: 'none',
            datay: 'none',
            dataz: 'none'
          }
        ]
        if (res.data.data.count != 0) {
          var n = (res.data.data.count)/3
          var i
          for (i = 0; i < n; i++) {
            var at = res.data.data.datastreams[0].datapoints[i].at
            var attemp = String(at).split(' ')
            var timetemp = attemp[1].split('.')
            at = timetemp[0]
            var x = res.data.data.datastreams[0].datapoints[i].value
            var y = res.data.data.datastreams[1].datapoints[i].value
            var z = res.data.data.datastreams[2].datapoints[i].value
            var input = {
              time: at,
              datax: x,
              datay: y,
              dataz: z
            }
            temp[i] = input
          }
          that.setData({
            dataList: temp
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.data.setInter = setInterval(function () {
      that.onGetData()
      // that.getStatus1()
    }, 3000)
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
})