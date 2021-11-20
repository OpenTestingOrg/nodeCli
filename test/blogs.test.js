const Page = require("./helpers/page");
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});



describe('When logged in',()=>{
    
        beforeEach(async()=>{
            await page.login();
            await page.click("a.btn-floating");
        });

        test("blog create form is shown", async () => {
            try {
              
              const label = await page.getContentOf("form label");
              expect(label).toEqual("Blog Title");
            } catch (err) {
              console.log(err.message);
            }
          });
          
          describe('And using valid form inputs',()=>{
              beforeEach(async()=>{
                  await page.type('.title input','Testing Title');
                  await page.type('.content input','Testing Content');
                  await page.click('form button');
              })

              test('Submitting takes user to a review screen',async()=>{
                const text=await page.getContentOf('h5');
                expect(text).toEqual('Please confirm your entries');    
              })

              test('Submitting then saving adds blog to Blog index page',async()=>{
                await page.click('button.green');
                await page.waitForSelector('.card');

                const title=await page.getContentOf('.card-title');
                const content=await page.getContentOf('p');

                console.log(title,content,"data")    

                expect(title).toEqual('Testing Title');    
                expect(content).toEqual('Testing Content');    
                
              })
          })

          
          describe('And using invalid inputs',()=>{
              beforeEach(async()=>{
                  await page.click('form button');
              })
              test('the form shows an error message',async()=>{
                 const titleError=await page.getContentOf('.title .red-text')
                 const contentEror =await page.getContentOf('.content .red-text')

                 expect(titleError).toEqual('You must provide a value');
                 expect(contentEror).toEqual('You must provide a value');
              })
          })
})