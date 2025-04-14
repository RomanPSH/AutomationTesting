import puppeteer from "puppeteer";

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

  test("Успішний вхід у систему", async () => {
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector(".inventory_list");
    const url = page.url();
    expect(url).toContain("inventory.html");
  });

  test("Помилка входу при неправильних даних", async () => {
    await page.goto("https://www.saucedemo.com/");
    await page.type("#user-name", "wrong_user");
    await page.type("#password", "wrong_password");
    await page.click("#login-button");

    const error = await page.$(".error-message-container");
    expect(error).not.toBeNull();
  });

  test("Додавання товару в кошик", async () => {
    await page.goto("https://www.saucedemo.com/");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector("#add-to-cart-sauce-labs-backpack");
    await page.click("#add-to-cart-sauce-labs-backpack");
    await page.click(".shopping_cart_link");

    const cartItem = await page.$(".cart_item");
    expect(cartItem).not.toBeNull();
  });

  test("Вихід з облікового запису", async () => {
    await page.waitForSelector("#react-burger-menu-btn");
    await page.click("#react-burger-menu-btn");
    await page.waitForTimeout(1000);
    await page.waitForSelector("#logout_sidebar_link");
    await page.click("#logout_sidebar_link");

    await page.waitForSelector("#login-button");
    expect(await page.$("#login-button")).not.toBeNull();
  });

  test("Оформлення замовлення", async () => {
    await page.goto("https://www.saucedemo.com/");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector(".inventory_item button");
    await page.click(".inventory_item button");
    await page.click(".shopping_cart_link");
    await page.click("#checkout");

    await page.type("#first-name", "John");
    await page.type("#last-name", "Doe");
    await page.type("#postal-code", "12345");
    await page.click("#continue");
    await page.click("#finish");

    const confirmation = await page.$(".complete-header");
    expect(confirmation).not.toBeNull();
  });
});