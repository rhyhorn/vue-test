import Registry from './modules/registry';
import WidgetFactory from './modules/widget-factory';
import Application from './modules/application';

import GameList from './widgets/game-list';
import Slider from './widgets/slider';
import PopupManager from './widgets/popup-manager';

import LoginPopup from './components/popups/login.vue';
import LoginForm from './components/login-form.vue';

const registry = new Registry({
  widgets: {
    GameList,
    Slider,
    PopupManager,
    LoginForm
  },
  popups: {
    LoginPopup
  }
});

const widgetFactory = new WidgetFactory();
let app = new Application(document.body, registry, widgetFactory);

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});


import request from './modules/request';

request.get('json/games.json')
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('error');
  });