import {withNavigation} from 'react-navigation';
import React, {useState, useEffect} from 'react';
import {ScrollView, Text, FlatList, View} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import axios from 'axios';

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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
    <ScrollView>
      {loading === true && <Text>Carregando</Text>}
      {error !== '' && <Text>error</Text>}
      {cards.length !== 0 && (
        <FlatList
          data={cards}
          renderItem={({item}) => {
            return (
              <Card
                title={item.name}
                image={item.imageUrl}
                containerStyle={{backgroundColor: '#d3d3d3'}}>
                <Text>Colors:</Text>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                  {item.colors.map(color => {
                    if (color === 'Blue') {
                      return (
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 22 / 2,
                            backgroundColor: 'blue',
                          }}
                        />
                      );
                    } else if (color === 'Red') {
                      return (
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 22 / 2,
                            backgroundColor: 'red',
                          }}
                        />
                      );
                    } else if (color === 'Green') {
                      return (
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 22 / 2,
                            backgroundColor: 'green',
                          }}
                        />
                      );
                    } else if (color === 'Black') {
                      return (
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 22 / 2,
                            backgroundColor: 'black',
                          }}
                        />
                      );
                    } else if (color === 'White') {
                      return (
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 22 / 2,
                            backgroundColor: 'white',
                          }}
                        />
                      );
                    } else {
                      return (
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 22 / 2,
                            backgroundColor: 'gray',
                          }}
                        />
                      );
                    }
                  })}
                </View>
                <Text>Type:</Text>
                <Text>{item.type}</Text>
                <Text>Set-Name:</Text>
                <Text>{item.setName}</Text>
                <Button
                  icon={<Icon name="code" color="#ffffff" />}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="VIEW NOW"
                />
              </Card>
            );
          }}
          keyExtractor={card => card.multiverseid}
        />
      )}
    </ScrollView>
  );
}

export default withNavigation(HomeScreen);
