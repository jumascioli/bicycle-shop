export default class ProductsModel {
  filters = {
    search:'',
    category: 'all',
    sortCriteria: '',
  }

  filterBySearch() {
    if(this.filters.search === '') {
      return {};
    }

    return {
      'name_like': this.filters.search,
    };
  }

  filterByCategory() {
    if(this.filters.category === 'all') {
      return {};
    }

    return {
      category: this.filters.category,
    }
  }

  sortByCriteria() {
    if(this.filters.sortCriteria === 'select') {
      return {};
    }

    return {
      '_sort': 'price',
      '_order': this.filters.sortCriteria,
    }
  }

  buildFilters() {
    const filterBySearch = this.filterBySearch();
    const filterByCategory = this.filterByCategory();
    const sortByCriteria = this.sortByCriteria();

    return new URLSearchParams({
      ...filterBySearch,
      ...filterByCategory,
      ...sortByCriteria
    }).toString();
  }
}
