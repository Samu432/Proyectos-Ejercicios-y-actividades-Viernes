// src/services/api.ts
// Cliente Axios hacia tu MockAPI (recurso /equipment).

import axios from 'axios';
import type { Item } from '../types';

const api = axios.create({
  baseURL: 'https://6af66a0ce844c7ff741b53a0.mockapi.io',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchItems(): Promise<Item[]> {
  const { data } = await api.get<Item[]>('/equipment');
  return data;
}

export async function fetchItemById(id: number | string): Promise<Item> {
  const { data } = await api.get<Item>(`/equipment/${id}`);
  return data;
}

export async function createItem(
  payload: Omit<Item, 'id'>,
): Promise<Item> {
  const { data } = await api.post<Item>('/equipment', payload);
  return data;
}

export async function updateItem(
  id: number | string,
  payload: Partial<Omit<Item, 'id'>>,
): Promise<Item> {
  const { data } = await api.put<Item>(`/equipment/${id}`, payload);
  return data;
}