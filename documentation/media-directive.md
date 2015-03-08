## Media Element Directive

The media element mixin comprises of two mixins, `create-media` and `get-media`

### Create Media Mixin
`create-media` should be used to define the behavior for a group of media element components.

Mixin signature:
```
+create-media($media-group-name, $settings-map)
	@content
```
#### Parameters

- $media-group-name: name of the media group
- $settings-map (optional): map of the settings for this media group


#### Settings Map Properties
The settings map parameter is optional, and takes four **optional** parameters

- $content-alignment: vertical position of the text in the media element
  * `top`,` middle` (default), `bottom`
- $mode: the behavior of the media element, which depends on the `$breakpoint` specified
  * `standard` (default): image aligned to the right or left (depending on `$arrangement`), offset text
  * `stacked`: image and text are stacked (image on top if `$arrangement` is `before`, on bottom of `$arrangement` is `after`)
  * `compress`: above the breakpoint, it will be `stacked`, at or below it will be `standard`
  * `decompress`: opposite of `compress`
- $arrangement: the position of the image
  * `before` (default): image to the left if the `$mode` is standard, image on top if the `$mode` is `stacked`
  * `after`: opposite positioning of `before`
- $breakpoint: the size that will convert the media element from `stacked` to `standard` or vice versa, depending on if the mode is `compress` or `decompress`
  * not needed if the `$mode` is `standard` or `stacked`

#### Create Media @content
The content defined within a `+create-media` can be any properties that you want the elements using the media group to have.

### Get Media Mixin
`get-media` should be used to apply the settings of a media group, and to define an image (and the behaviour for an image) for the media's graphic.

Mixin signature:
```
+get-media($media-group-name, $graphic-selector, $state-property-map)
```

#### Parameters

- $media-group-name: the name of the media group
  * e.g. `icr-main-info-glyphs`
- $icon-selector: a css selector that contains the properties of the graphic for the media element
  * e.g. `'.svg-ico-robot'`
- $state-property-map: a map that correlates different media graphics to the media element
  * e.g. `('.icr-active': active)`

##### State Property Map Example
You may want to change the media graphic, depending on a class (or state) of the media element. For example, if the media element has the class `icr-active` added to it, then you may want to change the class of the graphic for media element from `.svg-ico-robot` to `.svg-ico-robot-active`.

You would achieve this with: `('.icr-active': active)`. The value of the properties is appended to the original name of the graphic's selector (`active` -> `.svg-ico-robot-active`).

You can define as many selectors and corresponding names as you like in the map `('.icr-active': active, ':hover': hovering, ':active': active)`

### Example Use of the Media Directive

```html
<!-- use with an icon -->
<div class="icr-main-info-glyphs">
    <div class="media-content">
         <h3>Media Content Header</h3>
        <p>Media Content Body</p>
    </div>
</div>

<!-- use with an image -->
<figure class="icr-main-info-displays">
  <div class="media-graphic">
    <img src="http://media.spiralknights.com/wiki-images/3/37/Monster-Gun_Puppy.png">
  </div>
  <figcaption class="media-content">
        <h3>Media Content Header</h3>
        <p>Media Content Body</p>
  </figcaption>
</figure>
```

```sass
$mobile-breakpoint: 640px
$desktop-breakpoint: 1200px

// register a new reuseable media component
+create-media(icr-main-info-glyphs, (middle, compress, before, $desktop-breakpoint))
  background: blue
  .media-content
    padding-left: 20px
  
+create-media(icr-main-info-displays, (top, stacked))
  background: green
  color: red

// actual use
.icr-portal-user-data
  +get-media(icr-main-info-glyphs, '.svg-ico-robot', ('.active': active))

.icr-main-flow-glyphs
  +get-media(icr-main-info-displays)
```