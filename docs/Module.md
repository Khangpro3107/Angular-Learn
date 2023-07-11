# Module
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';component';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
In Angular, the term **module** refers to a container for a block of code that serves a specific function inside an application. A module typically contains many components related to each other and other code files like service providers. In the Angular framework's architecture, modules exist at the highest level.
Every Angular application has at least one module called `AppModule` by default. This module is implemented inside the `app.module.ts` file and works as the entry point to the application.
A module is represented as a TypeScript class decorated by the `@NgModule` decorator (imported from `@angular/core`). An object containing the metadata for this module is passed as parameter to this decorator. That object contains a few important fields:
1. `declarations`
This is an array containing all classes of the components that this module comprises. In order to use a component inside a module, the component's TypeScript class must be declared inside this array.
2. `imports`
This array lists all external libraries and modules needed by this module.
3. `providers`
This array lists all other services needed in a module.
4. `bootstrap`
This array lists the components needed to load and get inserted into the main `index.html` file of the application.