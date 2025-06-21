const API_URL = 'http://localhost:8000/cats/'

export type Cat = {
  id: number
  name: string
  experience: number
  breed: string
  salary: number
}

export async function fetchCats(): Promise<Cat[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch spy cats')
  return res.json()
}

export async function fetchCatById(id: number): Promise<Cat> {
  const res = await fetch(`${API_URL}${id}`)
  if (!res.ok) throw new Error(`Failed to fetch spy cat with id ${id}`)
  return res.json()
}

export async function addCat(cat: Omit<Cat, 'id'>) {
  console.log(JSON.stringify(cat))
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cat),
  })
  if (!res.ok) throw new Error('Failed to add spy cat')
  return res.json()
}

export async function updateCatSalary(id: number, salary: number) {
  const res = await fetch(`${API_URL}${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salary }),
  })
  if (!res.ok) throw new Error('Failed to update salary')
  return res.json()
}

export async function deleteCat(id: number) {
  const res = await fetch(`${API_URL}${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete spy cat')
  return true
}