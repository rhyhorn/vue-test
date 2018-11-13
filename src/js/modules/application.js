const DEFAULT_MODULE_SELECTOR = '[data-module]';

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
            return;
        }

        const widgetData = this.registry.get(element.dataset.module, null);
        if (widgetData === null) {
            return;
        }

        this.widgetFactory.create(element, widgetData);
    }
}