class Tooltip {
  static instance;
  element;
  _activateHanler = event => {
    const target = event.target.closest('[data-tooltip]');
    if (target) {
      const tooltipData = target.dataset.tooltip;
      target.addEventListener('pointermove', this._tooltipMove);
      this.render(tooltipData);
    }
  };
  _deactivateHandler = () => {
    document.removeEventListener('pointermove', this._tooltipMove);
    this.remove();
  };
  _tooltipMove = event => {
    const shift = 15;
    this.element.style.left = event.clientX + shift + 'px';
    this.element.style.top = event.clientY + shift + 'px';
  };

  constructor() {
    const instance = Tooltip.instance;
    if (instance) {
      return instance;
    } else {
      Tooltip.instance = this;
      return this;
    }
  }

  initialize () {
    document.addEventListener('pointerover', this._activateHanler);
    document.addEventListener('pointerout', this._deactivateHandler);
  }

  render(text) {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.innerText = text;
    this.element = tooltipElement;
    document.body.append(this.element);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener('pointerover', this._activateHanler);
    document.removeEventListener('pointerout', this._deactivateHandler);
    document.removeEventListener('pointermove', this._tooltipMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
