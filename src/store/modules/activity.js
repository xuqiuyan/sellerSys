
const activity = {
  state: {
    activityUrl: {
      activityThemeUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=508722581,3328270578&fm=173&app=25&f=JPG?w=621&h=398&s=41758F744E5952CC44DCC4D7030080BB',
      activityBgUrl: '',
      activityRewardUrl0: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=508722581,3328270578&fm=173&app=25&f=JPG?w=621&h=398&s=41758F744E5952CC44DCC4D7030080BB',
      activityRewardUrl1: '',
      activityRewardUrl2: '',
      activityRewardUrl3: '',
      activityRewardUrl4: '',
      activityRewardUrl5: '',
      activityRewardUrl6: '',
      activityRewardUrl7: '',
      activityRewardUrl8: '',
      activityRewardUrl9: '',
      activityRewardUrl10: '',
      activityRewardUrl11: ''
    }
  },
  mutations: {
    SET_URL: (state, tagName, url) => {
      state.activityUrl[tagName] = url
    }
  },
  actions: {
  }
}

export default activity
