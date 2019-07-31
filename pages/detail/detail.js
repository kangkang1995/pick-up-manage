//index.js
//获取应用实例
const app = getApp()
import { deliveryFormSelectByUserid } from "../../utils/getData.js"

Page({
  data: {
    detailData:{},
    userid:""
  },
  
  onLoad: function (option) {
    let id = option.id;
    this.getDataDetail(id)
  },

  onShow:function(){
    let that = this;
    // wx.getStorage({
    //   key: 'userInfo',
    //   success(res) {
    //     that.setData({
    //       userid: res.data.id,
    //     })
    //   }
    // })
    // that.getDataDetail(res.data.id)
  },
  
  getDataDetail: function (userid){
    // let userid = this.data.userid;
    deliveryFormSelectByUserid(userid)
    .then(
      res=>{
        console.log(JSON.stringify(res),'res')
        if (res.data.code === 200) {
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
