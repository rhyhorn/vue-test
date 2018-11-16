import Registry from './modules/registry';
import WidgetFactory from './modules/widget-factory';
import Application from './modules/application';
import Request from './modules/request/request';

import ApplicationLoggerDecorator from './modules/application-logger';

import GameList from './widgets/game-list';
import Slider from './widgets/slider';
import PopupManager from './widgets/popup-manager';

import LoginPopup from './components/popups/login.vue';

import {loggerDecorator} from "./modules/request/logger-decorator";
import {xrfTokenDecorator} from "./modules/request/xrf-token-decorator";
import {cachingDecorator} from "./modules/request/caching-decorator";

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

let app = new Application(document.body, registry, widgetFactory);
app = new ApplicationLoggerDecorator(app);

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

/* ---------------- */

let request = new Request();

loggerDecorator(request);
xrfTokenDecorator(request);
cachingDecorator(request, 200);

request.get('json/games.json');
request.get('json/games.json');
request.get('json/games.json');
request.get('json/games.json');
request.post('json/games.json');

