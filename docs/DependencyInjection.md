# Dependency Injection
In Angular, DI is a concept that allows classes with Angular decorators (Components, Modules, ...) to configure the dependencies that they need. Two main roles are concerned in the DI system: Dependency provider and dependency consumer.
**Injector** provides a connection between the provider and the consumer. Angular creates a default global injector called **root injector**. We can create and use custom injectors if the application requires.
### Declare and providing a dependency
Suppose the class `HeroService` is required by other parts of the application. First, the decorator `@Injectable` is added to show that this class can be **injected** to other classes.
```
@Injectable()
class HeroService {}
```
In order to use the service provided by the class `HeroService`, we need to make it available to all other classes who need it. There are 3 ways that this process can be achieved, corresponding to 3 levels at which the classes in need reside: Component < Module < Application.
1. Component
We can supply an individual component with a dependency by declaring it in the field `providers` of the metadata object passed to the `@Component` decorator.
```
@Component({
  selector: 'hero-list',
  template: '...',
  providers: [HeroService]
})
class HeroListComponent {}
```
In the above example, the component `HeroListComponent` requires the class `HeroService`. Note that this declaration not only exposes the service provided by `HeroService` to all instances of this component, but also to other components, pipes and directives that are used by `HeroListComponent` (children of `HeroListComponent`).
Everytime an instance of the component is created, so is a new instance of the dependency.
2. Module
```
@NgModule({
  declarations: [HeroListComponent]
  providers: [HeroService]
})
class HeroListModule {}
```
We can make a dependency available to all components, pipes and directives declared within the same module by putting that dependency inside the field `providers` in the objecte passed into the `@NgModule` decorator. All components, pipes and directives inside that module will get access to the same, **singleton** instance of the dependency (rather than each instance for each class requiring the dependency).
3. Application
```
@Injectable({
  providedIn: 'root'
})
class HeroService {}
```
A dependency can be made available to every class that asks for it in the application by applying the value `root` to the field `providedIn` in the object passed into the `@Injectable` decorator. In this case, a **singleton** instance of the dependency is created and used by every class that requires it.
Note: Using `providedIn` is preferred over `providers` in `@NgModules` as it allows the application to remove unnecessary services when bundling the app (tree-shaking).
### Injecting a dependency
To use a dependency, we then need to **inject** it into the classes that require this dependency.
```
@Component({ … })
class HeroListComponent {
  constructor(private heroService: HeroService) {}
}
```
In the example above, the `HeroListComponent` requires service provided by `HeroService`. We inject this service into the class by passing a **service instance** named `heroService` as parameter to the class's constructor. Note that the access modifier `private` is used to prevent this service from being used by other unauthorized parts of the application.
How `HeroService` becomes available to `HeroListComponent`: When `HeroListComponent` is first referenced, the component's `constructor` needs to be called. Before this, the variable `heroService` needs to be initialized first. This is when the injector tries to look for this service (\*). If the required service cannot be found, Angular throws an error.
(\*) Suppose there are multiple providers (usually at multiple levels) who can provide the same dependency to a component. In this case, resolution rules will be used to determine which provider will get to supply the dependency over others. The resolution process occurs in 2 phases and whichever provider satisfies the component first will get to be the supplier:
1. `ElementInjector`: Angular looks for the appropriate provider in the `providers` field of the component itself. If none is found, Angular travels up the hierarchy and checks the component's parent components, level by level. If the provider is still not found, Angular moves to step 2.
2. `ModuleInjector`: Angular first looks for the provider in the module `providers` array in which the component belongs. If not found, Angular travels up the hierarchy **recursively** to find the appropriate provider. An error will be thrown if this process continues to fail.
### Resolution modifiers
These modifiers can be used to change the behavior of the injector when it comes to searching for the provider of a dependency. They can be combined (not always possible) and can be split into 3 types: **What to do if a provider cannot be found** (`@Optional`), **where to start looking** (`@SkipSelf`) and **where to stop looking** (`@Self` and `@Host`).
1. `@Optional`: The dependency, if the provider cannot be found, will be considered optional, which means no errors will be thrown.
2. `@Self`: Angular only looks for providers in the component or directive itself. No need to look anywhere else.
3. `@SkipSelf`: This is the opposite of #2: It will start the 2 phases normally but omit the providers of the component itself.
4. `@Host`: This provides a last stop to the searching process. The component will use the result of that last stop and will not travel up the hierarchy.
### Life cycle of an injected dependency
A dependency is initialized right before the constructor of the component that requires it is called, as the dependency is passed as a parameter to the constructor.
When it comes to the destruction of a dependency, the answer depends on which level the dependency is provided. Generally, the dependency stays alive as long as whatever requires it is still being used.
1. Component: The dependency instance will be destroyed when the component instance that asks for it is no longer used and the component's template is removed from the DOM. Note that this only applies to each instance and not all instances of a dependency.
2. NgModule: The dependency is singleton for all child parts of the concerned module. It will be destroyed when that entire module is unloaded.
3. Application: The dependency is singleton for every class that requires it. It will only be destroyed if the application is terminated.
