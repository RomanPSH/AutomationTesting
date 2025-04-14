import puppeteer from "puppeteer";

describe("SauceDemo UI тести (оновлені)", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto("https://www.saucedemo.com/");
    await page.waitForSelector("#user-name"); // Очікування завантаження сторінки
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Фільтрація товарів за ціною (від низької до високої)", async () => {
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector(".product_sort_container");
    await page.select(".product_sort_container", "lohi");

    const prices = await page.$$eval(".inventory_item_price", elements =>
      elements.map(el => parseFloat(el.textContent.replace("$", "")))
    );

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test("Перевірка опису товару", async () => {
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector(".inventory_item_name");
    await page.click(".inventory_item_name");

    await page.waitForSelector(".inventory_details_desc");
    const description = await page.$eval(".inventory_details_desc", el => el.textContent);
    expect(description).toBeTruthy();
  });

  test("Видалення товару з кошика", async () => {
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector("#add-to-cart-sauce-labs-backpack");
    await page.click("#add-to-cart-sauce-labs-backpack");
    await page.click(".shopping_cart_link");

    await page.waitForSelector("#remove-sauce-labs-backpack");
    await page.click("#remove-sauce-labs-backpack");

    const cartItem = await page.$(".cart_item");
    expect(cartItem).toBeNull();
  });
});