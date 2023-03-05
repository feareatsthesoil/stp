import React from "react"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from "next/router"
import twitterBlack from "../../public/Images/twitter-black.png"
import openseaWhite from "../../public/Images/opensea-white.png"
import twitterWhite from "../../public/Images/twitter-white.png"
import openseaBlack from "../../public/Images/opensea-black.png"
import instagramWhite from "../../public/Images/instagram-white.png"
import instagramBlack from "../../public/Images/instagram-black.png"
import discordWhite from "../../public/Images/discord-white.png"
import discordBlack from "../../public/Images/discord-black.png"

const imageProps = {
  quality: 75,
  height: 20,
  width: 20
}

function FooterSocials() {
  const router = useRouter()
  const isHomepage = router.pathname === "/"

  const items = [{
    href: "https://twitter.com/stp_xyz",
    src: isHomepage ? twitterWhite : twitterBlack,
    alt: "Twitter"
  }, {
    href: "https://opensea.io/collection/seeds-luciensmith",
    src: isHomepage ? openseaWhite : openseaBlack,
    alt: "Opensea"
  }, {
    href: "https://www.instagram.com/servingthepeople/",
    src: isHomepage ? instagramWhite : instagramBlack,
    alt: "Instagram"
  }, {
    href: "https://discord.gg/nhqyng5wQ9",
    src: isHomepage ? discordWhite : discordBlack,
    alt: "Discord"
  }]
  return (
    <ul>
      {items.map(({ href, src, alt }) => {
        return (
          <li key={alt}>
            <Link
              href={href}
              target="webapp-tab">
              <Image
                src={src}
                alt={alt}
                {...imageProps}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default FooterSocials;
