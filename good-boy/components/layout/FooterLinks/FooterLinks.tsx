"use client";

import Link from "next/link";
import { Image, Menu, UnstyledButton, Text, Group } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import classes from "./FooterLinks.module.css";
import { useTranslation } from "@/lib/i18n/client";
import { locales, type Locale } from "@/lib/i18n/settings";

const LANG_LABELS: Record<Locale, string> = {
  sk: "SK",
  en: "EN",
};

interface FooterLinksProps {
  showSocial?: boolean;
}

export function FooterLinks({ showSocial = false }: FooterLinksProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: t("nav.contact"), href: `/${lang}/kontakt` },
    { label: t("nav.aboutProject"), href: `/${lang}/o-projekte` },
  ];

  function switchLanguage(newLang: Locale) {
    if (newLang === lang) return;
    // Replace the current locale segment in the path
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  }

  return (
    <footer className={classes.footer}>
      {/* Logo */}
      <Link href={`/${lang}`} className={classes.logo}>
        <Image src="/logo.svg" alt={t("footer.logoAlt")} w={124} h={32} />
      </Link>

      {/* Right group: optional social icons + lang switch + nav links */}
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

        {/* Language switcher */}
        <Menu position="top-end" withArrow>
          <Menu.Target>
            <UnstyledButton className={classes.langToggle}>
              <Text size="sm" fw={600}>
                {LANG_LABELS[lang]}
              </Text>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            {locales.map((locale) => (
              <Menu.Item
                key={locale}
                onClick={() => switchLanguage(locale)}
                fw={locale === lang ? 700 : 400}
                c={locale === lang ? "violet" : undefined}
              >
                {LANG_LABELS[locale]}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

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
