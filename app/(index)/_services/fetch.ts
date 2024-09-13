import db from '@/lib/db'

export async function getCharacters() {
  try {
    const CHARACTERS = await db.characters.findMany({
      orderBy: [
        {
          rarity: 'asc',
        },
        {
          name: 'asc',
        },
        {
          date_created: 'desc',
        },
      ],
      include: {
        images: true,
      },
    })

    return CHARACTERS
  } catch (error) {
    return null
  }
}
