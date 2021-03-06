import { StyleSheet } from "react-native";

const blueColor = "#A3C1E2";
const greyColor = "#707070";
const basicFontSize = 17;
const basicPadding = 38;

const text = {
  color: "white",
  fontSize: basicFontSize,
  fontWeight: "bold",
  textAlign: "center",
};
const btnSubmit = {
  height: 48,
  justifyContent: "center",
  borderRadius: 30,
  backgroundColor: blueColor,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navContainer: {
    flex: 0.15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: basicPadding,
  },
  textNav: {
    color: greyColor,
    fontWeight: "bold",
    fontSize: basicFontSize + 3,
  },

  contentContainer: {
    flex: 0.65,
    paddingHorizontal: basicPadding - 8,
    marginTop: 15,
  },
  textQuestion: {
    fontSize: basicFontSize,
    fontWeight: "bold",
    color: greyColor,
    opacity: 0.9,
    marginLeft: 10,
  },

  btnContainer: {
    flex: 0.2,
    paddingHorizontal: basicPadding + 2,
    justifyContent: "center",
  },
  btnSubmit: {
    ...btnSubmit,
  },
  btnSubmitDisable: {
    ...btnSubmit,
    backgroundColor: "white",
    borderColor: "#BACCE1",
    borderWidth: 2,
    opacity: 0.7,
  },
  textBtnSubmit: {
    ...text,
  },
  textBtnSubmitDisable: {
    ...text,
    color: "#BACCE1",
  },
});

export default styles;
