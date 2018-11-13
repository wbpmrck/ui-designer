# 页面场景生命周期

对于每个Page,可以考虑定义一些生命周期，用于实现对页面流程的一些精细化控制。
> 在具体软件平台的实现引擎中，对于这些周期的实现方式可能不尽相同，但是整体必须遵循本文所描述的规范。即使遇到一些生命周期无法确定知悉的情况，也应该尽量用可贴近概念的机制去模拟。实在无法实现的生命周期，应该在具体平台引擎中指出

## LifeCycle定义

> 参考了w3c的 Page Lifecycle API

### Active

### Passive

### Hidden

### Terminated

### Frozen

### Discarded

## 补充

### Direction Change

当设备方向变化的时候，需要通知到page
