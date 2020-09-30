import React from "react";
import { View } from "react-native";
import styles from "../Styles/AreaStyles";
import Card from "./Card";
import Loading from "./Loading";

import * as config from "../config";
import XMLParser from "react-native-xml2js";

const CORONA_API_KEY = config.CORONA_API_KEY;

class Area extends React.Component {
  state = {
    isLoaded: false,
    isRegion: this.props.isRegion,
    datas: {},
    startDate: 0,
    endDate: 0,
  };

  _getData = async (startDate, endDate) => {
    const { isRegion } = this.state;
    const CORONA_API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
      startDate + 1
    }&endCreateDt=${endDate}&`;
    const KOREA_API_URL = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${CORONA_API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${startDate}&endCreateDt=${endDate}&`;

    await fetch(isRegion ? CORONA_API_URL : KOREA_API_URL)
      .then((response) => response.text())
      .then((data) => {
        XMLParser.parseString(data, (err, result) => {
          const datas = JSON.stringify(result);
          const parsedDatas = JSON.parse(datas);

          let decideCnt,
            careCnt,
            clearCnt,
            decideDiff = 0,
            careDiff = 0,
            clearDiff = 0;

          if (isRegion) {
            const items = parsedDatas.response.body[0].items[0].item;
            let { location } = this.props;
            if (
              location.length == 5 ||
              location.length == 3 ||
              location.length == 7
            ) {
              location = location.substring(0, 2);
            } else {
              location = location.charAt(0) + location.charAt(2);
            }

            let index;
            Object.values(items).some((item, i) => {
              const { gubun } = item;
              if (location == gubun) index = i;
              return location == gubun;
            });

            decideCnt = items[index].defCnt;
            careCnt = items[index].isolIngCnt;
            clearCnt = items[index].isolClearCnt;
          } else {
            const items = parsedDatas.response.body[0].items[0].item;
            items.map((item) => {
              if (item.stateDt == this.state.endDate) {
                decideCnt = item.decideCnt;
                careCnt = item.careCnt;
                clearCnt = item.clearCnt;
              } else if (item.stateDt == this.state.startDate) {
                decideDiff = decideCnt - item.decideCnt;
                careDiff = careCnt - item.careCnt;
                clearDiff = clearCnt - item.clearCnt;
              }
            });
          }

          this.setState({
            datas: {
              확진자: { title: "확진자", number: decideCnt, diff: decideDiff },
              격리중: { title: "격리중", number: careCnt, diff: careDiff },
              격리해제: {
                title: "격리해제",
                number: clearCnt,
                diff: clearDiff,
              },
            },
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);

    let startDate = year + month + (date.getDate() - 1);
    let endDate = year + month + date.getDate();

    if (date.getHours() < 10) {
      startDate = year + month + (date.getDate() - 2);
      endDate = year + month + (date.getDate() - 1);
    }

    this._getData(startDate, endDate);
    this.setState({
      isLoaded: true,
      startDate: startDate,
      endDate: endDate,
    });
  }

  render() {
    const { datas, isLoaded, isRegion } = this.state;
    return (
      <View style={styles.container}>
        {isLoaded ? (
          Object.values(datas).map((data, index) => (
            <Card
              key={index}
              title={data.title}
              number={data.number}
              diff={data.diff}
              isRegion={isRegion}
            />
          ))
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

export default Area;
