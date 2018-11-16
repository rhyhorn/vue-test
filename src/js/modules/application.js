import logger from './logger';
import {getTimeStamp} from "../classes/Logger";

const DEFAULT_MODULE_SELECTOR = '[data-module]';

export const PATH_NOT_DEFINED = 'path not defined';
export const PATH_NOT_FOUND = 'path not found';

export default class Application {
  constructor(rootElement, registry, widgetFactory, options = {}) {
    const {
      moduleSelector = DEFAULT_MODULE_SELECTOR
    } = options;

    this.rootElement = rootElement;
    this.registry = registry;
    this.widgetFactory = widgetFactory;
    this.moduleSelector = moduleSelector;

    this.initWidget = this.initWidget.bind(this);
  }

  init() {
    this.rootElement
      .querySelectorAll(this.moduleSelector)
      .forEach(this.initWidget);
  }

  initWidget(element) {
    const path = element.dataset.module;
    if (path === undefined) {
      return {
        status: false,
        code: PATH_NOT_DEFINED
      };
    }

    console.groupCollapsed(getTimeStamp(), 'Application: init widget ', `'${path}'`);

    const widgetData = this.registry.get(path, null);
    if (widgetData === null) {
      console.warn(getTimeStamp(), 'widget not found in registry');
      console.groupEnd();

      return {
        status: false,
        code: PATH_NOT_FOUND
      };
    }

    console.info(getTimeStamp(), 'widget found in registry');
    const widget = this.widgetFactory.create(element, widgetData);
    console.info(getTimeStamp(), 'widget successfully initialized');
    console.groupEnd();
    return {
      status: true,
      data: widget
    }
  }
}