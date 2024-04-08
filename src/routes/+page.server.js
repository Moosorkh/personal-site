import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  try {
    const url = 'https://zenquotes.io/api/random';
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Non-200 response status');
    }

    const json = await response.json();

    if (!json[0] || !json[0].a) {
      throw new Error('Quote API response is not in the expected format');
    }

    return {
        quote: json[0].q,
        author: json[0].a
    }
  } catch (e) {
    //console.error(e.message); // Consider logging the error for debugging
    throw error(500, 'Error with request');
  }
}
