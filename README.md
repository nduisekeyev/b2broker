# B2broker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## About the project

Here's an overview of the project:

1. As Angular 15 is not the latest version, I decided to use Angular 17 for this project.

2. The DataService is implemented using the Observer Design pattern, and the ConcreteDataFactory employs the Factory Method design pattern.

3. For unit testing, I employed Jasmine and Karma.

4. The UI can be dynamically updated by utilizing the "Change" button, allowing for adjustments to the time interval in milliseconds, array size, and additional array IDs.

Here's an overview of the files:

**app.worker.ts:**

The web worker script looks correct. It listens for messages, processes the data using the processData function, and then posts the processed data back to the main thread.

**data.factory.ts**
This factory creates complex objects to be delegated to subclasses, providing a way to create instances of a class with a common interface but allowing the specific implementation details to vary with the Factory Method design.

**web-worker.service.ts:**

This service sets up a Subject to emit data received from the web worker.
The startPseudoSocket method posts a message to the web worker.

**data.service.ts:**

The DataService has a dependency on the WebWorkerService.
In the startPseudoSocket method, it generates random data, updates the dataSubject with the new data, and then passes the data to the WebWorkerService using startPseudoSocket.

**app.component.ts:**

The AppComponent is the main component.
It initializes the data service, subscribes to updates, and starts the pseudo socket.
In the case where web workers are supported, it creates a new worker and sends an initialization message.

Here's a GitHub link: https://github.com/nduisekeyev/b2broker

Here's a Deployment https://b2broker.netlify.app

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
