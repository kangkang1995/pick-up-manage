import { deliveryFormByStaffUserId } from "../../utils/getData.js"

Page({
  data: {
    detailDate:[],
    dataId:"",
  },
  onLoad: function () {

  },
  onShow(){
    this._getDatail(1)
  },
  // shang la
  onPullDownRefresh(){
    let dataId = this.data.dataId;
    this._getDatail(dataId)
  },
  _getDatail(id){
    deliveryFormByStaffUserId(id)
    .then(
      res => {
        if (res.data.code === 200) {
          this.setData({
            detailDate: res.data.data,
            dataId:id
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
  _linkDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../showPickListDetail/showPickListDetail?id=${index+1}`,
    })
  },
  _isTimeOut(newTime){
    let timestamp = (new Date()).getTime();    // 当前时间戳
    // 2019 - 07 - 16 13: 51: 40
    let deliveryTime = (new Date(newTime)).getTime();
    console.log(timestamp - deliveryTime)
    return (timestamp - deliveryTime >= 0)?"司机超时":'未完成' 
  },
})
