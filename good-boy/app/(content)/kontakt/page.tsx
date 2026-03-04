'use client';

import {
  Anchor,
  Grid,
  Image,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconMail,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import { ContentPageHeader } from '@/components/layout/ContentPageHeader';

const CONTACT_CARDS = [
  {
    icon: IconMail,
    title: 'Email',
    description: 'Our friendly team is here to help.',
    value: 'hello@goodrequest.com',
    href: 'mailto:hello@goodrequest.com',
  },
  {
    icon: IconMapPin,
    title: 'Office',
    description: 'Come say hello at our office HQ.',
    value: 'Obchodná 3D, 010 08 Žilina, Slovakia',
    href: 'https://maps.google.com/?q=Obchodná+3D+Žilina',
  },
  {
    icon: IconPhone,
    title: 'Phone',
    description: 'Mon-Fri from 8am to 5pm.',
    value: '+421 911 750 750',
    href: 'tel:+421911750750',
  },
];

export default function KontaktPage() {
  return (
    <Stack gap="xl">
      <ContentPageHeader title="Kontakt" />

      {/* Contact cards */}
      <Grid gutter="xl" mt="md">
        {CONTACT_CARDS.map((card) => (
          <Grid.Col key={card.title} span={{ base: 12, sm: 4 }}>
            <Stack align="center" ta="center" gap="xs">
              <ThemeIcon
                variant="light"
                color="violet"
                size={48}
                radius="xl"
              >
                <card.icon size={24} />
              </ThemeIcon>
              <Text fw={700} size="lg">
                {card.title}
              </Text>
              <Text size="sm" c="dimmed">
                {card.description}
              </Text>
              <Anchor
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                size="sm"
                c="violet"
                fw={500}
              >
                {card.value}
              </Anchor>
            </Stack>
          </Grid.Col>
        ))}
      </Grid>

      {/* Hero image */}
      <Image
        src="/images/kontakt-dog.jpg"
        alt="Pes na pláži"
        radius="20px"
        h={{ base: 260, sm: 400 }}
        fit="cover"
        mt="md"
      />
    </Stack>
  );
}
