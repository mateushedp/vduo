import 'package:flutter/material.dart';

class UserInfoRow2 extends StatelessWidget {
  final user;

  const UserInfoRow2({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return (Container(
      decoration: const BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(15)),
          color: Color(0xFF9e9cc1)),
      padding: const EdgeInsets.only(left: 15, right: 30, top: 10),
      child: Row(
        children: [
          Container(
            height: 80,
            margin: const EdgeInsets.only(bottom: 10),
            child: Image.asset('images/icons/Astra_icon.png'),
          ),
          Container(
            height: 82,
            margin: const EdgeInsets.only(top: 5, bottom: 10, left: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(user['name'],
                        style:
                            const TextStyle(color: Colors.white, fontSize: 22)),
                    const SizedBox(
                      width: 10,
                    ),
                    Image.asset(
                      'images/icons/${user['agent']}_icon.png',
                      height: 22,
                    ),
                  ],
                ),
                Row(children: [
                  Image.asset(
                    'images/icons/${user['rank']}_icon.png',
                    height: 20,
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Text(user['rank'],
                      style: const TextStyle(color: Colors.white, fontSize: 20))
                ])
              ],
            ),
          )
        ],
      ),
    ));
  }
}
