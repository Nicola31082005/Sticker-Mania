const CART_KEY = "cartItems";

// Helper function to create thumbnail from full image URL
const createThumbnail = async (imageUrl, maxWidth = 100, maxHeight = 100) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Return a low-quality thumbnail
      resolve(canvas.toDataURL("image/jpeg", 0.3)); // Lower quality for thumbnails
    };
    img.onerror = () => {
      // If image loading fails, return a placeholder
      resolve("");
    };
    img.src = imageUrl;
  });
};

// Helper function to safely set localStorage with retry capability
const safeSetItem = async (key, value, retryCount = 3) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn("localStorage is full, attempting to free up space...");

    if (retryCount <= 0) {
      throw new Error("Cannot store data: Storage quota exceeded");
    }

    // Try to remove the oldest items in the cart to make space
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    if (cartItems.length > 1) {
      // Remove the oldest item (assuming the first one is oldest)
      cartItems.shift();

      // Try to save the reduced cart
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        // Now try to save the original value again
        return safeSetItem(key, value, retryCount - 1);
      } catch (innerError) {
        // If still failing, try with one fewer item
        return safeSetItem(key, value, retryCount - 1);
      }
    }

    // If we can't make space or there's only one item, clear everything
    localStorage.clear();
    return safeSetItem(key, value, retryCount - 1);
  }
};

export default {
  getAll() {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    if (!cartItems.length) return [];
    return cartItems;
  },
  async addItem(data) {
    try {
      const cartItems = this.getAll();

      // Create thumbnail version of the image to save space
      const thumbnailUrl = await createThumbnail(data.previewUrl);

      // Store the original image URL in a session variable or temporary storage
      // We'll use a hidden field to store the original URL
      const itemWithThumbnail = {
        ...data,
        originalImageUrl: data.previewUrl, // Keep for reference
        previewUrl: thumbnailUrl, // Use thumbnail in localStorage
      };

      cartItems.push(itemWithThumbnail);

      // Use safe setter with retry logic
      const success = await safeSetItem(CART_KEY, JSON.stringify(cartItems));
      if (!success) {
        throw new Error(
          "Failed to add item to cart due to storage limitations"
        );
      }

      return cartItems;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  },
  async removeItem(id) {
    try {
      const cartItems = this.getAll();
      const updatedCart = cartItems.filter((cartItem) => cartItem._id !== id);
      await safeSetItem(CART_KEY, JSON.stringify(updatedCart));
      return updatedCart;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  },
  getCartTotalPrice() {
    const cartItems = this.getAll();
    return cartItems.reduce((total, item) => total + item.price, 0);
  },
  clearCart() {
    try {
      localStorage.removeItem(CART_KEY);
    } catch (error) {
      console.error("Error clearing cart:", error);
      // If removal fails, try clearing everything
      localStorage.clear();
    }
  },
};
