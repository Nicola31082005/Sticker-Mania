const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function submitOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response) {
      throw new Error("No response received from server");
    }

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit order.");
      } catch (jsonError) {
        throw new Error(
          `Server error: ${response.status} ${
            response.statusText || "Unknown error"
          }`
        );
      }
    }

    // Check if response has content
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format from server");
    }

    // Safely parse JSON response
    try {
      const result = await response.json();
      return result;
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      throw new Error("Invalid JSON response from server");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
