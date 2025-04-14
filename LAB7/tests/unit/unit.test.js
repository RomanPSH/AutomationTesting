const formatPrice = (priceString) => {
    if (!priceString || typeof priceString !== 'string') return 0;
    return parseFloat(priceString.replace('$', ''));
  };
  
  const calculateTotal = (prices) => {
    if (!Array.isArray(prices)) return 0;
    return prices.reduce((total, price) => total + price, 0);
  };
  
  const calculateTax = (subtotal, taxRate = 0.08) => {
    return +(subtotal * taxRate).toFixed(2);
  };
  
  const isValidUsername = (username) => {
    return /^[a-zA-Z0-9_]{3,15}$/.test(username);
  };
  
  const isValidPassword = (password) => {
    return password && password.length >= 6 ? true : false;
  };
  
  describe('Unit тести', () => {
    test('formatPrice конвертує рядок ціни у число', () => {
      expect(formatPrice('$9.99')).toBe(9.99);
      expect(formatPrice('$15.50')).toBe(15.5);
      expect(formatPrice('$0')).toBe(0);
      expect(formatPrice(null)).toBe(0);
    });
  

    test('calculateTotal обчислює загальну суму позицій', () => {
      expect(calculateTotal([10, 20, 30])).toBe(60);
      expect(calculateTotal([9.99, 15.50])).toBeCloseTo(25.49, 2);
      expect(calculateTotal([])).toBe(0);
      expect(calculateTotal(null)).toBe(0);
    });
  

    test('calculateTax обчислює правильний податок', () => {
      expect(calculateTax(100)).toBe(8);
      expect(calculateTax(25.5)).toBe(2.04);
      expect(calculateTax(100, 0.1)).toBe(10);
    });
  

    test('isValidUsername перевіряє валідність імені користувача', () => {
      expect(isValidUsername('standard_user')).toBe(true);
      expect(isValidUsername('admin123')).toBe(true);
      expect(isValidUsername('a')).toBe(false);
      expect(isValidUsername('')).toBe(false);
      expect(isValidUsername('very_long_username_not_valid')).toBe(false);
    });
  

    test('isValidPassword перевіряє валідність пароля', () => {
      expect(isValidPassword('secret_sauce')).toBe(true);
      expect(isValidPassword('123456')).toBe(true);
      expect(isValidPassword('12345')).toBe(false);
      expect(isValidPassword('')).toBe(false);
      expect(isValidPassword(null)).toBe(false);
    });
  });