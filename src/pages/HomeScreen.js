import {withNavigation} from 'react-navigation';
import React, {useState, useEffect} from 'react';
import {ScrollView, Text, FlatList, View, StyleSheet} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
  },
  textError: {fontSize: 24},
  card: {backgroundColor: 'white', borderRadius: 10},
  cardContainer: {paddingBottom: 10},
  headerText: {fontSize: 16, fontWeight: 'bold'},
  manaContainer: {flex: 1, flexDirection: 'row', padding: 10},
  blueMana: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: 'blue',
    borderWidth: 1,
  },
  redMana: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: 'red',
    borderWidth: 1,
  },
  greenMana: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: 'green',
    borderWidth: 1,
  },
  blackMana: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: 'black',
    borderWidth: 1,
  },
  whiteMana: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  colorlessMana: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: 'gray',
    borderWidth: 1,
  },
  paddingDivider: {paddingBottom: 10},
  viewCardButton: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderRadius: 10,
  },
  flatListFooterStyle: {paddingTop: 25},
  lastPage: {paddingBottom: 10},
});

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(
          `https://api.magicthegathering.io/v1/cards?page=${currentPage}&pageSize=30&contains=imageUrl`,
        );
        setLoading(false);
        setCards(response.data.cards);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [currentPage]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading === true && <Text style={styles.textError}>Loading...</Text>}
      {error !== '' && <Text>error</Text>}
      {cards.length !== 0 && loading === false && (
        <View style={{paddingBottom: 50}}>
          <FlatList
            data={cards}
            renderItem={({item}) => {
              return (
                <Card title={item.name} containerStyle={styles.card}>
                  <View style={styles.cardContainer}>
                    {item.colors.length !== 0 && (
                      <View>
                        <Text style={styles.headerText}>Colors:</Text>
                        <View style={styles.manaContainer}>
                          {item.colors.map(color => {
                            if (color === 'Blue') {
                              return <View style={styles.blueMana} />;
                            } else if (color === 'Red') {
                              return <View style={styles.redMana} />;
                            } else if (color === 'Green') {
                              return <View style={styles.greenMana} />;
                            } else if (color === 'Black') {
                              return <View style={styles.blackMana} />;
                            } else if (color === 'White') {
                              return <View style={styles.whiteMana} />;
                            } else {
                              return <View style={styles.colorlessMana} />;
                            }
                          })}
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={styles.paddingDivider}>
                    <Text style={styles.headerText}>Type:</Text>
                    <Text>{item.type}</Text>
                  </View>
                  <View style={styles.paddingDivider}>
                    <Text style={styles.headerText}>Set-Name:</Text>
                    <Text>{item.setName}</Text>
                  </View>
                  <Button
                    icon={<Icon name="search" color="#ffffff" />}
                    buttonStyle={styles.viewCardButton}
                    title="View Full Card"
                  />
                </Card>
              );
            }}
            keyExtractor={card => card.multiverseid}
            ListFooterComponent={() => {
              return (
                <View>
                  {currentPage !== 1 && (
                    <View style={styles.lastPage}>
                      <Button
                        buttonStyle={styles.viewCardButton}
                        title="Last Page"
                        onPress={() => {
                          setLoading(true);
                          setCurrentPage(currentPage - 1);
                        }}
                      />
                    </View>
                  )}
                  <Button
                    buttonStyle={styles.viewCardButton}
                    title="Next Page"
                    onPress={() => {
                      setLoading(true);
                      setCurrentPage(currentPage + 1);
                    }}
                  />
                </View>
              );
            }}
            ListFooterComponentStyle={styles.flatListFooterStyle}
          />
        </View>
      )}
    </ScrollView>
  );
}

export default withNavigation(HomeScreen);
