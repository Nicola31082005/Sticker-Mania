export async function submitOrder(orderData) {
  try {
    const response = await fetch("https://sticker-project.onrender.com/submit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit order.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error(error.message || "Failed to fetch.");
  }
}