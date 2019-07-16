import { deliveryFormGetdetail, deliveryFormStock } from "../../utils/getData.js"

Page({
  data: {
    detailDate:{},
    detailID:'',
  },
  onLoad: function (option) {
    let id = option.id;
    this._getDatailDate(id)
  },
  _getDatailDate(id){
    deliveryFormGetdetail(id)
    .then(
      res=>{
        console.log(JSON.stringify(res))
        if (res.data.code === 200) {
          this.setData({
            detailDate: res.data.data,
            detailID: id,
          })
        } else {
          this._showToast(res.data.message)
        }
      }
    )
    .catch(
      err=>{
        console.log(err)
      }
    )
  },
  // 完成备货
  _confirmDelivery(){
    let detailID = this.data.detailID;
    deliveryFormStock(detailID)
    .then(
      res => {
        console.log(JSON.stringify(res))
        if (res.data.code === 200) {
          this._showToast("提交成功")
          wx.navigateTo({
            url: `../showPickList/showPickList`,
          })
        } else {
          this._showToast(res.data.message)
        }
      }
    )
    .catch(
      err => {
        console.log(err)
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
