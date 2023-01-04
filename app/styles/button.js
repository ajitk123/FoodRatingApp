import colors from "./colors";

export const buttonStyles = {
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  customSignUpText: {
    color: colors.purple,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  loginText: {
    color: colors.black,
    textAlign: "left",
    fontSize: 17,
    flexDirection: "row",
    marginHorizontal: 5,
  }
};
