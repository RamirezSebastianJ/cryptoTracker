import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import Colors from '../../../res/colors';
import Http from '../../../libs/http';
import Storage from '../../../libs/Storage';
import CoinMarketItem from './CoinMarketItem';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };

  toggleFavorite = () => {
    if (!this.state.isFavorite) {
      this.addFavorite();
    } else {
      this.removeFavorite();
    }
  };

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;
    const stored = await Storage.instance.store(key, coin);
    console.log('stored', stored);
    if (stored) {
      this.setState({isFavorite: true});
    }
  };

  removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are sure?', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          await Storage.instance.remove(key);
          this.setState({isFavorite: false});
        },
        style: 'destructive',
      },
    ]);
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favSTR = await Storage.instance.get(key);
      if (favSTR !== null) {
        this.setState({isFavorite: true});
      }
    } catch (error) {
      console.log('Getfavorite error: ', error);
    }
  };

  getSymbolIcon = name => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getSections = coin => {
    const sections = [
      {
        title: 'Market Up',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Chage 24',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);

    this.setState({markets: markets});
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});
    this.getMarkets(coin.id);
    this.setState({coin}, () => {
      this.getFavorite();
    });
  }

  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.coin}>
            <Image
              style={styles.imgIcon}
              source={{uri: this.getSymbolIcon(coin.name)}}
            />
            <Text style={styles.nameCoinText}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriterRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoritetext}>
              {isFavorite ? 'Remove favorite' : 'Add Favorite'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketTitles}>Markets</Text>
        <FlatList
          style={styles.listStyle}
          horizontal={true}
          data={markets}
          renderItem={({item}) => CoinMarketItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  coin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  nameCoinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  listStyle: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitles: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoritetext: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriterRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
