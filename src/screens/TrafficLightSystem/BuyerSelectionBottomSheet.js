import React, {memo, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getBuyers,
  getStyles,
  getOrderEntities,
  getOperationsByStyleId,
  getOperationsByItem,
} from '../../api';
import {GlobalContext} from '../../context/GlobalProvider';
function BuyerSelectionBottomSheet(props) {
  const {buyers, setBuyers, orderEntities, setOrderEntities} =
    useContext(GlobalContext);

  const [buyerSearch, setBuyerSearch] = useState(false);
  const [searchStyles, setSearchStyles] = useState('');
  const [searchBuyer, setSearchBuyer] = useState('');
  const [filteredOrderEntities, setFilteredOrderEntities] = useState([]);
  const [clickedBuyer, setClickedBuyer] = useState();
  const [allItems, setAllItems] = useState([]);
  const [operationsUnderItem, setOperationsUnderItem] = useState([]);

  const findStylesJS = (items, searchTerm) =>
    items.filter(x =>
      x.styleName.toString().toUpperCase().startsWith(searchTerm.toUpperCase()),
    );

  const findBuyerJS = (items, searchTerm) =>
    items.filter(x =>
      x.name.toUpperCase().startsWith(searchTerm.toUpperCase()),
    );

  async function getStylesList() {
    if (props.styleList?.length !== undefined) {
      setAllItems(
        props.styleList.map(style => {
          return {styleId: style.id, item: style.item};
        }),
      );
    }
  }

  async function getBuyersList() {
    if (buyers.length === 0) {
      await getBuyers()
        .then(response => {
          let buyerMap = response.map(buyer => {
            return {name: buyer.name, id: buyer.id};
          });
          setBuyers(buyerMap);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  async function getOrderEntitiesList() {
    var orderEntities = [];
    await getOrderEntities()
      .then(response => {
        response.map(orderEntity =>
          orderEntity.styles.map(style => {
            orderEntities.push({
              styleName: style.name,
              styleId: style.id,
              customerId: orderEntity.customer.id,
              customerName: orderEntity.customer.name,
              orderId: orderEntity.id,
              orderName: orderEntity.name,
            });
          }),
        );
        setOrderEntities(orderEntities);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    // getOperationsByStyleList(props.selectedItemByStyle[0]?.item)
    getBuyersList();
    getOrderEntitiesList();
    getStylesList();
  }, [props.selectedDevice]);

  function buyerSelectionHandler() {
    props.bottomSheetRef.current?.close();
  }

  const buyerHandler = e => {
    const filterByBuyer = orderEntities.filter(x => x.customerName === e.name);
    setFilteredOrderEntities(filterByBuyer);
    setClickedBuyer(e);
  };

  const OrderEntity = ({orderEntity}) => (
    <TouchableOpacity
      onPress={() => {
        buyerSelectionHandler();
        props.setSelectedBuyerStyle(orderEntity);
        props.setSelectedItemByStyle(
          allItems.filter(item => item.styleId === orderEntity.styleId),
        );
      }}>
      <View style={styles.buyerStyleCardInfo}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignContent: 'space-between',
          }}>
          <Text style={styles.buyerCardOrderLabel}>
            {orderEntity?.orderName ? orderEntity?.orderName.toUpperCase() : ''}
          </Text>
          <Text style={styles.buyerCardOrderLabel}>
            {orderEntity?.orderName
              ? ' | ' + orderEntity?.customerName.toUpperCase()
              : ''}
          </Text>
        </View>
        <Text style={styles.buyerCardStyleLabel}>
          {orderEntity?.styleName ? orderEntity?.styleName.toUpperCase() : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const Buyer = ({buyer, setClickedBuyer, clickedBuyer}) => (
    <TouchableOpacity onPress={() => setClickedBuyer(buyer)} key={buyer.id}>
      <Text
        style={[
          styles.buyerScrollButton,
          {
            backgroundColor:
              clickedBuyer === buyer ? '#4C4C4C' : 'rgba(76, 76, 76, 0.1)',
            color: clickedBuyer === buyer ? '#FFF' : 'grey',
          },
        ]}>
        {buyer.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.bottomSheetHeader, {minHeight: 40, width: '100%'}]}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'space-around'}}>
              <Text
                style={[
                  styles.textLabel,
                  {fontSize: 16, color: '#FF5A5A', marginTop: 12},
                ]}>
                Select Buyer{' '}
              </Text>
            </View>
            <View style={{justifyContent: 'space-around'}}>
              {!buyerSearch ? (
                <TouchableOpacity onPress={() => setBuyerSearch(true)}>
                  <Text
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#efefef',
                      padding: 5,
                    }}>
                    {' '}
                    <AntDesign
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#efefef',
                        padding: 5,
                      }}
                      name="search1"
                      size={16}
                      color="rgba(0, 0, 0, 0.3)"
                    />{' '}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>

        {buyerSearch ? (
          <View style={styles.searchBuyerSection}>
            <AntDesign
              style={styles.searchIcon}
              name="search1"
              size={20}
              color="#efefef"
            />
            <TextInput
              style={styles.input}
              placeholder="Search Buyer"
              underlineColorAndroid="transparent"
              onChangeText={searchString => setSearchBuyer(searchString)}
            />
          </View>
        ) : null}

        <View style={{justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => props.bottomSheetRef.current?.close()}>
            <Text style={styles.textLabel}>
              <AntDesign size={26} color="#FF5A5A" name="close" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 18, height: 40}}>
        <FlatList
          initialNumToRender={5}
          ListEmptyComponent={
            <Text style={{color: '#4C4C4C', fontFamily: 'Lato-Regular'}}>
              No buyer found
            </Text>
          }
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={findBuyerJS(buyers || buyers, searchBuyer)}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <Buyer
              clickedBuyer={clickedBuyer}
              setClickedBuyer={e => buyerHandler(e)}
              key={index}
              buyer={item}
            />
          )}
        />
      </View>
      <View style={[styles.bottomSheetHeader, {marginTop: 15}]}>
        <View style={{justifyContent: 'space-around'}}>
          <Text style={[styles.textLabel, {fontSize: 16, color: '#FF5A5A'}]}>
            Select Style
          </Text>
        </View>
      </View>

      <View style={[styles.bottomSheetHeader, {marginTop: 15}]}>
        <View style={styles.searchSection}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={20}
            color="#efefef"
          />
          <TextInput
            style={styles.input}
            placeholder="Search style"
            onChangeText={searchString => setSearchStyles(searchString)}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <View style={{marginTop: 18}}>
        <View style={{marginTop: 18}}>
          <FlatList
            initialNumToRender={5}
            ListEmptyComponent={
              <Text style={{color: '#4C4C4C', fontFamily: 'Lato-Regular'}}>
                No style found
              </Text>
            }
            showsVerticalScrollIndicator={false}
            data={findStylesJS(
              filteredOrderEntities || orderEntities,
              searchStyles,
            )}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <OrderEntity key={index} orderEntity={item} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default memo(BuyerSelectionBottomSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  textLabel: {
    fontFamily: 'Lato-Bold',
  },
  bottomSheetHeader: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  buyerScrollButton: {
    fontFamily: 'Lato-Regular',
    backgroundColor: 'rgba(76, 76, 76, 0.1)',
    marginRight: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 14,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 20,
  },
  searchBuyerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
    paddingLeft: 5,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 20,
  },
  buyerStyleCardInfo: {
    backgroundColor: '#4C4C4C',
    flexDirection: 'column',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
    elevation: 0.4,
    marginBottom: 10,
  },
  buyerCardOrderLabel: {
    color: '#FF3E3E',
    paddingVertical: 6,
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
  buyerCardStyleLabel: {
    color: '#FFFFFF',
    paddingVertical: 6,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
});
