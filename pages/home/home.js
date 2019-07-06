//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectNumberList: ['2吨', '5吨', '8吨', '10吨', '15吨','15吨以上'], //车辆吨位
    printNum:null, //打印编号
    pickUpCode:null, //提货码
    dataList:[
      { name: "", phone: null, carNumber: null, selectNumberValue: 0},
    ],
    addSrc:'../../images/add.png',
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
  // 增加 车辆
  _addCarNum: function(){
    let dataList = JSON.parse(JSON.stringify(this.data.dataList));
    dataList.push({ name: "", phone: null, carNumber: null, selectNumberValue: 0},)
    this.setData({
      dataList
    })
  },
  // 提交 
  _submit:function(){
    this._showToast('等待协议')
    
  },
  // 扫码
  _scanCode(){
    let that = this;
    wx.scanCode({
      onlyFromCamera:true,
      scanType: ['barCode', 'qrCode'],
      success(res){
        console.log(res,'res')
        that._showToast('成功')
        that.setData({
          pickUpCode: res.result
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
  
})
