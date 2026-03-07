export type DayEntry = {
  dayLabel: string;
  id: string;
  selected?: boolean;
  value: number;
};

export type MealSlot = {
  calories: string;
  duration: string;
  iconStyle: 'dark' | 'food' | 'add';
  id: string;
  mealType: string;
  title: string;
};

export const weekDays: DayEntry[] = [
  { dayLabel: 'Mon', id: 'mon', value: 3 },
  { dayLabel: 'Tue', id: 'tue', value: 4 },
  { dayLabel: 'Wed', id: 'wed', selected: true, value: 5 },
  { dayLabel: 'Thu', id: 'thu', value: 6 },
  { dayLabel: 'Fri', id: 'fri', value: 7 },
  { dayLabel: 'Sat', id: 'sat', value: 8 },
  { dayLabel: 'Sun', id: 'sun', value: 9 },
];

export const mealSlots: MealSlot[] = [
  {
    calories: '350 kcal',
    duration: '15 min',
    iconStyle: 'dark',
    id: 'breakfast',
    mealType: 'Breakfast',
    title: 'Oatmeal Bowl',
  },
  {
    calories: '420 kcal',
    duration: '25 min',
    iconStyle: 'food',
    id: 'lunch',
    mealType: 'Lunch',
    title: 'Spicy Ramen Bowl',
  },
  {
    calories: '',
    duration: '',
    iconStyle: 'add',
    id: 'dinner',
    mealType: 'Dinner',
    title: 'Add a meal',
  },
  {
    calories: '',
    duration: '',
    iconStyle: 'add',
    id: 'snack',
    mealType: 'Snack',
    title: 'Add a snack',
  },
];
