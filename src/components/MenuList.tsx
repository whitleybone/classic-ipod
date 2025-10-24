import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {MenuItem} from '../types';

interface MenuListProps {
  items: MenuItem[];
  selectedIndex: number;
  title?: string;
}

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width * 0.85;
const ITEM_HEIGHT = 49; // paddingVertical (12*2) + borderBottomWidth (1) + fontSize (14) + some padding

export const MenuList: React.FC<MenuListProps> = ({
  items,
  selectedIndex,
  title,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to keep selected item visible
    if (scrollViewRef.current && items.length > 0) {
      const offset = selectedIndex * ITEM_HEIGHT;
      scrollViewRef.current.scrollTo({
        y: offset,
        animated: true,
      });
    }
  }, [selectedIndex, items.length]);

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.menuItem,
              index === selectedIndex && styles.selectedItem,
            ]}>
            <Text
              style={[
                styles.menuText,
                index === selectedIndex && styles.selectedText,
              ]}
              numberOfLines={1}>
              {item.label}
            </Text>
            {item.subItems && item.subItems.length > 0 && (
              <Text
                style={[
                  styles.arrow,
                  index === selectedIndex && styles.selectedText,
                ]}>
                ▶
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8D5E5',
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#0066CC',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  selectedItem: {
    backgroundColor: '#0066CC',
  },
  menuText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  selectedText: {
    color: '#FFF',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 12,
    color: '#000',
    marginLeft: 10,
  },
});

