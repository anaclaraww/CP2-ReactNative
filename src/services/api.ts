export interface Quote {
  text: string;
  author: string;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
}

const FALLBACK_QUOTES: Quote[] = [
  { text: 'A jornada de mil milhas começa com um único passo.', author: 'Lao Tzu' },
  { text: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.', author: 'Robert Collier' },
  { text: 'Faça o que você pode, com o que você tem, onde você está.', author: 'Theodore Roosevelt' },
  { text: 'A única maneira de fazer um ótimo trabalho é amar o que você faz.', author: 'Steve Jobs' },
  { text: 'Não espere. A hora nunca será perfeita.', author: 'Napoleon Hill' },
];

export async function fetchMotivationalQuote(): Promise<Quote> {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error('API error');
    const data = (await response.json()) as { quote: string; author: string };
    return { text: data.quote, author: data.author };
  } catch {
    const random = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    return random;
  }
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    if (!response.ok) throw new Error('API error');
    const data = (await response.json()) as Array<{ slug: string; name: string }>;
    return data.slice(0, 8).map((c, i) => ({ id: i + 1, name: c.name, slug: c.slug }));
  } catch {
    return [];
  }
}
