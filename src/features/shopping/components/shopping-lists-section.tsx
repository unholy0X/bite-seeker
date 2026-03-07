import { View } from 'react-native';

import { shoppingLists } from '../data/shopping-content';
import { ShoppingListCard } from './shopping-list-card';

export function ShoppingListsSection() {
  return (
    <View>
      {shoppingLists.map((list) => (
        <ShoppingListCard key={list.id} list={list} />
      ))}
    </View>
  );
}
