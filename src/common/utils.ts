import { CategoryCode } from '@/modules/animals/types';

interface ParseUserCode {
  code: number;
  categoryCode: string;
  year: number;
}
export const parseUserCode = (userCode: string): ParseUserCode => {
  const regex = /(\d+)([а-яА-Я]+)-(\d+)/i;
  const [_, code, categoryCode, year] = userCode.match(regex);

  return { code: +code, categoryCode, year: +year };
};
export const createUserCode = (
  categoryCode: CategoryCode,
  userCode: number,
): string => {
  const categoryCodeText = categoryCode === CategoryCode.NewCat ? 'НК' : 'НС';
  return `${userCode}${categoryCodeText}-${new Date().getFullYear()}`;
};
