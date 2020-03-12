// pages/button/button.js
// var common = require("../../pages/data/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setInter: '',
    equipid: 'yourequipid',
    apikey: 'yourapikey',

    rbtncolor:'#ffffff',
    rbtnstatus:false,
    ybtncolor: '#ffffff',
    ybtnstatus: false,
    gbtncolor: '#ffffff',
    gbtnstatus: false,
    bbtncolor: '#ffffff',
    bbtnstatus: false,
    beepbtncolor: '#ffffff',
    beepbtnstatus: false,
    checkbtncolor:'#ffffff',
    submitstatus:false,
    undostatus:false,

    opt_time:'00:00',
    opt_date:'1999-1-1',
    cur_date:'2020-3-10',
    start_time:'00:00',
    cur_time:"10:16",
    today:'2000-1-1',
    timenow:'00:00',
    pickerctl:false,
    pickcmd:'0',
    picklist: [false, false, false, false, false],
    pickflag:true,

    command:'{redled}:1',

    redledstatus:false,
    yellowledstatus:false,
    greenledstatus: false,
    blueledstatus: false,
    beepstatus: false,
    allstatus:false,


    equiplist: ['{redled}:', '{yellowled}:', '{blueled}:', '{greenled}:', '{beep}:']
  },
  changeDate:function(event){
    var date = event.detail.value
    this.setData({
      cur_date:date
    })
    if(this.data.cur_date>this.data.today){
      this.setData({
        start_time:'00:00'
      })
    }
    else{
      this.setData({
        start_time: this.data.timenow
      })
    }
  },
  changeTime:function(event){
    var time = event.detail.value
    this.setData({
      cur_time:time
    })
  },
  pickerchange:function(event){
    var status=event.detail.value
    this.setData({
      pickerctl:status
    })
  },
  redbtn:function(event){
    var uncheck = '#ffffff'
    var colornow = this.data.rbtncolor
    if(colornow == uncheck){
      var clr = '#eeffee'
      this.setData({
        rbtncolor: clr,
        rbtnstatus:true
      })
    }
    else{
      var clr = '#ffffff'
      this.setData({
        rbtncolor: clr,
        rbtnstatus: false
      })
    }
  },
  yellowbtn: function (event) {
    var uncheck = '#ffffff'
    var colornow = this.data.ybtncolor
    if (colornow == uncheck) {
      var clr = '#eeffee'
      this.setData({
        ybtncolor: clr,
        ybtnstatus: true
      })
    }
    else {
      var clr = '#ffffff'
      this.setData({
        ybtncolor: clr,
        ybtnstatus: false
      })
    }
  },
  bluebtn: function (event) {
    var uncheck = '#ffffff'
    var colornow = this.data.bbtncolor
    if (colornow == uncheck) {
      var clr = '#eeffee'
      this.setData({
        bbtncolor: clr,
        bbtnstatus: true
      })
    }
    else {
      var clr = '#ffffff'
      this.setData({
        bbtncolor: clr,
        bbtnstatus: false
      })
    }
  },
  greenbtn: function (event) {
    var uncheck = '#ffffff'
    var colornow = this.data.gbtncolor
    if (colornow == uncheck) {
      var clr = '#eeffee'
      this.setData({
        gbtncolor: clr,
        gbtnstatus: true
      })
    }
    else {
      var clr = '#ffffff'
      this.setData({
        gbtncolor: clr,
        gbtnstatus: false
      })
    }
  },
  beepbtn: function (event) {
    var uncheck = '#ffffff'
    var colornow = this.data.beepbtncolor
    if (colornow == uncheck) {
      var clr = '#eeffee'
      this.setData({
        beepbtncolor: clr,
        beepbtnstatus: true
      })
    }
    else {
      var clr = '#ffffff'
      this.setData({
        beepbtncolor: clr,
        beepbtnstatus: false
      })
    }
  },
  operateAll:function(id){
    var i = 0
    for(i=0;i<this.data.equiplist.length;i++){
      var command = this.data.equiplist[i]+id
      this.operate(command)
      this.sleep(500)
      // console.log(command)
    }
  },
  sleep: function (numberMillis){
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  },
  allcheck:function(){
    if (this.redledstatus && this.yellowledstatus && this.blueledstatus && this.greenledstatus && this.beepstatus){
      this.setData({
        allstatus:true
      })
    }
  },
  allchange:function(event){
    var status = event.detail.value
    this.setData({
      redledstatus: status,
      yellowledstatus: status,
      greenledstatus: status,
      blueledstatus: status,
      beepstatus: status,
      allstatus:status
    })
    if(status){
      this.operateAll('1')
    }
    else{
      this.operateAll('0')
    }
  },
  redledchange:function(event){
    var status = event.detail.value
    this.setData({
      redledstatus:status
    })
    
    if (this.data.redledstatus){
      var command = '{redled}:1'
      this.operate(command)
    }
    else{
      var command = '{redled}:0'
      this.operate(command)
    }
    this.allcheck()
  },
  yellowledchange: function (event) {
    var status = event.detail.value
    this.setData({
      yellowledstatus: status
    })

    if (this.data.yellowledstatus) {
      var command = '{yellowled}:1'
      this.operate(command)
    }
    else {
      var command = '{yellowled}:0'
      this.operate(command)
    }
    this.allcheck()
  },
  blueledchange: function (event) {
    var status = event.detail.value
    this.setData({
      blueledstatus: status
    })

    if (this.data.blueledstatus) {
      var command = '{blueled}:1'
      this.operate(command)
    }
    else {
      var command = '{blueled}:0'
      this.operate(command)
    }
    this.allcheck()
  },
  greenledchange: function (event) {
    var status = event.detail.value
    this.setData({
      greenledstatus: status
    })

    if (this.data.greenledstatus) {
      var command = '{greenled}:1'
      this.operate(command)
    }
    else {
      var command = '{greenled}:0'
      this.operate(command)
    }
    this.allcheck()
  },
  beepchange: function (event) {
    var status = event.detail.value
    this.setData({
      beepstatus: status
    })

    if (this.data.beepstatus) {
      var command = '{beep}:1'
      this.operate(command)
    }
    else {
      var command = '{beep}:0'
      this.operate(command)
    }
    this.allcheck()
  },
  gettime:function(event){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp)
    var year = date.getFullYear()
    var mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    var day = date.getDate() < 10 ? '0'+ date.getDate(): date.getDate()
    var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var datenow = year +'-'+ mouth +'-'+ day
    var timenow = hour+':'+minute
    var temp = [datenow,timenow]
    return temp
  },
  renew_time:function(){
    var temp = this.gettime()
    var d = temp[0]
    var t = temp[1]
    // console.log(t, d)
    this.setData({
      today: d,
      timenow: t
    })
  },
  onShow: function(){
    var temp = this.gettime()
    var d = temp[0]
    var t = temp[1]
    var statusTemp
    this.setData({
      cur_date:d,
      cur_time:t,
      start_time:t
    }) 
    var that = this;
    that.data.setInter = setInterval(function () {
      that.renew_time()
      that.timecheck()
      that.onGetData()
    }, 1000)
    
  },
  operate: function (comm) {
    wx.request({
      url: 'http://api.heclouds.com/cmds?device_id='+this.data.equipid,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": this.data.apikey
      },
      data: comm,
      success(res) {
        // console.log(res)
      }
    })
  },
  submit:function(){
    var cmd_list = [this.data.rbtnstatus,this.data.ybtnstatus,this.data.bbtnstatus,this.data.gbtnstatus,this.data.beepbtnstatus]
    this.setData({
      opt_time:this.data.cur_time,
      opt_date:this.data.cur_date,
      picklist:cmd_list,
      pickflag:true
    })
    if(this.data.pickerctl){
      this.setData({
        pickcmd:'1'
      })
    }
    else{
      this.setData({
        pickcmd: '0'
      })
    }
  },
  timecheck:function(){
    // console.log('checking', this.data.opt_time, this.data.opt_date, this.data.today)
    var i
    var len
    var flag1 = (this.data.opt_date == this.data.today)
    var flag2 = (this.data.opt_time == this.data.timenow)
    // console.log(flag1,flag2)
    if(flag1 && flag2 && this.data.pickflag){
      for (i = 0, len = this.data.picklist.length;i<len;i++){
        if(this.data.picklist[i]){
          var command = this.data.equiplist[i]+this.data.pickcmd
          this.sleep(1000)
          this.operate(command)
          this.setData({
            pickflag:false
          })
        }
      }
      this.undo()
    }
  },
  undo:function(){
    this.setData({
      pickflag:false,
      rbtnstatus:false,
      rbtncolor:'#ffffff',
      ybtnstatus: false,
      ybtncolor: '#ffffff',
      gbtnstatus: false,
      gbtncolor: '#ffffff',
      bbtnstatus: false,
      bbtncolor: '#ffffff',
      beepbtnstatus: false,
      beepbtncolor: '#ffffff'
    })
  },
  onHide: function () {
    clearInterval(this.data.setInter)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.setInter)
  },
  onGetData:function(){
    var that=this
    // beep
    wx.request({
      url: 'http://api.heclouds.com/devices/' + that.data.equipid + "/datapoints?datastream_id=Beep",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "api-key": that.data.apikey
      },
      data: {
      },
      success(res) {
        if (res.data.data.count == 1) {
          var status = res.data.data.datastreams[0].datapoints[0].value
          var tempStatus = false
          if (status == 1) {
            tempStatus = true
          }
          else {
            tempStatus = false
          }
          that.setData({
            beepstatus: tempStatus
          })
        }
      }
    })
    //red led
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
          var tempStatus = false
          if (status == 1) {
            tempStatus = true
          }
          else {
            tempStatus = false
          }
          that.setData({
            redledstatus: tempStatus
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
          var tempStatus = false
          if (status == 1) {
            tempStatus = true
          }
          else {
            tempStatus = false
          }
          that.setData({
            yellowledstatus: tempStatus
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
          var tempStatus = false
          if (status == 1) {
            tempStatus = true
          }
          else {
            tempStatus = false
          }
          that.setData({
            blueledstatus: tempStatus
          })
        }
      }
    })
    //green led
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
          var tempStatus = false
          if (status == 1) {
            tempStatus = true
          }
          else {
            tempStatus = false
          }
          that.setData({
            greenledstatus: tempStatus
          })
        }
      }
    })
  }
})