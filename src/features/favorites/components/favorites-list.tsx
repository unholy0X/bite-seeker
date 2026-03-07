import { View } from 'react-native';

import { favoriteRecipes } from '../data/favorites-content';
import { FavoriteRecipeCard } from './favorite-recipe-card';

type FavoritesListProps = {
  onRecipePress?: (recipeId: string) => void;
};

export function FavoritesList({ onRecipePress }: FavoritesListProps) {
  return (
    <View>
      {favoriteRecipes.map((recipe) => (
        <FavoriteRecipeCard key={recipe.id} onPress={onRecipePress} recipe={recipe} />
      ))}
    </View>
  );
}
