import 'package:flutter/material.dart';
import 'package:vduo/views/signup.dart';
import 'package:vduo/widgets/profile_info_row.dart';

import '../dbHelper/mongodb.dart';

class ProfileWidget extends StatelessWidget {
  final user;
  final bool isOwnProfile;
  const ProfileWidget(
      {super.key, required this.user, this.isOwnProfile = false});

  @override
  Widget build(BuildContext context) {
    return Align(
        alignment: Alignment.topCenter,
        child: Column(
          children: [
            Container(
              decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(40),
                      topLeft: Radius.circular(40)),
                  color: Color(0xFF9e9cc1)),
              margin: const EdgeInsets.only(top: 30),
              height: 180,
              width: 340,
              child: Center(
                  child: Column(
                children: [
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    width: 120,
                    height: 120,
                    decoration: const BoxDecoration(
                        // color: Colors.black,
                        shape: BoxShape.circle),
                    child: Image.asset('images/valorant-icon.png'),
                  ),
                  Text(
                    user['name'],
                    style: const TextStyle(fontSize: 24),
                  ),
                ],
              )),
            ),
            Container(
              decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                      bottomRight: Radius.circular(40),
                      bottomLeft: Radius.circular(40)),
                  color: Color(0xFF29293b)),
              height: isOwnProfile ? 370 : 260,
              width: 340,
              child: Column(children: [
                ProfileInfoRow(
                    image: const Icon(
                      Icons.alternate_email,
                      color: Colors.white,
                    ),
                    text: user['email']),
                ProfileInfoRow(
                    image: Image.asset('images/icons/Discord_icon.png'),
                    text: user['discord']),
                ProfileInfoRow(
                    image: const Icon(
                      Icons.local_offer,
                      color: Colors.white,
                    ),
                    text: user['tag']),
                ProfileInfoRow(
                    image:
                        Image.asset('images/icons/${user['agent']}_icon.png'),
                    text: user['agent']),
                ProfileInfoRow(
                    image: Image.asset('images/icons/${user['rank']}_icon.png'),
                    text: user['rank']),
                isOwnProfile
                    ? Column(
                        children: [
                          const Divider(
                            height: 20,
                            thickness: 1,
                            indent: 20,
                            endIndent: 20,
                            color: Color.fromARGB(64, 255, 255, 255),
                          ),
                          TextButton(
                            style: TextButton.styleFrom(
                              textStyle: const TextStyle(fontSize: 20),
                            ),
                            onPressed: () {
                              showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return AlertDialog(
                                        backgroundColor:
                                            const Color(0xFF29293b),
                                        title: const Text(
                                          'Você tem certeza que deseja editar seu perfil?',
                                          style: TextStyle(
                                              fontSize: 22,
                                              color: Colors.white),
                                        ),
                                        content: TextButton(
                                            onPressed: () {
                                              Navigator.push(
                                                context,
                                                MaterialPageRoute(
                                                    builder: (context) =>
                                                        Signup(
                                                            isEdit: true,
                                                            user: user)),
                                              );
                                              // int nDeleted =
                                              //     await _delete(user);
                                              // if (nDeleted > 0) {
                                              //   Navigator.pushReplacementNamed(
                                              //       context, "/");
                                              // }
                                            },
                                            child: const Text(
                                              'Editar meu perfil',
                                              style: TextStyle(
                                                  fontSize: 20,
                                                  color: Colors.white),
                                            )));
                                  });
                            },
                            child: const Text(
                              'Editar perfil',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                          const Divider(
                            height: 20,
                            thickness: 1,
                            indent: 20,
                            endIndent: 20,
                            color: Color.fromARGB(64, 255, 255, 255),
                          ),
                          TextButton(
                            style: TextButton.styleFrom(
                              textStyle: const TextStyle(fontSize: 20),
                            ),
                            onPressed: () {
                              showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return AlertDialog(
                                        backgroundColor:
                                            const Color(0xFF29293b),
                                        title: const Text(
                                          'Você tem certeza que deseja deletar seu perfil? Essa ação é irreversível.',
                                          style: TextStyle(
                                              fontSize: 22,
                                              color: Colors.white),
                                        ),
                                        content: TextButton(
                                            onPressed: () async {
                                              int nDeleted =
                                                  await _delete(user);
                                              if (nDeleted > 0) {
                                                Navigator.pushReplacementNamed(
                                                    context, "/");
                                              }
                                            },
                                            child: const Text(
                                              'Deletar meu perfil',
                                              style: TextStyle(
                                                  fontSize: 20,
                                                  color: Colors.red),
                                            )));
                                  });
                            },
                            child: const Text(
                              'Deletar perfil',
                              style: TextStyle(color: Colors.red),
                            ),
                          ),
                        ],
                      )
                    : Container(),
              ]),
            )
          ],
        ));
  }

  Future<int> _delete(Map user) async {
    return await MongoDatabase.deleteById(user);
  }
}
