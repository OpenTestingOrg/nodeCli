const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/sessionFactory");
const userFactory = require("../factories/userFactory");

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    try {
      const user = await userFactory();
      const { session, sig } = sessionFactory(user);

      await this.page.setCookie({ name: "session", value: session });
      await this.page.setCookie({ name: "session.sig", value: sig });
      await this.page.goto("http://localhost:3000/blogs");
      await this.page.waitForSelector(
        'a[href="http://localhost:5000/auth/logout"]'
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async getContentOf(selector) {
    return await this.page.$eval(selector, (el) => el.innerHTML);
  }


  async get(path){
    return await this.page.evaluate((_path)=>{
        return fetch(_path,{
            method:"GET",
            credentials:'same-origin',
            header:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
    },path)
  }

  async post(path,data){
    return await  this.page.evaluate((_path,_data) => {
        return fetch(_path, {
           method: "POST",
           credentials: "same-origin",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(_data),
         }).then(res=>res.json());
    },path,data)
  }

  async execuRequest(actions){
    return  Promise.all(actions.map(({method,data,path})=>{
          return this[method](path,data);
    }));
  }
}

module.exports = CustomPage;
