"use client";

import Link from "next/link";
import { Image } from "@mantine/core";
import { Group } from "@mantine/core";
import classes from "./FooterLinks.module.css";

const links = [
  { label: "Kontakt", href: "/kontakt" },
  { label: "O projekte", href: "/o-projekte" },
];

interface FooterLinksProps {
  showSocial?: boolean;
}

export function FooterLinks({ showSocial = false }: FooterLinksProps) {
  return (
    <footer className={classes.footer}>
      {/* Logo */}
      <Link href="/" className={classes.logo}>
        <Image src="logo.svg" alt="Good Boy logo" w={124} h={32} />
      </Link>

      {/* Right group: optional social icons + nav links */}
      <Group gap="xl" align="center">
        {showSocial && (
          <Group gap="xs" className={classes.social}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image src="/icons/facebook-icon.svg" alt="" w={16} h={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image src="/icons/instagram-icon.svg" alt="" w={16} h={16} />
            </a>
          </Group>
        )}

        <Group className={classes.links} gap="lg">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={classes.link}>
              {link.label}
            </Link>
          ))}
        </Group>
      </Group>
    </footer>
  );
}
