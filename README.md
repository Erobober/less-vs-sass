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
> It's a matter of preference Perhaps one could say they like LESS mixins because it's less writing (without the word `mixin` and `include`) and it looks more like CSS. Perhaps one could say they like the use of `mixin` and `include` because it helps them more easily see what is a mixin.


# Easier in LESS



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

# Features only Sass has

## Inheritance 

Sass makes use of `@extend` for inheritance which has similar behavior to a `@mixin` but with a very different output. Imagine we have a clearfix solution which we are going to incorporate in many places:


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

Note that if this were mixins (with Less or Sass), we would have had modularity and Dry Less/Sass, but we would have had very WET CSS output:

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