import '@testing-library/jest-dom';

class ResizedObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizedObserverMock;