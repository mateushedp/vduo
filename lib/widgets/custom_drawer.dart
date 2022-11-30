import 'package:flutter/material.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({super.key, required this.user});
  final user;

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: const Color(0xFF29293b),
      child: SingleChildScrollView(
          child: Container(
              margin: const EdgeInsets.only(top: 50),
              child: Column(
                children: <Widget>[
                  ListTile(
                      leading: const Icon(Icons.home, color: Colors.white),
                      title: const Text("Home"),
                      onTap: () {
                        Navigator.pushReplacementNamed(context, "/home",
                            arguments: {
                              "user": user,
                            });
                      }),
                  ListTile(
                      leading: const Icon(Icons.person, color: Colors.white),
                      title: const Text("Perfil"),
                      onTap: () {
                        Navigator.pushReplacementNamed(context, "/profile",
                            arguments: {
                              "user": user,
                            });
                      }),
                  ListTile(
                      leading: Container(
                          margin: const EdgeInsets.only(left: 5),
                          child: Image.asset('images/icons/Exit_icon.png',
                              width: 20)),
                      title: const Text("Sair"),
                      onTap: () {
                        Navigator.pushReplacementNamed(context, "/");
                      })
                ],
              ))),
    );
  }
}
