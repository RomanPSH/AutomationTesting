const puppeteer = require("puppeteer");

describe("SauceDemo UI тести", () => {
  let browser;
  let context;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    context = await browser.createIncognitoBrowserContext();
    page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
  });

  afterAll(async () => {
    await context.close();
    await browser.close();
  });

  test("Користувач може успішно авторизуватися та додати товар у кошик", async () => {
    const title = await page.title();
    expect(title).toBe("Swag Labs");

    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector(".inventory_item");
    const currentUrl = page.url();
    expect(currentUrl).toContain("/inventory.html");

    await page.click("#add-to-cart-sauce-labs-backpack");

    const cartBadge = await page.$(".shopping_cart_badge");
    const cartCount = await page.evaluate(el => el.textContent, cartBadge);
    expect(cartCount).toBe("1");

    await page.click(".shopping_cart_link");

    await page.waitForSelector(".cart_item");
    const itemName = await page.$eval(".inventory_item_name", el => el.textContent);
    expect(itemName).toContain("Sauce Labs Backpack");
  }, 15000);

  test("Користувач може відсортувати товари за ціною від високої до низької", async () => {
    await page.goto("https://www.saucedemo.com/inventory.html");
    await page.select(".product_sort_container", "hilo");

    const prices = await page.$$eval(".inventory_item_price", elements => 
      elements.map(el => parseFloat(el.textContent.replace("$", "")))
    );

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  }, 10000);

  test("Користувач може пройти повний процес покупки товару", async () => {
    await page.goto("https://www.saucedemo.com/inventory.html");

    // Очищення кошика перед початком тесту
    await page.click(".shopping_cart_link");
    const removeButtons = await page.$$(".cart_button");
    for (const button of removeButtons) {
      await button.click();
    }
    await page.goto("https://www.saucedemo.com/inventory.html");

    await page.click("#add-to-cart-sauce-labs-fleece-jacket");
    await page.click(".shopping_cart_link");

    await page.waitForSelector(".cart_item");
    
    await page.click("#checkout");

    await page.type("#first-name", "Тест1");
    await page.type("#last-name", "Тест2");
    await page.type("#postal-code", "12345");
    await page.click("#continue");

    await page.waitForSelector(".checkout_summary_container");
    const summaryItemNames = await page.$$eval(".inventory_item_name", elements => 
      elements.map(el => el.textContent)
    );
    expect(summaryItemNames).toContain("Sauce Labs Fleece Jacket");

    await page.click("#finish");

    await page.waitForSelector(".complete-header");
    const confirmationMessage = await page.$eval(".complete-header", el => el.textContent);
    expect(confirmationMessage).toContain("Thank you for your order");
  }, 20000);
});