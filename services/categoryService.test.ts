import { getCategoryPath, type Category } from './categoryService';

describe('categoryService', () => {
  describe('getCategoryPath', () => {
    const mockCategories: Category[] = [
      {
        name: 'category1',
        subcategories: [
          {
            name: 'category2',
            subcategories: [],
          },
          {
            name: 'category3',
            subcategories: [
              {
                name: 'category4',
                subcategories: [],
              },
            ],
          },
        ],
      },
      {
        name: 'category5',
        subcategories: [],
      },
    ];

    it('should return the correct path for a category', () => {
      const path = getCategoryPath(mockCategories, 'category4');
      expect(path).toBe('/category1/category3/category4');
    });

    it('should return null if the category is not found', () => {
      const path = getCategoryPath(mockCategories, 'nonexistent');
      expect(path).toBeNull();
    });

    it('should return the correct path for a top-level category', () => {
      const path = getCategoryPath(mockCategories, 'category5');
      expect(path).toBe('/category5');
    });
  });
});