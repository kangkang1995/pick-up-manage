//index.js
//获取应用实例
const app = getApp()
import { deliveryFormSelectByUserid } from "../../utils/getData.js"

Page({
  data: {
    detailData:{},
  },
  
  onLoad: function () {
    
  },

  onShow:function(){
    this.getDataDetail()
  },

  getDataDetail:function(){
    let userid = '1';
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
      err=>{
        console.log(err,'err')
      }
    )
  }

  
})
