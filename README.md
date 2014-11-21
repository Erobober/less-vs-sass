# LESS vs Sass

Install and run
```sh
$ npm install
$ grunt
```

# Syntax

## Variables
Use of `@` vs `$`

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

## Nesting
Looks the same

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
```
p {
	a {
		color: red;
		&:hover {
			color: blue;
		}
	}
}

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



# Easier in Sass

The following situations can be solved using Sass or LESS but are easier considering Sass' features

## Conditionals

Sass has formal `if` and `if-else` statements. This can be particularly useful in mixins that have arguments. Suppose you wanted to make a mixin for CSS-only triangles (for speech bubbles or tool tips) as in this website: [cssarrowplease](http://cssarrowplease.com/). You might have a mixin that allows you to pass in the argument for which direction the arrow will go:

```css
.mixin(direction) {
	/* Basic stuff here */
	if (direction = top)    { /* Conditional stuff here */ }
	else if (direction = bottom) { /* Conditional stuff here */ }
	else if (direction = left)   { /* Conditional stuff here */ }
	else if (direction = right)  { /* Conditional stuff here */ }
}
```

The concept of a conditional can be accomplished with LESS in a less ideal way via guarded mixins:

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

This example comes from [Hugo Giraudel in this article](http://hugogiraudel.com/2012/11/13/less-to-sass/) who describes LESS' way as counter-intuitive and frustrating to use.