### glfe

✨ A simple but powerful dot-notation prop path util

### Install

with `npm` or `yarn` or any other package manager you prefer
```bash
yarn add glfe
// npm i glfe
```
### Usage

+ you can include `glfe` with 'script' tag derectly:
```html
<script src="path/to/glfe"></script>
<script>
    var glfe = window.glfe
    glfe.get(...)
    glfe.find(...)
    glfe.set(...)
</script>
```
+ when you project use some module bundler like webpack:
```js
import glfe from "glfe"
```
### example
```js
var obj = {
    a: {
        b: {
            c: [{
                d: [ {
                    e: 5
                }]
            }],
            f: 6
        }
    }
}
console.log(glfe.get(obj, "a.b.c[0].d[0].e"))
console.log(glfe.get(obj, "a.b.f"))
console.log(glfe.get(obj, "a[b]"))
console.log(glfe.get(obj, "not.exist.prop"))   // throw error
console.log(glfe.find(obj, "not.exist.prop"))  // undefined
// you can use "!" flag to tell `glfe` to make an array instead of an object
var seter = glfe.set(obj, "a[b][r!][2]", 66)
console.log(seter)
console.log(obj)
console.log(obj===seter) // true
```
### Api

#### glfe#get(target, propPath)

Get prop value with dot-notation from target object. It would throw error when the prop path is not exist, if you want to avoid it please use `find` instead of `get`
#### glfe#find(target, propPath)

Same as `get` except it would return undefined when the prop path is not exist, if you want to avoid it please use `get` instead of `find`

#### glfe#set(target, propPath, value)

set prop value with dot-notation paths

> `propPath`: dot-notation paths, such as "a.b", "a[b]", "a.b[0].c", but "a.b.[0].c" is not supported!
> `target` should be a plain object, array is not supported!
### Lisense

MIT