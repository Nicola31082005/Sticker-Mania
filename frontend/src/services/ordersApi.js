const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get from env

export async function submitOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    // Check if response exists and is valid
    if (!response) {
      throw new Error("No response received from server");
    }

    // Handle different status codes
    if (!response.ok) {
      // Try to parse error response, but handle case where it's not valid JSON
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit order.");
      } catch (jsonError) {
        // If parsing fails, use the status text
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
