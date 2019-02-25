const noEffectFunction = () => {};

export const connect = (pageConfig, observerables) => {
  observerables.forEach((observerable) => observerable.sync(pageConfig));
  const onLoad = pageConfig.onLoad || noEffectFunction;
  pageConfig.onLoad = function (args) {
    observerables.forEach((observerable) => observerable.subscribe(this));
    onLoad(args);
  };
  Page(pageConfig);
};