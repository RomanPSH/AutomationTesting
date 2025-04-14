import { Selector } from "testcafe";

fixture("SauceDemo UI тести (оновлені)").page("https://www.saucedemo.com/");

test("Фільтрація товарів за ціною (від низької до високої)", async t => {
  await t
    .typeText("#user-name", "standard_user")
    .typeText("#password", "secret_sauce")
    .click("#login-button")
    .click(".product_sort_container")
    .click(Selector("option").withText("Price (low to high)"));

  const prices = await Selector(".inventory_item_price").nth(0).parent().parent().parent().child().innerText;
  console.log(prices)
});

test("Перевірка опису товару", async t => {
  await t
    .typeText("#user-name", "standard_user")
    .typeText("#password", "secret_sauce")
    .click("#login-button")
    .click(".inventory_item_name")
    .expect(Selector(".inventory_details_desc").exists)
    .ok();
});

test("Видалення товару з кошика", async t => {
  await t
    .typeText("#user-name", "standard_user")
    .typeText("#password", "secret_sauce")
    .click("#login-button")
    .click("#add-to-cart-sauce-labs-backpack")
    .click(".shopping_cart_link")
    .click("#remove-sauce-labs-backpack")
    .expect(Selector(".cart_item").exists)
    .notOk();
});

test("Відміна оформлення замовлення", async t => {
  await t
    .typeText("#user-name", "standard_user")
    .typeText("#password", "secret_sauce")
    .click("#login-button")
    .click(".inventory_item button")
    .click(".shopping_cart_link")
    .click("#checkout")
    .typeText("#first-name", "John")
    .typeText("#last-name", "Doe")
    .typeText("#postal-code", "12345")
    .click("#cancel")
    .expect(Selector(".cart_list").exists)
    .ok();
});

test("Перевірка зображення товару", async t => {
   await t
      .typeText("#user-name", "standard_user")
      .typeText("#password", "secret_sauce")
      .click("#login-button")
      .expect(Selector(".inventory_item_img img").hasAttribute("src"))
      .ok();
});