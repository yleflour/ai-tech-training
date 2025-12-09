/**
 * A shopping cart implementation for demonstrating unit testing
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Discount {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minPurchase?: number;
}

export class ShoppingCart {
  private items: Map<string, CartItem> = new Map();
  private discount: Discount | null = null;

  /**
   * Add an item to the cart. If the item already exists, increase quantity.
   */
  addItem(item: Omit<CartItem, "quantity">, quantity: number = 1): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be positive");
    }
    if (item.price < 0) {
      throw new Error("Price cannot be negative");
    }

    const existing = this.items.get(item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.set(item.id, { ...item, quantity });
    }
  }

  /**
   * Remove an item from the cart entirely
   */
  removeItem(itemId: string): boolean {
    return this.items.delete(itemId);
  }

  /**
   * Update the quantity of an item. Removes item if quantity is 0.
   */
  updateQuantity(itemId: string, quantity: number): void {
    if (quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }

    const item = this.items.get(itemId);
    if (!item) {
      throw new Error(`Item ${itemId} not found in cart`);
    }

    if (quantity === 0) {
      this.items.delete(itemId);
    } else {
      item.quantity = quantity;
    }
  }

  /**
   * Get the subtotal before any discounts
   */
  getSubtotal(): number {
    let total = 0;
    for (const item of this.items.values()) {
      total += item.price * item.quantity;
    }
    return Math.round(total * 100) / 100;
  }

  /**
   * Apply a discount code to the cart
   */
  applyDiscount(discount: Discount): boolean {
    const subtotal = this.getSubtotal();
    if (discount.minPurchase && subtotal < discount.minPurchase) {
      return false;
    }
    this.discount = discount;
    return true;
  }

  /**
   * Remove any applied discount
   */
  clearDiscount(): void {
    this.discount = null;
  }

  /**
   * Calculate the discount amount
   */
  getDiscountAmount(): number {
    if (!this.discount) return 0;

    const subtotal = this.getSubtotal();
    if (this.discount.type === "percentage") {
      return Math.round(subtotal * (this.discount.value / 100) * 100) / 100;
    } else {
      return Math.min(this.discount.value, subtotal);
    }
  }

  /**
   * Get the final total after discounts
   */
  getTotal(): number {
    const subtotal = this.getSubtotal();
    const discountAmount = this.getDiscountAmount();
    return Math.round((subtotal - discountAmount) * 100) / 100;
  }

  /**
   * Get all items in the cart
   */
  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Get a specific item by ID
   */
  getItem(itemId: string): CartItem | undefined {
    return this.items.get(itemId);
  }

  /**
   * Get the total number of items in the cart
   */
  getItemCount(): number {
    let count = 0;
    for (const item of this.items.values()) {
      count += item.quantity;
    }
    return count;
  }

  /**
   * Check if the cart is empty
   */
  isEmpty(): boolean {
    return this.items.size === 0;
  }

  /**
   * Clear all items from the cart
   */
  clear(): void {
    this.items.clear();
    this.discount = null;
  }
}
