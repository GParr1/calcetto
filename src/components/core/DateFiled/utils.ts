export const monthsIT = [
  'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
  'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'
];

export const pad2 = (n: number) => String(n).padStart(2, '0');

export const isLeapYear = (year: number):
  boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
export const daysInMonth =(
  year: number,
  month0: number
) => {
  if (month0 === 1) return isLeapYear(year) ? 29 : 28; // Feb
  return [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month0];
}

/** Parsing robusto: accetta sia 'YYYY-MM-DD' che ISO completo con 'T' */
export const parseIncoming = (value?: string): { y: number | null; m: number | null; d: number | null } => {
  if (!value){
    return { y: 0, m: 0, d: 0 };
  }
  // caso 'YYYY-MM-DD'
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [yy, mm, dd] = value.split('-').map((v) => parseInt(v, 10));
    return { y: yy, m: mm, d: dd };
  }

  // caso ISO con T/Z
  const dt = new Date(value);
  if (!isNaN(dt.getTime())) {
    return { y: dt.getFullYear(), m: dt.getMonth() + 1, d: dt.getDate() };
  }

  return { y: 0, m: 0, d: 0 };
}