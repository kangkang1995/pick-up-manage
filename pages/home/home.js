//index.js
//获取应用实例
const app = getApp()
import { deliveryFormAdd, wxUserCode, wxRefreshUserInfo } from "../../utils/getData.js"

Page({
  data: {
    selectNumberList: ['2吨', '5吨', '8吨', '10吨', '15吨','15吨以上'], //车辆吨位
    pickUpCode:null, //提货码
    pickUpCodeList: [
      {value:""}
    ], //提货码
    dataList:[
      { name: "", phone: null, carNumber: null, unit:null, selectNumberValue: 0},
    ],
    addSrc:'../../images/add.png',
    userid:1,//用户识别码
    showDetail:false, // 是否展示详情
    detailData:{},
  },
  onShow() {
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (!res.data){
        }else{
          that.setData({
            userid: res.data.id,
          })
          wxRefreshUserInfo(res.data.id)
            .then(
              res => {
                wx.removeStorage({
                  key: 'userInfo',
                });
                wx.setStorage({
                  key: "userInfo",
                  data: res.data.data,
                })
                if (res.data.data.type === 0) {
                  // wx.redirectTo({
                  //   url: `../home/home`,
                  // })
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
      },
      fail(err){
        that._login()
      }
    })
    
  },
  onLoad: function () {
  },
  // 改变 提货单号
  _changePrintNum: function (event){
    let value = event.detail.value;
    let printNum = this.data.printNum;
    this.setData({
      printNum: value
    })
  },
  // 改变 dataList 的 input
  _changeInput:function(event){
    let value = event.detail.value;
    let type = event.currentTarget.dataset.type;
    let index = event.currentTarget.dataset.index;
    let dataList = JSON.parse(JSON.stringify(this.data.dataList));
    dataList[index][type] = value;
    this.setData({
      dataList
    })
  },
  // 选中车辆吨位
  _selectValue: function (event){
    let index = event.currentTarget.dataset.index;
    let value = event.detail.value;
    let dataList = JSON.parse(JSON.stringify(this.data.dataList));
    dataList[index].selectNumberValue = value;
    this.setData({
      dataList
    })
  },
  // 增加 提货码
  _addPrint(){
    let pickUpCodeList = JSON.parse(JSON.stringify(this.data.pickUpCodeList));
    let dataList = this.data.dataList;
    if (dataList.length <= 1){
      pickUpCodeList.push({ value: '' })
      this.setData({
        pickUpCodeList
      })
    }else{
      this._showToast('不允许添加')
    }
    
  },
  // 增加 车辆
  _addCarNum: function(){
    let dataList = JSON.parse(JSON.stringify(this.data.dataList));
    let pickUpCodeList = this.data.pickUpCodeList;
    if (pickUpCodeList.length <= 1){
      dataList.push({ name: "", phone: null, carNumber: null, selectNumberValue: 0 })
      this.setData({
        dataList
      })
    }else{
      this._showToast('不允许添加')
    }
    
  },
  // 提交 
  _submit:function(){
    let fromData = {};
    let deliveryCarVos = [];
    let dataList = JSON.parse(JSON.stringify(this.data.dataList));
    let selectNumberList = this.data.selectNumberList;
    let delivery_order_codes = [];
    let pickUpCodeList = this.data.pickUpCodeList; 
    let userid = this.data.userid;//用户识别符
    for (let i = 0; i < dataList.length; i++){
      if (!this._regFunction(Number(dataList[i].phone), /^1[0-9]\d{9}$/)){
        this._showToast('手机号格式不正确')
        return
      }
    }

    dataList.map(function(listItem,index){
      deliveryCarVos[index]={
        carNo: listItem.carNumber,
        carTons: selectNumberList[listItem.selectNumberValue],
        deliveryDepartment: listItem.unit,
        driverName:listItem.name,
        driverPhone:listItem.phone,
      }
    })
    pickUpCodeList.map(function(listItem,index){
      delivery_order_codes[index] = listItem.value;
    })

    fromData={
      deliveryCarVos,
      delivery_order_codes,
      userid
    };
    deliveryFormAdd(fromData)
    .then(
      res=>{
        if (res.data.code === 200) {
          this._showToast("提交成功")
          this.setData({
            showDetail:true,
            detailData: res.data.data,
          })
        }else{
          this._showToast(res.data.message)
        }
      }
    )
    .catch(
      err=>{
        console.log(err, "err")
      }
    )
    
    // this._showToast('等待协议')
    // wx.redirectTo({
    //   url: "../detail/detail",
    // })
    
  },
  // 扫码
  _scanCode(event){
    let index = event.currentTarget.dataset.index;
    let pickUpCodeList = JSON.parse(JSON.stringify(this.data.pickUpCodeList));
    let that = this;
    wx.scanCode({
      onlyFromCamera:true,
      scanType: ['barCode', 'qrCode'],
      success(res){
        that._showToast('成功')
        pickUpCodeList[index].value = "";
        pickUpCodeList[index].value = res.result;
        that.setData({
          pickUpCodeList
        })
      },
      fail(err){
        console.log(err, 'err')
      }
    })
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

  _regFunction : function(value, reg){
    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  _login() {
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
              res => {
                wx.setStorage({
                  key: "userInfo",
                  data: res.data.data,
                })
                if (res.data.data.type === 0) {
                  wx.redirectTo({
                    // url: `../home/home`,
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
              err => {
                that._showToast('登录失败！')
              }
            )
        } else {
          that._showToast('登录失败！')
        }
      }
    })
  }
  
})
