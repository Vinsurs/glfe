declare module "glfe" {
    /**
     * @param target plain object, array is not support
     * @param propPath dot-notation prop path string
     * @note it would throw error when the prop path is not exist, if you want to avoid it please use `find` instead of `get`
     * @docs https://github.com/Vinsurs/glfe
     * @example
     * ```js
     * import glfe from "glfe"
     * var obj = { a: { b: [ { c: 5 } ]}}
     * glfe.get(obj, "a.b")
     * glfe.get(obj, "a.b[0].c")
     * // glfe.get(obj, "a.b.[0].c") // not supported!!!
     * glfe.get(obj, "a[b][0][c]")
     * glfe.get(obj, "not.exist.prop") // throw error
     * ```
     */
    export function get(target: Record<string, any>, propPath: string): any
    /**
     * @param target plain object, array is not support
     * @param propPath dot-notation prop path string
     * @note Same as `get` except it would return undefined when the prop path is not exist, if you want to avoid it please use `get` instead of `find`
     * @docs https://github.com/Vinsurs/glfe
     * @example
     * ```js
     * import glfe from "glfe"
     * var obj = { a: { b: [ { c: 5 } ]}}
     * glfe.find(obj, "a.b")
     * glfe.find(obj, "a.b[0].c")
     * // glfe.find(obj, "a.b.[0].c") // not supported!!!
     * glfe.find(obj, "a[b][0][c]")
     * glfe.find(obj, "not.exist.prop") // undefined
     * ```
     */
    export function find(target: Record<string, any>, propPath: string): any
    /**
     * 
     * @param target plain object, array is not support
     * @param propPath dot-notation prop path string
     * @param value value to be set
     * @docs https://github.com/Vinsurs/glfe
     * @example
     * ```js
     * import glfe from "glfe"
     * var obj = { a: { b: [ { c: 5 } ]}}
     * glfe.set(obj, "a.b[0].c", 55)
     * // add new property if prop path is not exist
     * glfe.set(obj, "a.b.newProp", "newPropValue")
     * var res = glfe.set({ a: "a" }, "b.d[0]", 1) 
     * expect(res).toEqual({
     *  a: "a",
     *  b: {
     *    d: {
     *          "0": 1
     *       }
     *  }
     * })
     * // but you can use "!" flag to tell `glfe` to make an array instead of an object
     * res = glfe.set({ a: "a" }, "b.d![0]", 1)
     * expect(res).toEqual({
     *  a: "a",
     *  b: {
     *    d: [1]
     *  }
     * }) 
     * ```
     */
    export function set(target: Record<string, any>, propPath: string, value: any): any
}