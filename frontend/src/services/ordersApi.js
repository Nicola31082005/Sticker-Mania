export async function submitOrder(orderData) {
// Submit order to the server
const response = await fetch("http://localhost:5000/submit-order", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(orderData),
});

// Handle response
    const result = await response.json();

    if (!response.ok) {
    throw new Error(await result.message);
    }
}