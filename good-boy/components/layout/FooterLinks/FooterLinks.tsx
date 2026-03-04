'use client';

import Link from 'next/link';
import { Image } from '@mantine/core';
import { ActionIcon, Group } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandInstagram,
} from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

const links = [
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'O projekte', href: '/o-projekte' },
];

interface FooterLinksProps {
  showSocial?: boolean;
}

export function FooterLinks({ showSocial = false }: FooterLinksProps) {
  return (
    <footer className={classes.footer}>
      {/* Logo */}
      <Link href="/" className={classes.logo}>
        <Image src="logo.svg" alt="Good Boy logo" />
      </Link>

      {/* Optional social icons */}
      {showSocial && (
        <Group gap="xs" className={classes.social}>
          <ActionIcon
            size="lg"
            variant="subtle"
            color="gray"
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <IconBrandFacebook size={20} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="subtle"
            color="gray"
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <IconBrandInstagram size={20} />
          </ActionIcon>
        </Group>
      )}

      {/* Navigation links */}
      <Group className={classes.links} gap="lg">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={classes.link}>
            {link.label}
          </Link>
        ))}
      </Group>
    </footer>
  );
}
