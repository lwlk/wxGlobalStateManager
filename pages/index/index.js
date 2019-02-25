import { connect } from '../../store/wx-store.js';
import { user } from '../../store/wx-modules.js';

let g_count = 0;

const pageConfig = {
  handleBtnClick() {
    const userName = this.data.user.userName + ' ' + ++g_count;
    user.emit({ userName });
  },
  handleGo() {
    wx.navigateTo({
      url: '../other/other',
    });
  }
};

connect(pageConfig, [ user ]);