// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['aa','bb','cc','dd'],
    equipList:[
      {
        id:'175461565',
        name:'aaaaa',
        status:'online'
      },
      {
        id:'2854516546',
        name:'bbbbbb',
        status:'offline'
      },
      {
        id: '3962120546',
        name: 'ccc',
        status: 'online'
      },
      {
        id: '4588521630',
        name: 'ddddddd',
        status: 'offline'
      }
    ],
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
    var i
    for(i=0;i<this.data.equipList.length;i++){
      var name = this.data.equipList[i].name
      var temp = this.data.array
      temp[i] = name
      this.setData({
        arrray:temp
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