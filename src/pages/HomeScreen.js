import {withNavigation} from 'react-navigation';
import React, {useState, useEffect} from 'react';
import {ScrollView, Text, FlatList} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import axios from 'axios';

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(
          'https://api.magicthegathering.io/v1/cards',
        );
        setLoading(false);
        setCards(response.data.cards);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <ScrollView>
      {loading === true && <Text>Carregando</Text>}
      {error !== '' && <Text>error</Text>}
      {cards.length !== 0 && (
        <FlatList
          data={cards}
          renderItem={({item}) => {
            return (
              <Card title={item.name} image={item.imageUrl}>
                <Text style={{marginBottom: 10}}>{item.text}</Text>
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
