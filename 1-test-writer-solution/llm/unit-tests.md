# Unit Testing

## Base template

<template>
import { test, expect, describe } from "bun:test";
import { MyClass } from "./my-class.ts";

describe(MyClass, () => {
  describe(MyClass.prototype.method, () => {
    test("does something", () => {
      const input = {/*...*/}
      const expected = {/*...*/}
      const instance = new MyClass();
      cart.method(input);
      expect(cart.toObject()).toEqual(expected);
    })
  })
})
</template>

## Rules

<rule>
When dealing with object or array values, instead of using multiple `expect().toBe()`, use a single `expect().toEqual()`
</rule>

<rule>
Use `expected = expect.arrayContaining([...])` or `expected = expect.objectContaining({...}))` to match against subsets of the output value
<example>
  const method = (amount: number) => ({amount, timestamp: DateTime.now()});
  
  const input = 15;
  const expected = expect.objectContaining({ amount: 15 });
  const output = method(input);
  expect(output).toEqual(expected);
</example>
</rule>
