import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  static const nomeRota = "/home";

  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _Home();
}

class _Home extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF292967),
      body: Container(
        padding: EdgeInsets.only(left: 20, right: 20, top: 10),
        child: Column(children: [
          //
          Row(
            children: [
              Container(
                height: 100,
                child: Image.asset('images/valorant-icon.png'),
              ),
              Container(
                height: 100,
                child: Container(
                  margin: EdgeInsets.only(top: 25),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            'Nome do cara',
                            style: Theme.of(context).textTheme.bodyText1,
                          ),
                          Container(
                              height: 25,
                              margin: EdgeInsets.only(left: 5),
                              child: Image.asset('images/rank.png'))
                        ],
                      ),
                      Container(
                        height: 25,
                        child: Row(children: [
                          Image.asset('images/rank.png'),
                          Image.asset('images/rank.png'),
                          Image.asset('images/rank.png')
                        ]),
                      )
                    ],
                  ),
                ),
              )
            ],
          )
        ]),
      ),
    );
  }
}
