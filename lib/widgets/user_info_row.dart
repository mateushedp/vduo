import 'package:flutter/material.dart';

class UserInfoRow extends StatelessWidget {
  var user;

  UserInfoRow({required this.user});

  @override
  Widget build(BuildContext context) {
    return (Container(
      padding: const EdgeInsets.only(left: 25, right: 30, top: 10),
      child: Row(
        children: [
          SizedBox(
            height: 120,
            child: Image.asset('images/icons/Astra_icon.png'),
          ),
          Container(
            height: 100,
            margin: const EdgeInsets.only(top: 10, left: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(user['name'],
                        style: const TextStyle(fontSize: 25),
                        overflow: TextOverflow.fade),
                    const SizedBox(
                      width: 10,
                    ),
                    Image.asset(
                      'images/icons/${user['agent']}_icon.png',
                      height: 25,
                    ),
                  ],
                ),
                Row(children: [
                  Image.asset(
                    'images/icons/${user['rank']}_icon.png',
                    height: 22,
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Text(user['rank'], style: const TextStyle(fontSize: 22))
                ])
              ],
            ),
          )
        ],
      ),
    ));
  }
}
