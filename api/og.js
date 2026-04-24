export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isSocialBot = /facebookexternalhit|Facebot|LinkedInBot|Twitterbot|Slackbot|TelegramBot|WhatsApp|Zalo/i.test(userAgent);
  const { type, id, slug } = req.query;

  if (!isSocialBot) {
    const location = type === 'tintuc' ? `/tin-tuc/${slug}?_loaded=1` : `/project/${id}?_loaded=1`;
    res.writeHead(302, { Location: location });
    return res.end();
  }

  const escape = (str) => str
    ?.replace(/&/g, '&amp;')
    ?.replace(/"/g, '&quot;')
    ?.replace(/</g, '&lt;')
    ?.replace(/>/g, '&gt;') || '';

  const buildHtml = (title, description, image, url) => `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="TECHWORLD" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:url" content="${escape(url)}" />
  <meta property="og:title" content="${escape(title)}" />
  <meta property="og:description" content="${escape(description)}" />
  <meta property="og:image" content="${escape(image)}" />
  <meta property="og:image:secure_url" content="${escape(image)}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escape(title)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escape(title)}" />
  <meta name="twitter:description" content="${escape(description)}" />
  <meta name="twitter:image" content="${escape(image)}" />
</head>
<body></body>
</html>`;

  const fallbackHtml = buildHtml(
    'TECHWORLD',
    'Business Enhancement Solutions',
    'https://app.twbes.com/og-social.png',
    'https://app.twbes.com'
  );

  try {
    let title, description, image, url;

    if (type === 'tintuc') {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      const apiRes = await fetch(
        `https://twi.vn/wp-json/wp/v2/posts?slug=${slug}&_embed`,
        {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
            'Accept': 'application/json',
          }
        }
      );
      clearTimeout(timeout);

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
        .replace(/&hellip;/g, '...')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .trim()
        .slice(0, 160);

      // Thử nhiều cách lấy ảnh
      const imgMatch = article.content?.rendered?.match(/src="([^"]+\.(png|jpg|jpeg|webp))"/);
      image = article._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || article.rttpg_featured_image_url?.full?.[0]
        || imgMatch?.[1]
        || 'https://app.twbes.com/og-social.png';

      url = `https://app.twbes.com/tin-tuc/${slug}`;

    } else {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const apiRes = await fetch(`https://api.twbes.com/projects`, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
          'Accept': 'application/json',
        }
      });
      clearTimeout(timeout);

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

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(buildHtml(title, description, image, url));

  } catch (err) {
    console.error('OG handler error:', err);
    res.setHeader('Content-Type', 'text/html');
    return res.send(fallbackHtml);
  }
}