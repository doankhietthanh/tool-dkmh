const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.waitForTimeout(30000);

  ////////////////////////////////
  await page.goto("https://dkmh.hcmute.edu.vn/Login/LoginWithProvider");

  await page.waitForTimeout(10000);

  const data = await page.cookies();
  console.log(data.find((i) => (i.name = "ASP.NET_SessionId")).value);
  ////////////////////////////////

  setInterval(async () => {
    try {
      await page.goto("https://dkmh.hcmute.edu.vn/Login/LoginWithProvider");

      await page.waitForTimeout(10000);

      const data = await page.cookies();
      const newstr = data.map((i) => i.name + "=" + i.value).join("; ");
      fs.writeFileSync("./cookie.txt", newstr, "utf8");
    } catch (error) {}
  }, 15000);

  //   await browser.close();
})();
