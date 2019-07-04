//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dataList:[
      {name:"",phone:null,carNumber:null,selectNumber:[
        {index:0,value:"2吨",},
        { index: 1, value: "5吨", },
        { index: 2, value: "8吨", },
        { index: 3, value: "10吨", },
        { index: 4, value: "15吨", },
        { index: 5, value: "15吨以上", },
      ]}
    ]
  },
  onLoad: function () {
    
  },
  
})
