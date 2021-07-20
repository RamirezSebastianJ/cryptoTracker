import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  StyleSheet,
} from 'react-native';
import Colors from '../../../res/colors';
import Http from '../../../libs/http';
import CoinMarketItem from './CoinMarketItem';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
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
    this.setState({coin});
  }

  render() {
    const {coin, markets} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image
            style={styles.imgIcon}
            source={{uri: this.getSymbolIcon(coin.name)}}
          />
          <Text style={styles.nameCoinText}>{coin.name}</Text>
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
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
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
    color: '#fff',
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
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listStyle: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitles: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CoinDetailScreen;
