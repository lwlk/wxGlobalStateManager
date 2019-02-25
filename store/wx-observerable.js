export default class Observerable {
  observers = []
  constructor(root, state) {
    this.root = root;
    this.state = state;
    this.keys = Object.keys(state);
  }
  state() {
    return this.state;
  }
  sync(pageConfig) {
    if (!pageConfig.data) {
      pageConfig.data = {};
    }
    const pageConfigData = pageConfig.data;
    const duplicateKeys = this.keys.filter((key) => pageConfigData[key] !== undefined);
    if (duplicateKeys.length > 0) {
      throw new Error('exist duplicate keys: ' + duplicateKeys.join(', '));
    }
    Object.assign(pageConfig.data, { 
      [this.root]: { ... this.state } 
    });
  }
  emit(state) {
    this.state = { ... this.state, ... state };
    this.observers.forEach((page) => this.mutation(this.root, state, page));
  }
  mutation(root, state, page) {
    Object.keys(state).forEach((key) => page.setData({ [`${root}.${key}`]: state[key] }));
  }
  subscribe(page) {
    if (this.observers.findIndex((e) => e === page) === -1) {
      this.observers.push(page);
      this.mutation(this.root, this.state, page);
    }
  }
  unsubscribe(page) {
    const index = this.observers.findIndex((e) => e === page);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
};