import 'jest-preset-angular';
import './jestGlobalMocks';
// To fix ReferenceError: Worker is not defined
window.URL.createObjectURL = function () {
  return '';
};

if (typeof Worker === 'undefined') {
  global.Worker = class {
    addEventListener() {}

    removeEventListener() {}

    dispatchEvent() {
      return false;
    }

    onmessage() {}

    onmessageerror() {}

    onerror() {}

    postMessage() {}

    terminate() {}
  };
}
