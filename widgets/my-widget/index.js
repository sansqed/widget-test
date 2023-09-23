import React from 'react';
import ReactDOM from 'react-dom';
import WidgetContainer from './WidgetContainer';
const { WIDGET_TAG_NAME } = require('./tagname');

class Widget extends HTMLElement{
  constructor(){
    super(); 
  }

  static el;

  static connectedCallback({ parentElement = null, ...props } = {}) {
    const component = <WidgetContainer {...props} />;
    console.log("here here")
    function doRender() {
      if (EmbeddableWidget.el) {
        throw new Error('EmbeddableWidget is already mounted, unmount first');
      }
      const el = document.getElementById(WIDGET_TAG_NAME);
      if (parentElement) {
        document.querySelector(parentElement).appendChild(el);
      } else {
        document.body.appendChild(el);
      }
      ReactDOM.render(
        component,
        el,
      );  
      EmbeddableWidget.el = el;
    }

    if (document.readyState === 'complete') {  
      doRender();
    } else {
      window.addEventListener('load', () => {
        doRender();
      });
    }
  }

  static disconnectedCallback() {
    if (!EmbeddableWidget.el) {
      throw new Error('EmbeddableWidget is not mounted, mount first');
    }
    ReactDOM.unmountComponentAtNode(EmbeddableWidget.el);
    EmbeddableWidget.el.parentNode.removeChild(EmbeddableWidget.el);
    EmbeddableWidget.el = null;
  }
}

customElements.define(
  WIDGET_TAG_NAME,
  Widget
);
