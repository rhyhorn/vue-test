import Registry from './modules/registry';
import WidgetFactory from './modules/widget-factory';
import Application from './modules/application';

import GameList from './widgets/game-list';
import Slider from './widgets/slider';
import PopupManager from './widgets/popup-manager';

import LoginPopup from './components/popups/login.vue';

const registry = new Registry({
    widgets: {
        GameList,
        Slider,
        PopupManager
    },
    popups: {
        LoginPopup
    }
});

const widgetFactory = new WidgetFactory();
const app = new Application(document.body, registry, widgetFactory);

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

