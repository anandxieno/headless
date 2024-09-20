export default async function grahpqlRequest(query) {
  const apiUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  const headers = {'Content-Type': 'application/json'};

  const response = await fetch(apiUrl, {
      headers,
      method: 'POST',
      body: JSON.stringify(query)
  })

  const Data = await response.json();
  return Data;
}