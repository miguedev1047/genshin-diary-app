import {
  getArtifacts,
  getCharacters,
  getMaterials,
  getTeams,
  getTierlists,
  getWeapons,
} from '@/features/providers/data-provider/data.fetch'
import { DataProvider } from '@/features/providers/data-provider/data-provider'
import { DataWrapperProps } from '@/features/providers/data-provider/data-provider.type'

export async function DataWrapper(props: DataWrapperProps) {
  const { children } = props

  const [MATERIALS, WEAPONS, ARTIFACTS, CHARACTERS, TIERLISTS, TEAMS] =
    await Promise.all([
      getMaterials(),
      getWeapons(),
      getArtifacts(),
      getCharacters(),
      getTierlists(),
      getTeams(),
    ])

  const DATA = {
    characters: CHARACTERS,
    materials: MATERIALS,
    weapons: WEAPONS,
    artifacts: ARTIFACTS,
    tierlists: TIERLISTS,
    teams: TEAMS,
  }

  return <DataProvider data={DATA}>{children}</DataProvider>
}
