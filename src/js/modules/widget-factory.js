import Vue from 'vue';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);

export default class WidgetFactory {
    create(element, widgetData) {
        switch (true) {
            case (typeof widgetData === 'function'): {
                return widgetData(element);
            }
            default: {
                widgetData.el = element;
                return new Vue(widgetData);
            }
        }
    }
}