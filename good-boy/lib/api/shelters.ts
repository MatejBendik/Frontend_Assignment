import type {
  SheltersResponse,
  ShelterResultsResponse,
  ContributePayload,
  ContributeResponse,
} from '@/types/api';

const BASE_URL = 'https://frontend-assignment-api.goodrequest.dev/api/v1';

export async function getShelters(search?: string): Promise<SheltersResponse> {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${BASE_URL}/shelters/${params}`, {
    headers: { accept: 'application/json' },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getShelterResults(): Promise<ShelterResultsResponse> {
  const res = await fetch(`${BASE_URL}/shelters/results`, {
    headers: { accept: 'application/json' },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function postContribution(payload: ContributePayload): Promise<ContributeResponse> {
  const res = await fetch(`${BASE_URL}/shelters/contribute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
