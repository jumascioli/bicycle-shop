import CartDetailsView from '../views/CartDetails.js';

export default class CartDetailsController {
  constructor() {
    this.cartDetailsView = new CartDetailsView('#cart-details');

    this.init();
  }

  init() {
    this.initialRender();
  }

  initialRender() {
    this.cartDetailsView.render();
  }
}
