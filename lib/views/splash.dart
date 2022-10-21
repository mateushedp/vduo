import 'dart:async';
import 'package:flutter/material.dart';
import 'signup.dart';
import 'loginform.dart';

class SplashScreen extends StatefulWidget {
  static const nomeRota = "/";

  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreen();
}

class _SplashScreen extends State<SplashScreen> {
  double _logoContainerWidth = 300;
  double _logoTopMarginHeight = 100;

  //inicializa dois widgets como containers vazios. assim que a splash screen carregar,
  //no setState altera os dois para suas widgets correspondentes:
  //o divider, que é um hr
  //e o loginWidget, que é o formulario de login
  Widget divider = Container();
  Widget loginWidget = Container();

  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 3), () {
      setState(() {
        _logoContainerWidth = 200;
        _logoTopMarginHeight = 50;
      });
      Timer(const Duration(seconds: 1), () {
        setState(() {
          loginWidget = const LoginForm();
          divider = const Divider(
            height: 40,
            indent: 55,
            endIndent: 55,
            color: Color(0xFF9e9cc1),
          );
        });
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(color: Color(0xFF292967)),
        child: Column(
          children: [
            AnimatedContainer(
              duration: Duration(milliseconds: 500),
              width: _logoContainerWidth,
              child: Column(children: [
                AnimatedContainer(
                  duration: Duration(milliseconds: 500),
                  height: _logoTopMarginHeight,
                ),
                Image.asset('images/valorant-icon.png'),
              ]),
            ),
            divider,
            loginWidget,
          ],
        ));
  }
}
