const agent = {
  name: 'Analytics Demo',
  sourceId: 'counter',
  aggregations: {
    count: {
      reducer: (count, _item) => (typeof count === 'number' ? count + 1 : 1),
      startWith: 0,
    },
  },
  actions: {
    increment: async (aspen, _params) => {
      await aspen.appendToLog('counter');
    },
    count: async (aspen, _params) => {
      const count = await aspen.getAggregation('counter', 'count');
      let message = '';

      if (count > 10)
        message = "Ground control to Major Tom?...We've lost contact";
      else if (count > 8) message = 'Edge of the galaxy';
      else if (count > 6) message = 'In orbit';
      else if (count > 4) message = "Exiting Earth's atmosphere";
      else if (count > 2) message = 'In the clouds';
      else if (count > 0) message = 'We have liftoff';
      else message = 'Ready for launch';

      return {
        count,
        message,
      };
    },
  },
};

module.exports = agent;
