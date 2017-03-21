# learn nodejs 

### 顺序：index=>server=>router=>handle
#### index中要处理路径，这样路由模块只需要一个判断函数（判断路径是否对应着一个函数），就很精简；server中除了启动HTTP模块，还要吸收数据，最后一起给handle；handle就比较简单，做好功能性的函数就行了
