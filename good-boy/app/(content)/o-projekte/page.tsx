'use client';

import {
  Divider,
  Grid,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { ContentPageHeader } from '@/components/layout/ContentPageHeader';
import { useShelterResults } from '@/lib/query/shelters';

export default function OProjektePage() {
  const { data, isLoading } = useShelterResults();

  return (
    <Stack gap="xl">
      <ContentPageHeader title="O projekte" />

      {/* Description */}
      <Text size="md" lh={1.7}>
        Nadácia Good Boy sa venuje zlepšovaniu života psov v Žiline na
        Slovensku. Zachraňujeme opustené, týrané a bezdomovské psy,
        poskytujeme im lekársku starostlivosť, útočisko a lásku, ktorú si
        zaslúžia. Naším poslaním je dať týmto verným spoločníkom druhú šancu
        na život tým, že im nájdeme milujúci domov. Okrem záchrany a
        rehabilitácie sa zameriavame aj na podporu zodpovedného vlastníctva
        zvierat a ochrany zvierat prostredníctvom vzdelávacích a komunitných
        programov.
      </Text>

      <Divider />

      {/* Stats */}
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack align="center" gap={4}>
            {isLoading ? (
              <Skeleton height={53} width={200} />
            ) : (
              <Text
                size="xl"
                fw={600}
                c="violet"
                style={{ fontSize: 60, lineHeight: 1.1 }}
              >
                {data?.contribution.toLocaleString('sk-SK')} €
              </Text>
            )}
            <Text size="18px" c="dark" fw={500}>
              Celková vyzbieraná hodnota
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack align="center" gap={4}>
            {isLoading ? (
              <Skeleton height={53} width={120} />
            ) : (
              <Text
                size="xl"
                fw={600}
                c="violet"
                style={{ fontSize: 60, lineHeight: 1.1 }}
              >
                {data?.contributors.toLocaleString('sk-SK')}
              </Text>
            )}
            <Text size="18px" c="dark" fw={500}>
              Počet darcov
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider />

      {/* Additional text */}
      <Text size="md" lh={1.7}>
        Naša práca je možná vďaka podpore vášnivých dobrovoľníkov, štedrých
        darcov a komunity, ktorá sa hlboko stará o dobro zvierat. Organizujeme
        aj kastračné a sterilizačné iniciatívy, aby sme riešili problém
        túlavých psov a zabezpečili dlhodobý vplyv. V nadácii Good Boy
        veríme, že každý pes si zaslúži bezpečný, milujúci domov a šťastný
        život. Pridajte sa k nám a pomôžte nám robiť zmeny – či už
        dobrovoľníctvom, darovaním alebo adopciou chlpatého priateľa. Spoločne
        môžeme vytvoriť lepšiu budúcnosť pre psy v Žiline.
      </Text>
    </Stack>
  );
}
