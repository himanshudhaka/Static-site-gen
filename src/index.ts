import { Eta } from "eta";
import * as path from "path";
import * as fs from "fs";
const eta = new Eta({ views: path.join(__dirname, "templates") });

const create = (slug: string, res: any) => {
  if (!fs.existsSync(`./pages/${slug}`)) fs.mkdirSync(`./pages/${slug}`);

  fs.writeFile(`./pages/${slug}/index.html`, res, (e) => {
    if (e) throw e;
    console.log(`${slug} successfully created`);
  });
};

if (!fs.existsSync(`./pages`)) fs.mkdirSync(`./pages`);

fetch("https://www.boredapi.com/api/activity")
  .then((res) => res.json())
  .then((data) => {
    const slug = data.activity
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const res = eta.render("syntax", data);
    create(slug, res);
  });
