//index.js
//获取应用实例
const app = getApp()

import { wxUserCode,wxRefreshUserInfo } from "../../utils/getData.js";
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  onShow(){
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        wxRefreshUserInfo(res.data.id)
        .then(
          res=>{
            wx.removeStorage({
              key: 'userInfo',
            });
            wx.setStorage({
              key: "userInfo",
              data: res.data.data,
            })
            if (res.data.data.type === 0) {
              wx.redirectTo({
                url: `../home/home`,
              })
            } else if (res.data.data.type === 1) {
              wx.redirectTo({
                url: `../gatekeeper/gatekeeper`,
              })
            } else if (res.data.data.type === 2) {
              wx.redirectTo({
                url: `../showPickList/showPickList`,
              })
            }
          }
        )
      }
    })
  },
  _login(){
    let that = this;
    wx.login({
      success(res) {
        wx.removeStorage({
          key: 'userInfo',
        });
        if (res.code) {
          //发起网络请求
          wxUserCode(res.code)
          .then(
            res=>{
              wx.setStorage({
                key: "userInfo",
                data: res.data.data,
              })
              if (res.data.data.type === 0){
                wx.redirectTo({
                  url: `../home/home`,
                })
              } else if (res.data.data.type === 1) {
                wx.redirectTo({
                  url: `../gatekeeper/gatekeeper`,
                })
              } else if (res.data.data.type === 2) {
                wx.redirectTo({
                  url: `../showPickList/showPickList`,
                })
              }
            }
          )
          .catch(
            err=>{
              console.log(err)
              console.log('登录失败！')
            }
          )
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
