import ProductsView from '../views/Products.js';
import { getProducts } from '../services/products.js';
import ProductsModel from '../models/Products.js';
import { setListener } from '../utils/dom.js';

export default class ProductsController {
  constructor() {
    this.productsView = new ProductsView('#product-list');
    this.productsModel = new ProductsModel();

    this.init();
  }

  init() {
    this.initialRender();

    this.setListeners();
  }

  async initialRender() {
    try {
      const products = await getProducts();

      this.productsView.render(products);
    } catch (error) {
      console.error(error);
    }
  }

  setListeners() {
    setListener('#search-field', 'input', this.handleSearchFilter.bind(this));
    setListener('#category-field', 'change', this.handleCategoryFilter.bind(this));
    setListener('#sort-field', 'change', this.handleSort.bind(this));
  }

  handleSearchFilter(event) {
    const search = event.target.value.trim();
    const searchLength = search.length;

    if (searchLength === 0 || searchLength > 2) {
      this.applyFilters({ search });
    }
  }

  handleCategoryFilter({ target }) {
    this.applyFilters({ category: target.value });
  }

  handleSort({ target }) {
    this.applyFilters({ sortCriteria: target.value });
  }

  async applyFilters({
    search = this.productsModel.filters.search,
    category = this.productsModel.filters.category,
    sortCriteria = this.productsModel.filters.sortCriteria,
  }) {
    this.productsModel.filters.search = search;
    this.productsModel.filters.category = category;
    this.productsModel.filters.sortCriteria = sortCriteria;

    const filters = this.productsModel.buildFilters();
    const products = await getProducts(filters);

    this.productsView.render(products);
  }
}


