# 代码编写说明

在本项目开发过程中，因为涉及到许多较为复杂的语言问题，特别是`如何在运行时保留类型信息`，以及`如何进行配置对象的序列化和反序列化`方面，采取了很多折中和约定的方式。

为了保证日后的编写过程中，这些`约`(神)`定`(坑)能够得到一以贯之的继承，随手做一些关键点的记录。

下面是索引:

- [设计器中的组件、运行时的组件](./component-in-editor-and-runtime.md)
- [组件的属性(Attribute)如何编写](./property-in-class.md)
- [组件的事件(Event)如何编写](./lifecycle-in-class.md)
- [组件的行为(Action)如何编写](./action-in-class.md)
- [编写一个新自定义组件，需要怎么做](./custom-new-component.md)
- [可视化编辑器如何设计、实现,如何保存和加载配置](./editor.md)
- [如何实现一个平台的引擎](./engine.md)
