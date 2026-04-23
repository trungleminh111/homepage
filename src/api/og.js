import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    const isSocialBot = /facebookexternalhit|Facebot|LinkedInBot|Twitterbot|Slackbot|TelegramBot|WhatsApp|Zalo/i.test(userAgent);
    const id = req.query.id;

    if (!isSocialBot) {
        // Trả index.html để React SPA tự chạy bình thường
        const indexPath = path.join(process.cwd(), 'dist', 'index.html');
        const html = fs.readFileSync(indexPath, 'utf-8');
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
    }

    try {
        const apiRes = await fetch(`https://api.twbes.com/projects`);
        const data = await apiRes.json();
        const projects = Array.isArray(data) ? data : (data?.data || []);
        const project = projects.find(p => String(p._id) === String(id));

        if (!project) {
            res.setHeader('Location', '/');
            return res.status(302).end();
        }

        const title = `${project.Name} | TECHWORLD`;
        const description = project.short_description || 'Business Enhancement Solutions';
        const image = project.upload_preset || 'https://app.twbes.com/og-social.png';
        const url = `https://app.twbes.com/project/${id}`;

        res.setHeader('Content-Type', 'text/html');
        return res.send(`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="TECHWORLD" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${project.Name}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body></body>
</html>`);

    } catch (err) {
        res.setHeader('Location', '/');
        return res.status(302).end();
    }
}