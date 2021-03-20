import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

function Bio(props) {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData(width: 50, height: 50, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  const avatar = getImage(data.avatar);

  return (
    <Flex alignItems="center" {...props}>
      <Image
        as={GatsbyImage}
        image={avatar}
        alt={author}
        borderRadius="100%"
        minWidth={50}
        mr="1rem"
      />
      <Text>
        Blog personnel de{" "}
        <Link
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          textDecoration="underline"
          isExternal
        >
          {author} <Icon as={FaExternalLinkAlt} boxSize={3} />
        </Link>
        . Vous pouvez y trouver des articles sur mes découvertes dans le monde
        du développement ou autre sujet qui m'intéresse.{` `}
      </Text>
    </Flex>
  );
}

export default Bio;
