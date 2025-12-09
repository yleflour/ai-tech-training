import { describe, it, expect, beforeEach } from "vitest";
import {
  ShoppingCart,
  type CartItem,
  type Discount,
} from "./src/shopping-cart";

describe("ShoppingCart", () => {
  let cart: ShoppingCart;
  const apple: Omit<CartItem, "quantity"> = {
    id: "a1",
    name: "Apple",
    price: 1.25,
  };
  const banana: Omit<CartItem, "quantity"> = {
    id: "b1",
    name: "Banana",
    price: 0.99,
  };

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  it("adds items and increments quantity when same item added again", () => {
    cart.addItem(apple, 2);
    cart.addItem(apple, 3);
    const item = cart.getItem(apple.id);
    expect(item?.quantity).toBe(5);
    expect(cart.getItemCount()).toBe(5);
  });

  it("throws when adding with non-positive quantity or negative price", () => {
    expect(() => cart.addItem(apple, 0)).toThrow("Quantity must be positive");
    expect(() => cart.addItem({ ...apple, price: -1 }, 1)).toThrow(
      "Price cannot be negative",
    );
  });

  it("updates quantity, removes when set to zero, and errors on invalid input", () => {
    cart.addItem(banana, 2);
    cart.updateQuantity(banana.id, 5);
    expect(cart.getItem(banana.id)?.quantity).toBe(5);

    cart.updateQuantity(banana.id, 0);
    expect(cart.getItem(banana.id)).toBeUndefined();

    expect(() => cart.updateQuantity("missing", 1)).toThrow(
      "Item missing not found in cart",
    );
    expect(() => cart.updateQuantity(banana.id, -1)).toThrow(
      "Quantity cannot be negative",
    );
  });

  it("removes items and reports removal status", () => {
    cart.addItem(apple, 1);
    expect(cart.removeItem(apple.id)).toBe(true);
    expect(cart.removeItem(apple.id)).toBe(false);
    expect(cart.isEmpty()).toBe(true);
  });

  it("computes subtotal with rounding", () => {
    cart.addItem(apple, 1); // 1.25
    cart.addItem(banana, 3); // 2.97
    expect(cart.getSubtotal()).toBe(4.22);
  });

  it("applies percentage discounts when eligible", () => {
    cart.addItem(apple, 4); // subtotal 5.00
    const discount: Discount = {
      code: "P10",
      type: "percentage",
      value: 10,
      minPurchase: 5,
    };
    expect(cart.applyDiscount(discount)).toBe(true);
    expect(cart.getDiscountAmount()).toBe(0.5);
    expect(cart.getTotal()).toBe(4.5);
  });

  it("rejects discounts when subtotal is below minPurchase", () => {
    cart.addItem(apple, 1); // 1.25
    const discount: Discount = {
      code: "P10",
      type: "percentage",
      value: 10,
      minPurchase: 10,
    };
    expect(cart.applyDiscount(discount)).toBe(false);
    expect(cart.getDiscountAmount()).toBe(0);
    expect(cart.getTotal()).toBe(1.25);
  });

  it("applies fixed discounts capped by subtotal", () => {
    cart.addItem(apple, 2); // 2.50
    const discount: Discount = { code: "F5", type: "fixed", value: 5 };
    cart.applyDiscount(discount);
    expect(cart.getDiscountAmount()).toBe(2.5);
    expect(cart.getTotal()).toBe(0);
  });

  it("clears discount and items", () => {
    cart.addItem(apple, 1);
    cart.applyDiscount({ code: "P5", type: "percentage", value: 5 });
    cart.clear();
    expect(cart.isEmpty()).toBe(true);
    expect(cart.getDiscountAmount()).toBe(0);
  });

  it("returns all items", () => {
    cart.addItem(apple, 1);
    cart.addItem(banana, 2);
    const items = cart.getItems();
    expect(items).toHaveLength(2);
    expect(items.find((i) => i.id === apple.id)?.quantity).toBe(1);
    expect(items.find((i) => i.id === banana.id)?.quantity).toBe(2);
  });
});
