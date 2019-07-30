import { deliveryFormByStaffUserId } from "../../utils/getData.js"

Page({
  data: {
    detailDate:[],
    dataId:"",
  },
  onLoad: function () {

  },
  onShow() {
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that._getDatail(res.data.id)
      }
    })
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
          wx.stopPullDownRefresh();
        } else {
          this._showToast(res.data.message)
          wx.stopPullDownRefresh();
        }
      }
    )
    .catch(
      err => {
        this._showToast("失败")
        wx.stopPullDownRefresh();
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
  _linkDetail(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../showPickListDetail/showPickListDetail?id=${id}`,
    })
  },
  _isTimeOut(newTime){
    let timestamp = (new Date()).getTime();    // 当前时间戳
    // 2019 - 07 - 16 13: 51: 40
    let deliveryTime = (new Date(newTime)).getTime();
    return (timestamp - deliveryTime >= 0)?"司机超时":'未完成' 
  },
})
