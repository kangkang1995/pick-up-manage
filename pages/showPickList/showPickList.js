import { deliveryFormByStaffUserId, deliveryFormSelectByUserid  } from "../../utils/getData.js"

Page({
  data: {
    detailDate:[],
    dataId:"",
  },
  onLoad: function (option) {
    let that = this;
    let id = option.id;
    if (option.id){
      this.getDataStatus(id)
    }else{
      wx.getStorage({
        key: 'userInfo',
        success(res) {
          that.setData({
            dataId: res.data.id
          })
          that._getDatail(res.data.id)
        }
      })
    }
  },
  onShow() {
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          dataId: res.data.id
        })
        that._getDatail()
      }
    })
  },
  
  // shang la
  onPullDownRefresh(){
    let dataId = this.data.dataId;
    this._getDatail(dataId)
  },
  getDataStatus(id){
    deliveryFormSelectByUserid(id)
      .then(
        res => {
          if (res.data.code === 200) {
            if (res.data.data.state === 3){
              wx.navigateTo({
                url: `../showPickListDetail/showPickListDetail?id=${id}`,
              })
            }
            
          } else {
            this._showToast(res.data.message)
          }
        }
      )
      .catch(
        err => {
          this._showToast('服务报错')
        }
      )
  },
  _getDatail(id){
    let dataId = this.data.dataId; 
    deliveryFormByStaffUserId(dataId)
    .then(
      res => {
        if (res.data.code === 200) {
          this.setData({
            detailDate: res.data.data,
            // dataId:id
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
