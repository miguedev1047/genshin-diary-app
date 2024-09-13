export const cleanParam = (param: string | null | undefined) =>
  param === 'null' ? undefined : param
