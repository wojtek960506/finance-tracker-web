import '@testing-library/jest-dom';


jest.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));

class ResizedObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock Radix-required browser APIs
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}

// Mock scrollIntoView (Radix Select uses this)
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

global.ResizeObserver = ResizedObserverMock;