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