'use server'

import { getEnkaClient } from '@/lib/enka-client'
import { PlayerDataProps } from '@/types/player-data.type'
import { toLink } from '../helpers/to-link-enka'

const enka = getEnkaClient()

export async function getPlayerData(uid: string) {
  try {
    const user = await enka.fetchUser(uid)

    const DATA = {
      infoUser: {
        nickname: user.nickname,
        playerUid: user.uid,
        level: user.level,
        worldlevel: user.worldLevel,
        profilePicture: toLink(user.profileCard.pictures[1].url),
        signature: user.signature,
        achievements: user.achievements,
        profileAvatar: user.profilePicture?.icon.url,
        spiralAbyss: {
          chamber: user.spiralAbyss?.chamber,
          floor: user.spiralAbyss?.floor,
          stars: user.spiralAbyss?.stars,
        },
        characters: user.characters.map((char) => ({
          playerName: user.nickname,
          playerUid: user.uid,
          name: char.characterData.name.get(),
          id: char.characterData.id,
          elementType: char.characterData.element?.name.get().toUpperCase(),
          elementText: char.characterData.element?.name.get(),
          splashImageUrl: toLink(char.characterData.splashImage.url),
          sideIcon: char.characterData.sideIcon.url,
          icon: toLink(char.characterData.icon.url),
          level: char.level,
          friendship: char.friendship,
          maxLevel: char.maxLevel,
          stars: char.characterData.stars,
          currentCostume: {
            icon: toLink(char.costume.icon.url),
            splashImageUrl: toLink(char.costume.splashImage.url),
          },
          statsList: char.stats.statProperties.map((stats) => ({
            name: stats.fightPropName.get(),
            value: stats.valueText,
            numberValue: stats.value,
            itemType: stats.fightProp,
            id: stats.fightPropName.id,
          })),
          artifacts: char.artifacts.map((artifact) => ({
            name: artifact.artifactData.name.get(),
            id: artifact.artifactData.id,
            stars: artifact.artifactData.stars,
            level: artifact.level,
            artifactSet: artifact.artifactData.set.name.get(),
            equipTypeName: artifact.artifactData.equipTypeName.get(),
            imageUrl: toLink(artifact.artifactData.icon.url),
            mainstat: artifact.mainstat.fightPropName.get(),
            itemType: artifact.mainstat.fightProp,
            mainstatValue: artifact.mainstat.valueText,
            substats: artifact.substats.total.map((substat) => ({
              name: substat.fightPropName.get(),
              id: substat.fightPropName.id,
              value: substat.valueText,
              itemType: substat.fightProp,
            })),
          })),
          weapon: {
            name: char.weapon.weaponData.name.get(),
            id: char.weapon.weaponData.id,
            iconUrl: toLink(char.weapon.weaponData.icon.url),
            level: char.weapon.level,
            maxLevel: char.weapon.maxLevel,
            refinement: char.weapon.refinementRank,
            stars: char.weapon.weaponData.stars,
            attack: char.weapon.weaponStats.map((stats) => ({
              name: stats.fightPropName.get(),
              id: stats.fightPropName.id,
              value: stats.valueText,
              itemType: stats.fightProp,
            })),
          },
          constellations: char.characterData.constellations.map(
            (constellation) => ({
              name: constellation.name.get(),
              id: constellation.id,
              iconUrl: toLink(constellation.icon.url),
              description: constellation.description.get(),
              isUnlocked: char.unlockedConstellations.find(
                (i) => i.id === constellation.id
              )?.id
                ? true
                : false,
            })
          ),
          skillLevels: char.skillLevels.map((level) => ({
            id: level.skill.id,
            level: {
              level: level.level.value,
              base: level.level.base,
              extra: level.level.extra,
            },
            skill: {
              name: level.skill.name.get(),
              iconUrl: toLink(level.skill.icon.url),
            },
          })),
          passives: char.characterData.passiveTalents
            .filter((passive) => passive.isHidden === false)
            .map((passive) => ({
              id: passive.id,
              name: passive.name.get(),
              description: passive.description.get(),
              icon: toLink(passive.icon?.url),
            })),
        })),
      },
    }

    return DATA as PlayerDataProps
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    }
    return null
  }
}
