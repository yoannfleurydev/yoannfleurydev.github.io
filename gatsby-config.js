module.exports = {
  siteMetadata: {
    title: `Blog de Yoann Fleury`,
    author: `Yoann Fleury`,
    description: `Partage et présentation de connaissances sur divers sujets`,
    siteUrl: `https://blog.yoannfleury.dev`,
    social: {
      twitter: `yoannfleurydev`,
    },
  },
  plugins: [
    `gatsby-alias-imports`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/media`,
        name: `media`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              quality: 90,
              disableBgImageOnAlpha: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: { sh: "bash" },
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-147409206-1",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allFile } }) => {
              return allFile.nodes.map((node) => {
                return Object.assign({}, node.childMdx.frontmatter, {
                  description: node.childMdx.excerpt,
                  date: node.childMdx.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.childMdx.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.childMdx.fields.slug,
                  custom_elements: [{ "content:encoded": node.childMdx.html }],
                });
              });
            },
            query: `
              {
                allFile(sort: {order: DESC, fields: [childMdx___frontmatter___date]}, filter: {
                  childMdx:{
                    frontmatter : {
                      published: {
                        eq : true
                      }
                    }
                  }
                }) {
                  nodes {
                    childMdx {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Blog de Yoann Fleury",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blog de Yoann Fleury`,
        short_name: `YoannFleuryDev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0b86ac`,
        display: `minimal-ui`,
        icon: `content/assets/blog-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
};
