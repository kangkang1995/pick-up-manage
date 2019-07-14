//logs.js
import { deliveryOrderDetail } from "../../utils/getData.js";

Page({
  data: {
    codeSrc:'../../images/whitecode.png',
    detailData:{},
    unsubmitted:false, // 未提交
    underReview: false, //审核中
    passed: false, // 已通过
    sureCompass:false, //确认到达
    surePickUp: false, //确认提货
  },
  onLoad: function () {
    
  },
  _scanCode:function(){
    let that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success(res) {
        that._showToast('成功')
        that._getData('T001')
      },
      fail(err) {
        console.log(err, 'err')
      }
    })
  },

  _getData:function(code){
    deliveryOrderDetail(code)
    .then(
      res => {
        console.log(JSON.stringify(res), 'res')
        if (res.data.code === 200) {
          if (res.data.data.deliveryOrderState === 0){
            this.setData({
              unsubmitted: true,
            })
          } else if (res.data.data.deliveryOrderState === 1){
            this.setData({
              underReview: true,
            })
          } else if (res.data.data.deliveryOrderState === 2){
            if (res.data.data.driverState === 0){
              this.setData({
                sureCompass: true,
              })
            } else if (res.data.data.driverState === 1) {
              this.setData({
                surePickUp: true,
              })
            }
            
          }
          this.setData({
            detailData: res.data.data
          })
        } else {
          this._showToast(res.data.message)
        }
      }
    )
    .catch(
      err => {
        console.log(err, 'err')
      }
    )
  },

  // 提示
  _showToast: function (text) {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },

})
