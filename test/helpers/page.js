const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/sessionFactory");
const userFactory = require("../factories/userFactory");

class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
          headless: false,
        });
    
        const page = await browser.newPage();
        const customPage = new CustomPage(page);
    
        return new Proxy(customPage, {
          get: function(target, property) {
            return customPage[property] || browser[property] || page[property];
          }
        });
      }

  constructor(page) {
    this.page = page;
  }
  async login(){
   try{
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    await this.page.setCookie({ name: "session", value: session });
    await this.page.setCookie({ name: "session.sig", value: sig });
    await this.page.goto("http://localhost:3000/blogs");
    await this.page.waitForSelector('a[href="http://localhost:5000/auth/logout"]');
    
   }   
   catch(err){
       console.log(err.message)
   }
  }
  async getContentOf(selector){
      return await this.page.$eval(selector, (el) => el.innerHTML);
  }
}

module.exports = CustomPage;
