/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  ToastAndroid,
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage as fs } from 'react-native-responsive-fontsize';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Icon as ElementIcon, Card, Button as IconButton, Input } from 'react-native-elements';
import { Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import data from '../../funds.json';
class homePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterData: [], fetchedData: [], isLoading: false, selected: 0, search: '' };
    // this.state = { filterData: [{UID:1,name:'SBI Amount Fund',FundType:'Equity',oneYrReturn:'16.05',threeyearReturn:'30.06',fiveyearReturn:'19.56'},{UID:2,name:'SBI Amount Fund',FundType:'Equity',oneYrReturn:'16.05',threeyearReturn:'30.06',fiveyearReturn:'19.56'}], fetchedData: [{name:'SBI Amount Fund',FundType:'Equity'}], isLoading: false,selected:1 };
    this.fetchedData();
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  async fetchedData() {
    this.state.isLoading = true;
    // let fundResponse = [];
    // fundResponse = await data.result.funds.filter(fund =>fund.UID < 10);
    // this.setState({ fetchedData: data.result.funds.filter(fund =>fund.UID < 10), filterData: data.result.funds.filter(fund =>fund.UID < 10) });
    this.state.filterData = data.result.funds.filter(fund => fund.UID < 50);
    this.state.fetchedData = data.result.funds.filter(fund => fund.UID < 50);
    this.state.isLoading = false;
  }
  showPerformance(id) {
    this.setState({ selected: id });
  }
  handleBackButton = () => {
    if (this.state.backCount === 0) {
      ToastAndroid.show(
        'Back button is pressed,App will close next time.',
        ToastAndroid.SHORT,
      );
      this.setState({ backCount: 1 });
      return true;
    } else {
      Alert.alert(
        'Exit App ',
        'Are you Sure Want to Exit ?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              this.setState({ backCount: 0 });
            },
          },
          {
            text: 'OK',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
        { cancelable: false },
      );

      return true;
    }
  };
  onChangeText(text) {
    this.setState({ search: text });
  }
  searchItem() {
    if (this.state.search) {
      this.setState({ filterData: this.state.fetchedData.filter(x => x.name.toLowerCase().includes(this.state.search.toLowerCase())) });
    }
    else
    {
      this.state.filterData = this.state.fetchedData;
    }
  }
  render() {
    return (
      <View>
        {this.state.isLoading ? (
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
            <View>
              <View style={styles.searchTab}>
                <Grid ><Col style={{ backgroundColor: '#f5f7f8', width: '80%' }}>
                  <TextInput placeholder="Search By AMC" value={this.state.search}
                    underlineColorAndroid='transparent'
                    onChangeText={(search) => this.setState({ search })} />
                </Col>
                  <Col
                    style={{
                      backgroundColor: '#308fbf',
                    }}>
                    <IconButton
                      onPress={() => this.searchItem()}
                      buttonStyle={{
                        height: hp('4%'),
                        backgroundColor: '#308fbf',
                      }}
                      icon={
                        <ElementIcon
                          name="search"
                          size={fs(4)}
                          color="white"
                          containerStyle={{ marginTop: hp(1.5) }}
                        />
                      }
                    />
                  </Col></Grid>
              </View>
              <ScrollView>
                {this.state.filterData.length ? (
                  <Card
                    containerStyle={styles.card}>
                    {this.state.filterData.map((u, i) => {
                      return (
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                          {this.state.selected === u.UID ? (<Grid
                            style={styles.mainGrid}>
                            <Row style={{ padding: 10, height: '40%' }}>
                              <Col>
                                <Image source={require('../../asset/images/mf.jpg')}
                                  style={{ width: 60, height: 60, borderRadius: 5 }} />
                              </Col>
                              <Col style={{ width: '75%', fontSize: fs(1.8) }}>
                                <Text>
                                  {u.name}
                                </Text>
                                <Text style={{ fontSize: fs(1.4), color: 'grey' }}>
                                  {u.FundType}
                                </Text>
                              </Col>
                              <Col style={{ width: '5%' }}>
                                <ElementIcon
                                  name="right"
                                  type="antdesign"
                                  size={fs(2)}
                                  color="grey"
                                  containerStyle={{ marginTop: hp(3) }}
                                />
                              </Col>
                            </Row>
                            <Row style={{
                              padding: 10, height: '40%', marginTop: hp(0.5), borderTopColor: 'grey',
                              borderTopWidth: 0.25,
                            }}>
                              <Col>
                                <Image source={require('../../asset/images/stats.jpg')}
                                  style={{ width: 50, height: 50, borderRadius: 5 }} />
                              </Col>
                              <Col>
                                <Text style={{ fontSize: fs(1.8), color: 'grey' }}>5 Y Return</Text>
                                <Text style={{ fontSize: fs(2.5) }}>{u.fiveyearReturn ? u.fiveyearReturn.toFixed(2) : 0} %</Text>
                              </Col>
                              <Col>
                                <Text style={{ fontSize: fs(1.8), color: 'grey' }}>3 Y Return</Text>
                                <Text style={{ fontSize: fs(2.5) }}>{u.threeyearReturn ? u.threeyearReturn.toFixed(2) : 0} %</Text>
                              </Col>
                              <Col>
                                <Text style={{ fontSize: fs(1.8), color: 'grey' }}>1 Y Return</Text>
                                <Text style={{ fontSize: fs(2.5) }}>{u.oneYrReturn ? u.oneYrReturn.toFixed(2) : 0} %</Text>
                              </Col>
                            </Row>
                            <Row>
                              <Col style={{ backgroundColor: '#f5f7f8', width: '55%' }}>
                                <TouchableOpacity onPress={() => this.showPerformance(0)} style={{ flexDirection: 'row', marginTop: hp(0.75), textAlign: 'center' }}>
                                  <Text style={{ fontSize: fs(1.6), color: 'grey', marginLeft: wp(2) }}>Show Performance Details</Text>
                                  <ElementIcon
                                    name="upcircleo"
                                    type="antdesign"
                                    size={fs(2.5)}
                                    color="grey"
                                    containerStyle={{ marginLeft: wp(5) }}
                                  />
                                </TouchableOpacity>
                              </Col>
                              <Col
                                style={{
                                  backgroundColor: '#308fbf',
                                }}>
                                <TouchableOpacity onPress={() => alert('Added to cart')} style={{ flexDirection: 'row', marginTop: hp(0.75), textAlign: 'center' }}>
                                  <ElementIcon
                                    name="shopping-cart"
                                    size={fs(2.5)}
                                    color="white"
                                    containerStyle={{ marginLeft: wp(5) }}
                                  />
                                  <Text style={{ fontSize: fs(1.8), color: 'white', marginLeft: wp(8) }}>Invest Now</Text>
                                </TouchableOpacity>
                              </Col>
                            </Row>
                          </Grid>) : (<Grid
                            style={styles.mainSubGrid}>
                            <Row style={{ padding: 10, height: '75%' }}>
                              <Col>
                                <Image source={require('../../asset/images/mf.jpg')}
                                  style={{ width: 60, height: 60, borderRadius: 5 }} />
                              </Col>
                              <Col style={{ width: '75%', fontSize: fs(1.8) }}>
                                <Text>
                                  {u.name}
                                </Text>
                                <Text style={{ fontSize: fs(1.4), color: 'grey' }}>
                                  {u.FundType}
                                </Text>
                              </Col>
                              <Col style={{ width: '5%' }}>
                                <ElementIcon
                                  name="right"
                                  type="antdesign"
                                  size={fs(2)}
                                  color="grey"
                                  containerStyle={{ marginTop: hp(3) }}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col style={{ backgroundColor: '#f5f7f8', width: '55%' }}>
                                <TouchableOpacity onPress={() => this.showPerformance(u.UID)} style={{ flexDirection: 'row', marginTop: hp(0.75), textAlign: 'center' }}>
                                  <Text style={{ fontSize: fs(1.6), color: 'grey', marginLeft: wp(2) }}>Show Performance Details</Text>
                                  <ElementIcon
                                    name="downcircleo"
                                    type="antdesign"
                                    size={fs(2.5)}
                                    color="grey"
                                    containerStyle={{ marginLeft: wp(5) }}
                                  />
                                </TouchableOpacity>
                              </Col>
                              <Col
                                style={{
                                  backgroundColor: '#308fbf',
                                }}>
                                <TouchableOpacity onPress={() => alert('Added to cart')} style={{ flexDirection: 'row', marginTop: hp(0.75), textAlign: 'center' }}>
                                  <ElementIcon
                                    name="shopping-cart"
                                    size={fs(2.5)}
                                    color="white"
                                    containerStyle={{ marginLeft: wp(5) }}
                                  />
                                  <Text style={{ fontSize: fs(1.8), color: 'white', marginLeft: wp(8) }}>Invest Now</Text>
                                </TouchableOpacity>
                              </Col>
                            </Row>
                          </Grid>)}


                        </View>);
                    })}
                  </Card>
                ) : (
                    <View style={{ alignItems: 'center' }}>
                      <Icon
                        iconSize={20}
                        name="sad"
                        npm
                        title="cart"
                        iconName="md-cart"
                        selectedIconName="ios-home"
                        style={{
                          color: '#308ebf',
                          marginTop: hp('18%'),
                          fontSize: 60,
                        }}
                      />
                      <Text style={{ fontSize: 25 }}>No records found!</Text>
                    </View>
                  )}
              </ScrollView>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  MainContainer: {
    flex: 1,
  },
  flatListStyle: {
    // padding: 0,
    // elevation: 0,
    // backgroundColor: '#8d8e8e',
    // borderWidth: 0,
    width: wp(100),
  },
  Grid: {
    backgroundColor: '#8d8e8e',
    //borderRadius: 5,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    //shadowOffset: { width: 2, height: 2 },
    shadowColor: '#8d8e8e',
    shadowOpacity: 1,
    elevation: 10,
    borderWidth: 0,
    height: hp('20%'),
  },
  searchTab:{
    backgroundColor: 'white',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'white',
    shadowOpacity: 1,
    elevation: 10,
    borderWidth: 0,
    width: wp('94%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    height: hp(6),
  },
  card:{
    padding: 0,
    elevation: 0,
    backgroundColor: '#eef2f5',
    borderWidth: 0,
    width: wp('94%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
  },
  mainGrid:{
    backgroundColor: 'white',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'white',
    shadowOpacity: 1,
    elevation: 10,
    borderWidth: 0,
    height: hp('25%'),
  },
  mainSubGrid:{
    backgroundColor: 'white',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'white',
    shadowOpacity: 1,
    elevation: 10,
    borderWidth: 0,
    height: hp('15%'),
  }
});
export default homePage;
