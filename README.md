# LESS vs Sass

Install and run
```sh
$ npm install
$ grunt
```

# Examples

Examples from this document may come from a variety of third-party sources:

- [Hugo Giraudel: LESS to Sass](http://hugogiraudel.com/2012/11/13/less-to-sass/)
- [Aya Edamoto: LESS vs Sass](http://www.slideshare.net/awelcom/less-vs-sass-38038783)

# Features of Both

## Variables

```css
// LESS
@color: red;
div {
	color: @color;
}

// Sass
#color: red;
div {
	color: $color;
}
```
> Use of `@` vs `$`

## Nesting

```css
// LESS
p {
	a {
		color: red;
		&:hover {
			color: blue;
		}
	}
}

// Sass
p {
	a {
		color: red;
		&:hover {
			color: blue;
		}
	}
}
```
> Look the same in both languages

## Mixins

```css
// LESS
.bordered(@width) {
	border: @width solid black;
}

#menu a {
	.bordered(4px);
}

// Sass
@mixin bordered($width) {
	border: $width solid black;
}

#menu a {
	@include bordered(4px);
}
```
> It's a matter of preference. Perhaps one could say they like LESS mixins because it's less writing (without the word `mixin` and `include`) and it looks more like CSS. Perhaps one could say they like the use of `mixin` and `include` because it helps them more easily see mixins from the other CSS.

# Easier in Sass

The following situations can be solved using Sass or LESS but are easier considering Sass' features

## Conditionals

Sass has formal `if` and `if-else` statements. This can be particularly useful in mixins that have arguments. Suppose you wanted to make a mixin for CSS-only triangles (for speech bubbles or tool tips) as [cssarrowplease](http://cssarrowplease.com/) demonstrates. In this case, you might have a mixin that allows you to pass in the argument for which direction the arrow will go:

```css
.mixin(direction) {
	/* Basic stuff here */
	if (direction = top)    { /* Conditional stuff here */ }
	else if (direction = bottom) { /* Conditional stuff here */ }
	else if (direction = left)   { /* Conditional stuff here */ }
	else if (direction = right)  { /* Conditional stuff here */ }
}
```

The concept of a conditional can be accomplished with LESS in a less intuitive way via guarded mixins:

```css
.mixin(direction) {
	/*Basic stuff here */
}
.mixin(direction) when (direction = top) {
	/* Conditional stuff here */
}
.mixin(direction) when (direction = bottom) {
	/* Conditional stuff here */
}
.mixin(direction) when (direction = left) {
	/* Conditional stuff here */
}
.mixin(direction) when (direction = right) {
	/* Conditional stuff here */
}
```

This next example shows just how easy `if` statements can be in Sass. This mixin determines it's border radius based on the width of the column:

```css
@mixin column($width) {
	width: $width;
	border-radius: if($width > 100px, 15px, 10px);
}
```

# Sass only features

## @content in mixins

Sass supports the `@content` variable in mixins which gets used as follows:

```css
@mixin media {
	overflow: hidden;
	> div:first-child {
		float: left;
		@content
	}
}

.comment {
	@include media {
		width: 100px;
	}
}
```

While both LESS and Sass support passing in variable arguments into mixins, only Sass supports passing in full blocks of CSS properties/values. The block is turned into a variable called `@content`

Notice in this second example we are able to include the `respond` mixin (for media queries) and also pass in CSS properties:

```css
@mixin respond($min-width) {
	@media screen and (min-width: $min-width) {
		@content;
	}	
}

aside {
	color: red;
	@include respond(300px) {
		color: green;
	}
}
```

We can't do this with LESS. In this LESS example, the `color: green` is built into the mixin. This is much less flexible.

```css 
.respond(@min-width) {
	@media screen and (min-width: @min-width) {
		color: green;
	}	
}

aside {
	color: red;
	.respond(300px);
}
```

## Inheritance 

Sass makes use of `@extend` for inheritance which has similar behavior to a `@mixin` but with a very different output. Imagine we have a clearfix solution which we are going to incorporate in many places and we don't want to produce WET CSS:

```css
.clearfix {
	overflow: hidden;
}

.content { @extend .clearfix; }
.comment { @extend .clearfix; }
```

The previous Sass will produce very DRY CSS as follows:

```css
.clearfix, .content, .comment {
	overflow: hidden;
}
```

Note that if this were mixins (with LESS or Sass) we would have Dry LESS/Sass, but we would have had very WET CSS output:

```css
// Less
.clearfix {
	overflow: hidden;
}

.content { .clearfix; }
.comment { .clearfix; }
```

```css
// Output
.clearfix {
  overflow: hidden;
}
.content {
  overflow: hidden;
}
.comment {
  overflow: hidden;
}
```

## Maps

Sass maps are very similar to arrays in programming. This can be useful to group variables together:

```css
$theme: (
	primary: red,
	secondary: blue
)

div {
	background-color: map-get($theme, primary);
}
```

This is great for namespacing - so we don't have a huge list of variables that collide with each other. but it's also nice to pass maps as arguments into mixins:

```css
@mixin notice($normal, $error) {
	background-color: map-get($normal, 'background');
	color: map-get($normal, 'font');

	&.error {
		background-color: map-get($error, 'background');
		color: map-get($error, 'font');
	}
}

div.notice {
	@include notice(
		(background: #eee, font: #aaa),
		(background: salmon, font: red)
	)
}
```

# LESS only features

## Namespaces for Mixins

LESS has a concept called "Namespaces" which allows us to have two different mixins of the same name:

```css
#namespace1 {
	.mixin-one { color: red; }
}
#namespace2 {
	.mixin-one { color: blue; }
}

.some-class {
	#namespace1 > .mixin-one
}
```

Which would produce

```css
.some-class {
  color: red;
}
```