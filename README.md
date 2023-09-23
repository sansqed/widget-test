# Embeddable widget prototype for Fitin
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

## What works
- Next JS executes the `next.config.js` to bundle the app. Thus, widgets should be placed in this file for it to be bundled.
- The widget compiler called in `next.config.js` uses the `widgets` folder in the root directory. Each widget are stored in their own folder.
- Widgets are bundled using Webpack and should be placed under the `webpack` property in `module.exports`.
- I found that placing the widgets under the `plugin` property of `webpack` works best while building widgets along with the main app. See `widgetCompiler.js`.
- Widgets are built using `customElements` which uses a custom tag. When calling the widgets on the third-party site, you can use
```JS
// place inside the return of the component
<Script strategy="beforeInteractive" async src="http://localhost:3001/_next/static/widgets/my-widget/index.js"/>
<div id='my-widget'></div>
<my-widget/>

// or

useEffect(() => {
    const importScript = document.createElement('script')
    importScript.src="http://localhost:3001/_next/static/widgets/my-widget/index.js",
    importScript.async=true
    document.body.appendChild(importScript)
    const widget = document.createElement('my-widget')
    document.body.appendChild(widget)
}, []);

// `my-widget` is the tag name in `tagname.js` of each widget.
```
- I have placed 3 test widgets, `hello`, `my-widget`, `non-customElements`
	- `hello` uses the code to display the components [here](https://github.com/LeMisterV/Next-widget)
	- `my-widget` uses [this code](https://github.com/seriousben/embeddable-react-widget/blob/master/src/outputs/embeddable-widget.js) and uses `customElements` to introduce the component to HTML.
	- `non-customElements` doesn't use `customElements`
## What doesn't work
- When importing `hello` in the third-party website, the error `Uncaught TypeError: __webpack_require__.ts is not a function` is thrown. I still don't know how to resolve this. Perhaps this is due to the `ensureDependencies` in `hello/index.js`.
- When using `my-widget`, it doesn't run, but there's also no error.
- `non-customElements` produces an error when called. You can try different ways of calling it.

## Further references
- https://nextjs.org/docs/pages/api-reference/next-config-js/webpack
- https://github.com/seriousben/embeddable-react-widget
- https://github.com/LeMisterV/Next-widget