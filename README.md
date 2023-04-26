# desc

### TypeError: CarBody is not a constructor

The error you are seeing is because of a circular dependency between the Car and CarBody classes.

Specifically, the Car class imports the CarBody class, while the CarBody class imports the Engine class, which in turn imports the CarBody class again. This creates a circular dependency between these classes, which can cause issues during the runtime.

To solve this issue, you need to break the circular dependency between these classes. One way to do this is by using Dependency Injection.

### solve

In this implementation, the Engine class accepts a carBody object in its constructor, while the CarBody class accepts an engine object in its constructor. The Car class accepts both carBody and engine objects in its constructor.

To create a new Car object, we can first create a new instance of the CarBody class and pass it an instance of the Engine class. We can then create a new instance of the Engine class and pass it the CarBody object. Finally, we can create a new instance of the Car class and pass it both the CarBody and Engine objects. This allows us to break the circular dependency between these classes and avoid the "not a constructor" error.
