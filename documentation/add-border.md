## Add Border Mixin

The add border mixin is one mixin, 'add-border'

Mixin signature:
```
+add-border($border-position, $border-size, $border-pattern, $border-color)
```

#### Parameters

- $border-position (optional): what side you want this to appear on
	* `all` (default), `top`, `right`, `bottom`, `left`
- $border-size (optional): stroke width of border
	* `1px` (default), `2px`, etc
- $border-pattern (optional): style of stroke
	* `solid` (default), `dotted`, `striped`, etc
- $border-color (optional): color of stroke
	* `$default-border` (default)

### Example Use of the Add Border Mixin

```html
<div class="icr-main-box">
	I am a box
</div>
```

```sass
// use all of the defaults
.icr-main-box
	+add-border

// apply only to the top of the box
.icr-main-box
	+add-border(top)

//use custom styling
.icr-main-box
	+add-border(left, 5px, solid, color(active-border))
```