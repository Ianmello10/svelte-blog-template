import { NODE_ENV } from '$env/static/private';
import type { Post } from '$lib/types.js';
// src/routes/sitemap.xml/+server.ts

// Function to escape special characters for valid XML
function escapeXml(unsafe: string): string {
	return unsafe.replace(/[<>&'"]/g, (char) => {
		switch (char) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			case '"':
				return '&quot;';
			default:
				return char;
		}
	});
}

/**
 * Generates an SEO-optimized XML sitemap.
 *
 * Enhancements implemented:
 * 1. Dynamic base URL using environment variable
 * 2. Escapes special characters for valid XML
 * 3. Includes homepage with maximum priority
 * 4. Dynamic priority based on content age
 * 5. ISO date formatting
 * 6. Robust error handling
 * 7. Environment-based cache control
 *
 * @param {Object} options - SvelteKit request object
 * @returns {Response} XML response with the sitemap
 */
export async function GET({ url, fetch }) {
	try {
		// 1. Base configuration depending on environment
		const baseUrl = import.meta.env.VITE_SITE_URL || url.origin;
		const today = new Date().toISOString();

		// 2. Fetch posts directly (no API call overhead)
		const posts = await fetch('/api/posts');
		const postsData: Post[] = await posts.json();

		// 3. Generate sitemap entries
		const entries = [
			// Homepage (highest priority)
			{
				loc: baseUrl,
				lastmod: today,
				changefreq: 'daily',
				priority: '1.0'
			},

			// Important static pages
			{
				loc: `${baseUrl}/blog`,
				lastmod: '2024-01-01', // Last manual update
				changefreq: 'monthly',
				priority: '0.7'
			},

			// Blog posts
			...postsData.map((post) => {
				const postDate = new Date(post.metadata.date);
				const ageInMonths = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

				// Priority decreases over time (newer posts get higher priority)
				const priority = Math.max(0.8 - ageInMonths * 0.05, 0.3).toFixed(1);

				return {
					loc: `${baseUrl}/blog/${post.metadata.slug}`,
					lastmod: postDate.toISOString(),
					changefreq: 'monthly',
					priority
				};
			})
		];

		// 4. Build XML with proper escaping
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries
		.map(
			(entry) => `
  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
		)
		.join('')}
</urlset>`;

		// 5. Return response with proper headers
		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control':
					NODE_ENV === 'production'
						? 'public, max-age=86400, stale-while-revalidate=3600' // 1 day cache
						: 'no-cache, no-store, must-revalidate'
			}
		});
	} catch (error) {
		// 6. Robust error handling
		console.error('Error generating sitemap:', error);
		return new Response(
			`<?xml version="1.0" encoding="UTF-8"?>
<error>
  <message>Error generating sitemap</message>
  <timestamp>${new Date().toISOString()}</timestamp>
</error>`,
			{
				status: 500,
				headers: {
					'Content-Type': 'application/xml'
				}
			}
		);
	}
}
