import { View } from 'react-native';

import { pantrySections } from '../data/pantry-content';
import { PantrySectionCard } from './pantry-section-card';

export function PantrySectionsList() {
  return (
    <View>
      {pantrySections.map((section) => (
        <PantrySectionCard key={section.id} section={section} />
      ))}
    </View>
  );
}
