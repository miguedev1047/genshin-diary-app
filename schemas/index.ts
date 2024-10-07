import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'El correo electrónico no es válido',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  }),
})

export const CharacterSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre del personaje es requerido.',
  }),
  image_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  description: z.string().min(3, {
    message: 'La descripción del personaje es requerida.',
  }),
  role: z.string().min(1, {
    message: 'El rol es requerido.',
  }),
  element: z.string().min(1, {
    message: 'El elemento es requerido.',
  }),
  rarity: z.string().min(1, {
    message: 'La rareza es requerida.',
  }),
  region: z.string().min(1, {
    message: 'La region es requerida.',
  }),
  weapon: z.string().min(1, {
    message: 'El tipo de arma es requerida.',
  }),
  attribute: z.string().min(1, {
    message: 'El atributo es requerido.',
  }),
})

export const WeaponSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre de la arma es requerido.',
  }),
  image_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  passive_description: z.string().min(3, {
    message: 'La descripción de la arma es requerida.',
  }),
  base_attack: z.string().min(2, {
    message: 'El ataque base es requerido.',
  }),
  main_stat: z.enum(
    [
      'DMG_CRIT',
      'ELEMENTAL_MASTERY',
      'ENERGY_RECHARGE',
      'CRIT_RATE',
      'HEAL_BONUS',
      'PHYSICAL_DMG',
      'ATQ',
      'DEF',
      'HP',
      'PYRO_DMG',
      'HYDRO_DMG',
      'ELECTRO_DMG',
      'DENDRO_DMG',
      'CRYO_DMG',
      'ANEMO_DMG',
      'GEO_DMG',
    ],
    {
      message: 'El atributo principal es requerido.',
    }
  ),
  type: z.enum(['SWORD', 'CLAYMORE', 'POLEARM', 'BOW', 'CATALYST'], {
    message: 'El tipo del arma es requerida.',
  }),
  rarity: z.enum(['STAR_5', 'STAR_4', 'STAR_3', 'STAR_2', 'STAR_1'], {
    message: 'La rareza es requerida.',
  }),
})

export const WeaponBestCharactersSchema = z.object({
  characters: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos un personaje.'),
})

export const WeaponAscensionSchema = z.object({
  ascension_level: z.string().min(1, 'La ascensión requerida.'),
  materials: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos un material.'),
})

export const WeaponCharacterSchema = z.object({
  weapons: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos una arma.'),
})

export const MaterialQuantitySchema = z.object({
  quantity: z.string().min(1, 'La cantidad es requerida.'),
})

export const MaterialSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre del material es requerido.',
  }),
  image_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  description: z.string().min(3, {
    message: 'La descripción del material es requerida.',
  }),
  type: z.enum(
    [
      'MATERIAL_UPGRADE',
      'MATERIAL_LOCAL',
      'MATERIAL_COMMON',
      'MATERIAL_BOSS',
      'MATERIAL_WEEKLY_BOSS',
      'MATERIAL_TALENT',
      'MATERIAL_UPGRADE_WEAPON',
      'MATERIAL_UPGRADE_CHARACTER',
    ],
    {
      message: 'El tipo de material es requerido.',
    }
  ),
  rarity: z.enum(['STAR_5', 'STAR_4', 'STAR_3', 'STAR_2', 'STAR_1'], {
    message: 'La rareza es requerida.',
  }),
})

export const ArtifactSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre del artefacto es requerido.',
  }),
  image_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  rarity: z.enum(['STAR_5', 'STAR_4', 'STAR_3', 'STAR_2', 'STAR_1'], {
    message: 'La rareza es requerida.',
  }),
  bonus_description: z.string().min(3, {
    message: 'La descripción del artefacto es requerida.',
  }),
})

export const ArtifactCharacterSchema = z.object({
  artifacts: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos un artefacto.'),
})

export const AscensionSchema = z.object({
  ascension_level: z.string().min(1, 'La ascensión requerida.'),
  materials: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos un material.'),
})

export const StatsPrioritySchema = z.object({
  sand_stat: z.string().min(1, 'La estadistica es requerida.'),
  globet_stat: z.string().min(1, 'La estadistica es requerida.'),
  circlet_stat: z.string().min(1, 'La estadistica es requerida.'),
  order_priority: z.string().min(1, 'La prioridad es requerida.'),
  character_id: z.string()
})
