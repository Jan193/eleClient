// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const produceNewsData = function () {
  let articles = []
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      img: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      auther: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}

const swiperData = function () {
  let list = []
  for (let i = 0; i < 26; i++) {
    let item = {
      imgUrl: Random.dataImage('90x90', 'mock图片'),
      name: Random.cname()
    }
    list.push(item)
  }
  return {
    msg: 'success',
    data: list
  }
}

const shopList = function () {
  let list = []
  for (let i = 0; i < 10; i++) {
    var data = Mock.mock({
      'salesVolume|10-100': 30,
      'star|1-5': '★'
    })
    let item = {
      'id': Random.id(),
      logo: Random.dataImage('130x130', '商家logo'),
      name: Random.cname(),
      'market|200-4000': 200,
      type: Random.name(),
      special: '满25减10， 满49减24',
      discount: '正常折扣',
      shopName: Random.cword(3, 6),
      salesVolume: data.salesVolume,
      star: data.star
    }
    list.push(item)
  }
  return {
    msg: 'success',
    data: list
  }
}

const goodType = () => {
  let list = []
  for (let i = 0; i < 20; i++) {
    let item = {
      id: Random.id(),
      name: Random.cname(),
      count: 0
    }
    list.push(item)
  }
  return list
}

const goodList = () => {
  let list = []
  for (let i = 0; i < 10; i++) {
    let item = {
      name: Random.word(),
      price: Random.integer(1, 30),
      imgUrl: Random.dataImage('90x90', '商品'),
      typeId: 1
    }
    list.push(item)
  }
  return list
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData)

// swiper data
Mock.mock('/api/swiperList', 'get', swiperData)

Mock.mock('/api/shopList', 'get', shopList)

// 商品类型
Mock.mock('/api/goodType', goodType)

// 商品列表
Mock.mock('/api/goodList', goodList)
