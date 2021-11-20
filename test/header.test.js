
const mongoose = require("mongoose");
const Page = require("./helpers/page");

let browser, page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

// afterAll(()=>{

//      mongoose.disconnect()
// })

test("Correct Header name ", async () => {
  const text = await page.getContentOf('a.brand-logo');
  expect(text).toEqual("Blogster");
});

test("clicking login to start oauth flow", async () => {
  await page.click(".right a");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in show logout button", async () => {
  try {
    // const user = await userFactory();
    // const { session, sig } = sessionFactory(user);

    // await page.setCookie({ name: "session", value: session });
    // await page.setCookie({ name: "session.sig", value: sig });
    // await page.goto("http://localhost:3000");
    // //since waitfor is depricated
    // await page.waitForSelector('a[href="http://localhost:5000/auth/logout"]');
    await page.login()
    const text = await page.$eval(
      'a[href="http://localhost:5000/auth/logout"]',
      (el) => el.innerHTML
    );

    expect(text).toEqual("Logout");
  } catch (err) {
    console.log(err.message);
  }
});

///unit testing
// plugin  resdis  mongoose apply
// application of scaling process nodejs clid process
// java sde multi threading
//ci server

/***
 * 
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        66.599s
Ran all test suites.
 */
