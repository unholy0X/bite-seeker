export type PreflightItem = {
  checked: boolean;
  id: string;
  subtitle: string;
  title: string;
};

export type CookingStepTwoContent = {
  description: string;
  tipDescription: string;
  tipTitle: string;
  title: string;
};

export type CompletionStat = {
  id: string;
  label: string;
  value: string;
  valueTone?: 'accent' | 'default';
};

export const preflightItems: PreflightItem[] = [
  {
    checked: true,
    id: 'ingredients-ready',
    subtitle: 'Check your pantry list',
    title: 'All ingredients ready',
  },
  {
    checked: true,
    id: 'equipment-prepared',
    subtitle: 'Large pot, strainer, bowls',
    title: 'Equipment prepared',
  },
  {
    checked: false,
    id: 'read-steps',
    subtitle: '5 steps, ~25 minutes',
    title: 'Read all steps',
  },
  {
    checked: false,
    id: 'clean-workspace',
    subtitle: 'Clear your cooking area',
    title: 'Clean workspace',
  },
];

export const boilingStep = {
  description: 'Bring the chicken broth to a gentle\nboil over medium-high heat',
  remaining: '08:42',
  subtitle: 'Boil the broth',
};

export const stepTwoContent: CookingStepTwoContent = {
  description:
    'Add the ramen noodles to the boiling\nbroth. Cook for 3-4 minutes until al dente.\nStir gently to prevent sticking.',
  tipDescription: "Don't overcook! The noodles will continue cooking in the hot broth.",
  tipTitle: 'Pro Tip',
  title: 'Add the Noodles',
};

export const completionStats: CompletionStat[] = [
  { id: 'time', label: 'Cook Time', value: '25m' },
  { id: 'calories', label: 'Calories', value: '420' },
  { id: 'tokens', label: 'Tokens', value: '+5', valueTone: 'accent' },
];
