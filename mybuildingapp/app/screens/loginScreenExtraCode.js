<>
  <View style={styles.upLogo}>
    <Image
      source={require("../assets/logo.png")}
      style={styles.logoImg}
    ></Image>
    <Text style={styles.logoText}>MY BUILDING</Text>
  </View>
  <View style={styles.loginBtnSection}>
    <View>
      <Text style={styles.text}>Login if you already have an account</Text>
    </View>

    <View style={styles.inputTextView}>
      <TextInput
        placeholder="E-mail"
        style={styles.inputText}
        keyboardType="email-address"
        returnKeyType="send"
        textAlign="center"
        autoCapitalize="none"
        dataDetectorTypes="address"
        textContentType="emailAddress"
        onChangeText={(telf) => {
          setResponse(telf);
          emptyInputEmail(telf);
        }}
        multiline={false}
        onSubmitEditing={buttonHandler}
        value={inputValueEmail} /*maxLength={9}*/
      />
    </View>

    <View
      style={{
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        top: 20,
      }}
    >
      <TextInput
        placeholder="Password"
        style={styles.inputText}
        keyboardType="default"
        returnKeyType="send"
        textAlign="center"
        autoCapitalize="none"
        dataDetectorTypes="all"
        textContentType="password"
        secureTextEntry
        onChangeText={(telf) => {
          setResponse(telf);
          emptyInputPassword(telf);
        }}
        multiline={false}
        onSubmitEditing={buttonHandler}
        value={inputValuePassword} /*maxLength={9}*/
      />
    </View>

    {/* <TextInput placeholder="Número de telefono" style={styles.inputText}
              keyboardType="phone-pad" returnKeyType="send" textAlign="center"
              dataDetectorTypes="phoneNumber" textContentType="telephoneNumber" /> */}

    <TouchableOpacity style={styles.loginBtn} onPress={buttonHandler}>
      <Text style={styles.loginText}> Log In </Text>
    </TouchableOpacity>

    <View style={styles.registerView}>
      <TouchableOpacity>
        <Text>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.bottomView}>
      <Text style={styles.bottomText}>Developed by Varo</Text>
    </View>
  </View>
</>;
