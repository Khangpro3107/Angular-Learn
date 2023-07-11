# Component
### Components of a component
A component in Angular contains a few items:
1. An HTML template describing how the component should be displayed on a page.
2. A TypeScript class encompassing the logic and behaviors of the component (via the class's properties and methods).
3. A CSS selector providing a way to use this component inside other components' templates.
4. (Optional) Private CSS style(s) being applied to the component.
### How a component is implemented in Angular
Upon being created, a component is represented as a folder with the same name as the component's. That folder consists of 4 files (let's name that component `example`): `example.component.ts`, `example.component.html`, `example.component.css`, `example.component.spec.ts`.
1. `example.component.ts`
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {

}
```
This file contains a class with the name `ExampleComponent`. The `export` keyword exports this class to other parts of the application. 
It can also be seen that this class is decorated with the `@Component` decorator (imported from `@angular/core`) provided with an object containing metadata describing essential information about that component.
This object includes:
- A `selector` with the value of `app-example` allowing other components' templates to render the template of this component (as `<app-example></app-example>`).
- A `templateUrl` with the value of `./example.component.html` referencing a file containing the HTML describing how this component should be rendered on a page.
- An array `styleUrls` containing the list of CSS files that are responsible for styling the HTML of this component. Note that this `styleUrls` field is optional and the CSS rules in those CSS files are applied **only** to this component and not other components (even though they may have the same CSS selectors).
2. `example.component.html`
```
<p>example works!</p>
```
This file contains the HTML describing how the component should be rendered on the page.
3. `example.component.css`
This file is responsible for styling the HTML elements of the component. As stated above, the CSS rules in a component are scoped only to that current component.
4. `example.component.spec.ts`
```
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent]
    });
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```
This file contains specifications of how the testing process for this component should be done.
### Rendering a child component inside a parent component
Angular allows a component to use the template content of another (called child) component. This can be done using the child components `selector` property as an HTML tag inside the parent component's template. For example, a parent component can display the content of our `example` component by writing `<app-example></app-example>` inside its `template.html` file.
### Declaring a newly created component
Normally, the use of a newly created component must be registered by importing and declaring it inside the `declarations` array of the `@NgModule` decorator of the module managing the component. In the case of a new Angular application, the above module is represented inside the file `app.module.ts`.
If a component is created manually (that is, creating the files and writing the code by hand), this process must be done before using the new component. However, if the component is created by Angular CLI, its declaration is automatically added to `app.module.ts`.
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
# Life cycle
In Angular, a component has a life cycle that starts when it is loaded and rendered, continues with detecting changes and updating the view accordingly and ends when the component's template is removed from the DOM and the component itself is destroyed.
Angular supports life cycle hooks that can be used to interact with the component based on the timing of the life cycle events. The list below lists all available hooks in the order that they can be invoked.
1. `ngOnChanges()`
This hook is invoked everytime bound inputs change or a component with bound inputs is first loaded. This hook is called before `ngOnInit()` if the loaded component has bound inputs. Otherwise, it will not be called (leaving `ngOnInit()` to be the first hook to be called). Note that this hook is called more frequently than others, so careful consideration is needed when deciding what goes inside this hook, as costly operations will likely affect performance and user experience.
2. `ngOnInit()`
This hook is the second hook to be called (after `ngOnchanges()`) if the component has bound inputs, or else it is the first. This hook is called only once for a component. It is used to make all the initializations and declarations needed for the component.
3. `ngDoCheck()`
This hook is used to check for changes that Angular can't normally detect (custom change detection). It is called right after every invocation of `ngOnChanges()` and `ngOnInit()`.
4. `ngAfterContentInit()`
This hook runs once right after the first call of `ngDoCheck()`. This hook is used to respond to the event of all external content of that component being initialized.
5. `ngAfterContentChecked()`
This hook runs every time Angular finishes checking (for any changes) the content being projected to that component. It is called after the first `ngAfterContentInit()` and every subsequent call of `ngDoCheck()`.
6. `ngAfterViewInit()`
This hook runs once after the first `ngAfterContentChecked()`, which also means after the views for the component and all of its child components are loaded.
7. `ngAfterViewChecked()`
This hook responds after Angular finishes checking the view of the component and all its child views. It runs after the first run of `ngAfterViewInit()` and every subsequent call of `ngAfterContentChecked()`.
8. `ngOnDestroy()`
This hook is used to cleanup right before Angular destroys the instance of a component and remove its template from the DOM. The cleanup process often includes unsubscribing to observables and detaching event handlers.