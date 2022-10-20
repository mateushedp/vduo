import "package:flutter/material.dart";
import 'splash.dart';
import 'signup.dart';
import 'loginform.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Meu app',
        theme: ThemeData(
            primarySwatch: Colors.blue,
            fontFamily: 'Poppins',
            textTheme: const TextTheme(
                bodyText1: TextStyle(color: Colors.white, fontSize: 16)),
            inputDecorationTheme: const InputDecorationTheme(
              labelStyle: TextStyle(color: Colors.white),
              filled: true,
              fillColor: Color(0xFF9e9cc1),
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                  borderSide: BorderSide(color: Color(0xFF9e9cc1))),
              enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                  borderSide: BorderSide(color: Color(0xFF9e9cc1))),
            )),
        initialRoute: SplashScreen.nomeRota,
        routes: {
          SplashScreen.nomeRota: (context) => const SplashScreen(),
          Signup.nomeRota: (context) => const Signup(),
          LoginForm.nomeRota: (context) => const LoginForm(),
        });
  }
}
