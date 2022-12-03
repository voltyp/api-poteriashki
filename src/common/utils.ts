// TODO: придумать как лучше заменить id
export const getUserCode = (categoryCode: string, id: number): string =>
  `${id}${categoryCode}-${new Date().getFullYear()}`;
