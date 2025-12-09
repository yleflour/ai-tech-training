import { test, expect, describe } from "bun:test";
import { ShoppingCart, type CartItem, type Discount } from "./shopping-cart.ts";

describe(ShoppingCart, () => {
  describe(ShoppingCart.prototype.addItem, () => {
    test("adds a new item to the cart", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);

      const expected: CartItem[] = [{ id: "1", name: "Apple", price: 1.5, quantity: 2 }];
      expect(cart.getItems()).toEqual(expected);
    });

    test("increases quantity when adding existing item", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 3);

      const expected: CartItem[] = [{ id: "1", name: "Apple", price: 1.5, quantity: 5 }];
      expect(cart.getItems()).toEqual(expected);
    });

    test("uses default quantity of 1", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 });

      expect(cart.getItem("1")?.quantity).toBe(1);
    });

    test("throws error for non-positive quantity", () => {
      const cart = new ShoppingCart();

      expect(() => cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 0)).toThrow(
        "Quantity must be positive"
      );
      expect(() => cart.addItem({ id: "1", name: "Apple", price: 1.5 }, -1)).toThrow(
        "Quantity must be positive"
      );
    });

    test("throws error for negative price", () => {
      const cart = new ShoppingCart();

      expect(() => cart.addItem({ id: "1", name: "Apple", price: -5 }, 1)).toThrow(
        "Price cannot be negative"
      );
    });
  });

  describe(ShoppingCart.prototype.removeItem, () => {
    test("removes an existing item and returns true", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);

      const result = cart.removeItem("1");

      expect(result).toBe(true);
      expect(cart.getItems()).toEqual([]);
    });

    test("returns false when removing non-existent item", () => {
      const cart = new ShoppingCart();

      const result = cart.removeItem("nonexistent");

      expect(result).toBe(false);
    });
  });

  describe(ShoppingCart.prototype.updateQuantity, () => {
    test("updates item quantity", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);

      cart.updateQuantity("1", 5);

      expect(cart.getItem("1")?.quantity).toBe(5);
    });

    test("removes item when quantity is set to 0", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);

      cart.updateQuantity("1", 0);

      expect(cart.getItem("1")).toBeUndefined();
    });

    test("throws error for negative quantity", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);

      expect(() => cart.updateQuantity("1", -1)).toThrow("Quantity cannot be negative");
    });

    test("throws error for non-existent item", () => {
      const cart = new ShoppingCart();

      expect(() => cart.updateQuantity("nonexistent", 5)).toThrow(
        "Item nonexistent not found in cart"
      );
    });
  });

  describe(ShoppingCart.prototype.getSubtotal, () => {
    test("returns 0 for empty cart", () => {
      const cart = new ShoppingCart();

      expect(cart.getSubtotal()).toBe(0);
    });

    test("calculates subtotal correctly", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);
      cart.addItem({ id: "2", name: "Banana", price: 0.75 }, 4);

      expect(cart.getSubtotal()).toBe(6);
    });

    test("rounds to 2 decimal places", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Item", price: 0.1 }, 3);

      expect(cart.getSubtotal()).toBe(0.3);
    });
  });

  describe(ShoppingCart.prototype.applyDiscount, () => {
    test("applies discount when minimum purchase is met", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 50 }, 1);

      const discount: Discount = {
        code: "SAVE10",
        type: "percentage",
        value: 10,
        minPurchase: 25,
      };

      const result = cart.applyDiscount(discount);

      expect(result).toBe(true);
    });

    test("rejects discount when minimum purchase is not met", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 10 }, 1);

      const discount: Discount = {
        code: "SAVE10",
        type: "percentage",
        value: 10,
        minPurchase: 25,
      };

      const result = cart.applyDiscount(discount);

      expect(result).toBe(false);
    });

    test("applies discount without minimum purchase requirement", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 10 }, 1);

      const discount: Discount = {
        code: "SAVE10",
        type: "percentage",
        value: 10,
      };

      const result = cart.applyDiscount(discount);

      expect(result).toBe(true);
    });
  });

  describe(ShoppingCart.prototype.clearDiscount, () => {
    test("clears applied discount", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 100 }, 1);
      cart.applyDiscount({ code: "SAVE10", type: "percentage", value: 10 });

      cart.clearDiscount();

      expect(cart.getDiscountAmount()).toBe(0);
    });
  });

  describe(ShoppingCart.prototype.getDiscountAmount, () => {
    test("returns 0 when no discount applied", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 100 }, 1);

      expect(cart.getDiscountAmount()).toBe(0);
    });

    test("calculates percentage discount correctly", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 100 }, 1);
      cart.applyDiscount({ code: "SAVE10", type: "percentage", value: 10 });

      expect(cart.getDiscountAmount()).toBe(10);
    });

    test("calculates fixed discount correctly", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 100 }, 1);
      cart.applyDiscount({ code: "SAVE15", type: "fixed", value: 15 });

      expect(cart.getDiscountAmount()).toBe(15);
    });

    test("caps fixed discount at subtotal", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 10 }, 1);
      cart.applyDiscount({ code: "SAVE50", type: "fixed", value: 50 });

      expect(cart.getDiscountAmount()).toBe(10);
    });
  });

  describe(ShoppingCart.prototype.getTotal, () => {
    test("returns subtotal when no discount", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 50 }, 2);

      expect(cart.getTotal()).toBe(100);
    });

    test("returns subtotal minus percentage discount", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 100 }, 1);
      cart.applyDiscount({ code: "SAVE10", type: "percentage", value: 10 });

      expect(cart.getTotal()).toBe(90);
    });

    test("returns subtotal minus fixed discount", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 100 }, 1);
      cart.applyDiscount({ code: "SAVE15", type: "fixed", value: 15 });

      expect(cart.getTotal()).toBe(85);
    });
  });

  describe(ShoppingCart.prototype.getItems, () => {
    test("returns empty array for empty cart", () => {
      const cart = new ShoppingCart();

      expect(cart.getItems()).toEqual([]);
    });

    test("returns all items in the cart", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);
      cart.addItem({ id: "2", name: "Banana", price: 0.75 }, 3);

      const expected: CartItem[] = [
        { id: "1", name: "Apple", price: 1.5, quantity: 2 },
        { id: "2", name: "Banana", price: 0.75, quantity: 3 },
      ];
      expect(cart.getItems()).toEqual(expected);
    });
  });

  describe(ShoppingCart.prototype.getItem, () => {
    test("returns item by ID", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);

      const expected: CartItem = { id: "1", name: "Apple", price: 1.5, quantity: 2 };
      expect(cart.getItem("1")).toEqual(expected);
    });

    test("returns undefined for non-existent item", () => {
      const cart = new ShoppingCart();

      expect(cart.getItem("nonexistent")).toBeUndefined();
    });
  });

  describe(ShoppingCart.prototype.getItemCount, () => {
    test("returns 0 for empty cart", () => {
      const cart = new ShoppingCart();

      expect(cart.getItemCount()).toBe(0);
    });

    test("returns total quantity of all items", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);
      cart.addItem({ id: "2", name: "Banana", price: 0.75 }, 3);

      expect(cart.getItemCount()).toBe(5);
    });
  });

  describe(ShoppingCart.prototype.isEmpty, () => {
    test("returns true for empty cart", () => {
      const cart = new ShoppingCart();

      expect(cart.isEmpty()).toBe(true);
    });

    test("returns false for non-empty cart", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 1);

      expect(cart.isEmpty()).toBe(false);
    });
  });

  describe(ShoppingCart.prototype.clear, () => {
    test("removes all items from the cart", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2);
      cart.addItem({ id: "2", name: "Banana", price: 0.75 }, 3);

      cart.clear();

      expect(cart.getItems()).toEqual([]);
      expect(cart.isEmpty()).toBe(true);
    });

    test("clears applied discount", () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: "1", name: "Apple", price: 100 }, 1);
      cart.applyDiscount({ code: "SAVE10", type: "percentage", value: 10 });

      cart.clear();

      expect(cart.getDiscountAmount()).toBe(0);
    });
  });
});
