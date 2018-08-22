//index.js
//获取应用实例
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪' 
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: '',
    nowWeather: ''
  },
  onLoad() {
    this.getNow(); 
  },
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    });
  },
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '上海'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        let result = res.data.result
        let nowTemp = result.now.temp
        let nowWeather = result.now.weather
        this.setData({
          nowTemp: nowTemp + '°',
          nowWeather: weatherMap[nowWeather],
          nowWeatherBg: "/images/" + nowWeather + "-bg.png"
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[nowWeather]
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})