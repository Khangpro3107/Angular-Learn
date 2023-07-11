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