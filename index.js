const fs = require('fs').promises
const Parser = require('rss-parser')
const parser = new Parser()

const LATEST_ARTICLE_PLACEHOLDER = /%{{latest_article}}%/g
const ICON_SIZE_PLACEHOLDER = /%{{icon_size}}%/g
const ICON_SIZE_X2_PLACEHOLDER = /%{{icon_size_x2}}%/g

const ICON_SIZE = '24px'
const ICON_SIZE_X2 = '48px'

;(async () => {
  const markdownTemplate = await fs.readFile('./README.md.tpl', { encoding: 'utf-8' })
  const {items} = await parser.parseURL('https://dev.to/feed/badiali');
  // latest article
  const [{title, link}] = items
  const latestArticleMarkdown = `<a href="${link}"><strong>${title}</strong></a>`
  let newMarkdown = markdownTemplate
    .replace(LATEST_ARTICLE_PLACEHOLDER, latestArticleMarkdown)
    .replace(ICON_SIZE_PLACEHOLDER, ICON_SIZE) // icon size
    .replace(ICON_SIZE_X2_PLACEHOLDER, ICON_SIZE_X2) // icon size x2

  await fs.writeFile('./README.md', newMarkdown)
})()