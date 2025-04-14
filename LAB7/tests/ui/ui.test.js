const puppeteer = require('puppeteer');

describe('UI тести для сторінки інвентаря', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    
    // Авторизуємось перед кожним тестом
    await page.goto('https://www.saucedemo.com/');
    await page.type('#user-name', 'standard_user');
    await page.type('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.inventory_list');
  });

  afterAll(async () => {
    await browser.close();
  });

  // Тест 1: Перевірка наявності елементів на сторінці
  test('На сторінці відображаються всі елементи інтерфейсу', async () => {
    const inventoryList = await page.$('.inventory_list');
    const inventoryItems = await page.$$('.inventory_item');
    const sortDropdown = await page.$('.product_sort_container');
    const shoppingCartLink = await page.$('.shopping_cart_link');
    
    expect(inventoryList).toBeTruthy();
    expect(inventoryItems.length).toBeGreaterThan(0);
    expect(sortDropdown).toBeTruthy();
    expect(shoppingCartLink).toBeTruthy();
  }, 10000);

  // Тест 2: Перевірка сортування за іменем
  test('Сортування товарів за іменем працює коректно', async () => {
    await page.select('.product_sort_container', 'az');
    
    const itemNames = await page.$$eval('.inventory_item_name', elements => 
      elements.map(el => el.textContent)
    );
    
    const sortedNames = [...itemNames].sort();
    expect(itemNames).toEqual(sortedNames);
  }, 10000);

  // Тест 3: Перевірка сортування за ціною
  test('Сортування товарів за ціною від низької до високої працює коректно', async () => {
    await page.select('.product_sort_container', 'lohi');
    
    const prices = await page.$$eval('.inventory_item_price', elements => 
      elements.map(el => parseFloat(el.textContent.replace('$', '')))
    );
    
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  }, 10000);

  // Тест 4: Перевірка додавання товару в кошик
  test('Товар успішно додається в кошик', async () => {
    // Очищаємо кошик перед тестом
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    const addButton = await page.$('#add-to-cart-sauce-labs-backpack');
    await addButton.click();
    
    const cartBadge = await page.$('.shopping_cart_badge');
    const cartCount = await page.evaluate(el => el.textContent, cartBadge);
    
    expect(cartCount).toBe('1');
  }, 10000);

  // Тест 5: Перевірка видалення товару з кошика
  test('Товар успішно видаляється з кошика', async () => {
    // Додаємо товар в кошик
    const addButton = await page.$('#add-to-cart-sauce-labs-bike-light');
    await addButton.click();
    
    // Перевіряємо, що в кошику 2 товари
    let cartBadge = await page.$('.shopping_cart_badge');
    let cartCount = await page.evaluate(el => el.textContent, cartBadge);
    expect(cartCount).toBe('2');
    
    // Видаляємо товар з кошика
    const removeButton = await page.$('#remove-sauce-labs-backpack');
    await removeButton.click();
    
    // Перевіряємо, що в кошику залишився 1 товар
    cartBadge = await page.$('.shopping_cart_badge');
    cartCount = await page.evaluate(el => el.textContent, cartBadge);
    expect(cartCount).toBe('1');
  }, 10000);
});