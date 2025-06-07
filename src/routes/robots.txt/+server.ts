// src/routes/robots.txt/+server.ts
import { NODE_ENV } from '$env/static/private';

/**
 * Generates a dynamic and SEO-optimized robots.txt file
 *
 * Improvements implemented:
 * 1. Base URL configurable via environment variable
 * 2. Different rules for production and development environments
 * 3. Optimized cache headers
 * 4. Additional directives for crawl control
 * 6. Clear documentation of rules
 *
 * @returns {Response} Response with the robots.txt file
 */
export function GET({ url }) {
	// 1. Dynamically set base URL
	const baseUrl = import.meta.env.VITE_SITE_URL || url.origin;

	// 2. Environment-specific content
	const content =
		NODE_ENV === 'production'
			? generateProductionRobotsTxt(baseUrl)
			: generateDevelopmentRobotsTxt(baseUrl);

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control':
				NODE_ENV === 'production'
					? 'public, max-age=86400' // 1-day cache in production
					: 'no-cache, no-store', // No cache in development
			'X-Robots-Tag': 'noindex' // Prevent indexing of robots.txt route itself
		}
	});
}

/**
 * Generates the robots.txt content for the production environment
 * @param {string} baseUrl - The site's base URL
 * @returns {string} The robots.txt content
 */

function generateProductionRobotsTxt(baseUrl: string): string {
	return `# SEO-optimized robots.txt - Production Environment
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Crawl-delay: 2

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-posts.xml

# Google-specific
User-agent: Googlebot
Allow: /images/
Disallow: /search/
`;
}

/**
 * Generates the robots.txt content for the development environment
 * @param {string} baseUrl - The site's base URL
 * @returns {string} The robots.txt content
 */
function generateDevelopmentRobotsTxt(baseUrl: string): string {
	return `# robots.txt - Development Environment
User-agent: *
Disallow: / # Blocks all in non-production environments

# Sitemap for reference only (won't be indexed)
Sitemap: ${baseUrl}/sitemap.xml
`;
}
