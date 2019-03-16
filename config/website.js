module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Traveller Blog', // Navigation and Site Title
  titleAlt: 'Meghan Clancys travels', // Title for JSONLD
  description: 'A simple blog outlinging adventures',
  headline: 'wowie', // Headline for schema.org JSONLD
  url: 'https://prismic.lekoarts.de', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  logo: '/logos/logo-1024.png', // Used for SEO
  ogLanguage: 'en_US', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'Traveller Blog', // shortname for manifest. MUST be shorter than 12 characters
  author: 'Meghan Clancy', // Author for schemaORGJSONLD


  twitter: '@starter_prismicio', // Twitter Username
  facebook: 'gatsby-prismic', // Facebook Site Name
  googleAnalyticsID: 'UA-47519312-7',

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
