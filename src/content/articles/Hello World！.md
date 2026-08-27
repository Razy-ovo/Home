# Markdown 测试文档

这是一份用于测试 Markdown 渲染效果的综合文档。

---

## 1. 文本样式

这是一段普通文本。**这是加粗文本**，*这是斜体文本*，***这是加粗斜体***，~~这是删除线~~，`这是行内代码`。

> 这是一段引用文本。
> 引用可以有多行。
>
> > 这是嵌套引用。

## 2. 列表

### 无序列表

- 第一项
- 第二项
  - 嵌套项 A
  - 嵌套项 B
    - 更深层嵌套
- 第三项

### 有序列表

1. 步骤一
2. 步骤二
3. 步骤三

### 任务列表

- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个待办事项

## 3. 代码块

### 行内代码

使用 `console.log("Hello")` 来调试。

### 代码块

```python
def fibonacci(n):
    """计算斐波那契数列"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# 输出前10项
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

```javascript
const greet = (name) => {
  return `你好，${name}！`;
};

console.log(greet("世界"));
```

## 4. 表格

| 语言 | 类型 | 年份 | 热门程度 |
|:-----|:----:|-----:|:--------:|
| Python | 动态 | 1991 | ★★★★★ |
| JavaScript | 动态 | 1995 | ★★★★★ |
| Rust | 静态 | 2010 | ★★★★☆ |
| Go | 静态 | 2009 | ★★★★☆ |
| Haskell | 静态 | 1990 | ★★★☆☆ |

## 5. 链接与图片

- 普通链接：[GitHub](https://github.com)
- 带标题的链接：[Google](https://google.com "点击访问 Google")
- 图片：![示例图片](https://via.placeholder.com/300x150/2a2a2a/e8c547?text=MiMo+Test)

## 6. 数学公式（LaTeX）

行内公式：质能方程 $E = mc^2$，欧拉公式 $e^{i\pi} + 1 = 0$。

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

## 7. 分隔线

以下都是分隔线：

---

***

___

## 8. 脚注

这里有一个脚注[^1]，这里还有另一个[^note]。

[^1]: 这是第一个脚注的内容。
[^note]: 这是第二个脚注，支持自定义标签。

## 9. 折叠内容

<details>
<summary>点击展开查看详情</summary>

这里是被折叠的内容。可以包含任何 Markdown 元素：

- 列表项
- **加粗文本**
- `代码`

```bash
echo "Hello from inside the details block!"
```

</details>

## 10. 高亮与特殊标记

==这是高亮文本==（部分 Markdown 扩展支持）。

H~2~O 是下标，X^2^ 是上标（部分扩展支持）。

---

> **提示**：这份文档覆盖了大多数常用 Markdown 语法，可以直接复制到任何支持 Markdown 的编辑器中测试渲染效果。