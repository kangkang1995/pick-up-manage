//logs.js
import { deliveryOrderDetail,deliveryOrderConfirmArrive,deliveryOrderConfirmDelivery } from "../../utils/getData.js";

Page({
  data: {
    codeSrc:'../../images/whitecode.png',
    detailData:{},
    isDetailData:false,
    unsubmitted:false, // 未提交
    underReview: false, //审核中
    passed: false, // 已通过
    sureCompass:false, //确认到达
    surePickUp: false, //确认提货
    datailCode:"",
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
        that._getData(res.result)
        that.setData({
          datailCode: res.result,
        })
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
          if (res.data.data.deliveryOrderState === 1){
            this.setData({
              underReview: true,
            })
          } else if (res.data.data.deliveryOrderState === 2){
            if (res.data.data.driverState === 0){
              this.setData({
                sureCompass: true,
                passed: true,
              })
            } else if (res.data.data.driverState === 1) {
              this.setData({
                surePickUp: true,
                passed: true,
              })
            }
            
          } else if (res.data.data.deliveryOrderState === 3){
            this._showToast('该提货单已提货')
            this.setData({
              isDetailData:false,
            })
          }
          this.setData({
            detailData: res.data.data,
            isDetailData:true,
          })
        } else if (res.data.code === 400) {
          this.setData({
            unsubmitted: true,
            isDetailData: true,
          })
        } 
        else if (res.data.code != 400 || res.data.code != 200){
          this._showToast(res.data.message)
        }
      }
    )
    .catch(
      err => {
        console.log(err, "err")
        this._showToast('服务报错')
      }
    )
  },

  // 确认到达
  _confirmArrive(){
    let datailCode = this.data.datailCode;
    deliveryOrderConfirmArrive(datailCode)
    .then(
      res => {
        console.log(JSON.stringify(res), 'res')
        if (res.data.code === 200) {
          this._showToast('操作成功')
          this.setData({
            sureCompass: false,
            passed: false,
            isDetailData: false,
          })
        }else{
          this._showToast(res.data.message)
        }
      }
    )
    .catch(
      err => {
        console.log(err, "err")
        this._showToast('服务报错')
      }
    )
  },

  // 确认 提货
  _confirmDelivery() {
    let datailCode = this.data.datailCode;
    deliveryOrderConfirmDelivery(datailCode)
      .then(
        res => {
          console.log(JSON.stringify(res), 'res')
          if (res.data.code === 200) {
            this._showToast('操作成功')
            this.setData({
              surePickUp: false,
              passed: false,
              isDetailData: false,
            })
          } else {
            this._showToast(res.data.message)
          }
        }
      )
      .catch(
        err => {
          console.log(err, "err")
          this._showToast('服务报错')
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
