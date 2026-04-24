export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isSocialBot = /facebookexternalhit|Facebot|LinkedInBot|Twitterbot|Slackbot|TelegramBot|WhatsApp|Zalo/i.test(userAgent);
  const { type, id, slug } = req.query;

  if (!isSocialBot) {
    const location = type === 'tintuc' ? `/tin-tuc/${slug}?_loaded=1` : `/project/${id}?_loaded=1`;
    res.writeHead(302, { Location: location });
    return res.end();
  }

  try {
    let title, description, image, url;

    if (type === 'tintuc') {
      const apiRes = await fetch(`https://twi.vn/wp-json/wp/v2/posts?slug=${slug}&_embed`);
      const data = await apiRes.json();

      if (!data.length) {
        res.writeHead(302, { Location: '/' });
        return res.end();
      }

      const article = data[0];

      title = article.title.rendered
        .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(c))
        .replace(/<[^>]*>/g, '')
        .trim();
      title = `${title} | TECHWORLD`;

      description = article.excerpt.rendered
        .replace(/<[^>]*>/g, '')
        .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(c))
        .trim()
        .slice(0, 160);

      image = article._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || 'https://app.twbes.com/og-social.png';

      url = `https://app.twbes.com/tin-tuc/${slug}`;

    } else {
      const apiRes = await fetch(`https://api.twbes.com/projects`);
      const data = await apiRes.json();
      const projects = Array.isArray(data) ? data : (data?.data || []);
      const project = projects.find(p => String(p._id) === String(id));

      if (!project) {
        res.writeHead(302, { Location: '/' });
        return res.end();
      }

      title = `${project.Name} | TECHWORLD`;
      description = project.short_description || 'Business Enhancement Solutions';
      image = project.upload_preset || 'https://app.twbes.com/og-social.png';
      url = `https://app.twbes.com/project/${id}`;
    }

    const ogHtml = `<!DOCTYPE html>
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
  <meta property="og:image:alt" content="${title}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body></body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.send(ogHtml);

  } catch (err) {
    console.error('OG handler error:', err);
    res.writeHead(302, { Location: '/' });
    return res.end();
  }
}