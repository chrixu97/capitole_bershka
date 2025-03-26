export interface Category {
  name: string;
  subcategories: Category[];
}

export async function fetchCategories(): Promise<Category[]> {
  const url = useRuntimeConfig().public.categoriesApiUrl;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dummy: 'test' }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching categories: ${response.statusText}`);
  }

  const data = await response.json();
  return data.categories as Category[];
}

export function getCategoryPath(categories: Category[], target: string, path: string[] = []): string | null {
  target = target.toLowerCase();

  for (const category of categories) {
    const currentPath = [...path, category.name];

    if (category.name === target) return '/' + currentPath.join('/');

    if (category.subcategories.length > 0) {
      const result = getCategoryPath(category.subcategories, target, currentPath);

      if (result) return result;
    }
  }

  return null;
}