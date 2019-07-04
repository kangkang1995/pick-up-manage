//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectNumberList: ['2吨', '5吨', '8吨', '10吨', '15吨','15吨以上'],
    dataList:[
      { name: "", phone: null, carNumber: null, selectNumberValue: 0},
    ]
  },
  onLoad: function () {
  },
  _selectValue: function (event){
    let index = event.currentTarget.dataset.index;
    let value = event.detail.value;
    console.log(this.data.dataList)
    let dataList = JSON.parse(JSON.stringify(this.data.dataList))
    dataList[index].selectNumberValue = value;
    this.setData({
      dataList
    })
  }
  
})
