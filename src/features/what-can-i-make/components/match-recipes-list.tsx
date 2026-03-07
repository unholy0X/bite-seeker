import { View } from 'react-native';

import { matchRecipes } from '../data/what-can-i-make-content';
import { MatchRecipeCard } from './match-recipe-card';

type MatchRecipesListProps = {
  onRecipePress?: (recipeId: string) => void;
};

export function MatchRecipesList({ onRecipePress }: MatchRecipesListProps) {
  return (
    <View>
      {matchRecipes.map((recipe) => (
        <MatchRecipeCard key={recipe.id} onPress={onRecipePress} recipe={recipe} />
      ))}
    </View>
  );
}
