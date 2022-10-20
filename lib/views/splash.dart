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
  double _width = 300;
  double _sizedBoxHeight = 0;
  Alignment _alignment = Alignment.center;

  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 2), () {
      setState(() {
        _sizedBoxHeight = 40;
        _width = 200;
        _alignment = Alignment.topCenter;
        // Timer(const Duration(seconds: 2), () {
        //   // Navigator.pushNamed(context, LoginForm.nomeRota);
        // });
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(color: Color(0xFF292967)),
        child: Center(
            child: Column(
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 500),
              width: _width,
              alignment: _alignment,
              child: Column(children: [
                SizedBox(
                  height: _sizedBoxHeight,
                ),
                Image.asset('images/valorant-icon.png')
              ]),
            ),
            const Divider(
              height: 40,
              indent: 55,
              endIndent: 55,
              color: Color(0xFF9e9cc1),
            ),
            const LoginForm()
          ],
        )));
  }
}
