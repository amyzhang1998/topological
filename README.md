# topological

## svg 圆的 CRUD

> 全局对象 TP,包含方法：

1. create()
2. read()
3. update()
4. delete()

### 增加

    TP.create()

可传参数：
TP.create(cx,cy,r,fill)

[注]：cx,cy,r 要求是大于 0 小于 500 的数字类型，fillColor 要求是合法的颜色表达式

### 删除

    TP.delete(id)

### 修改

    TP.update()

可传参数：
TP.update(id,{cx:29,cy:38,r:20,fill:'red'})

[注]：cx,cy,r 要求是大于 0 小于 500 的数字类型，fillColor 要求是合法的颜色表达式

### 查询

    TP.read() or TP.read(id)
