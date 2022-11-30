import 'package:flutter/material.dart';
import 'package:vduo/widgets/custom_drawer.dart';
import 'package:vduo/widgets/profile_widget.dart';

class Profile extends StatefulWidget {
  static const nomeRota = "/profile";

  const Profile({super.key});

  @override
  State<Profile> createState() => _Profile();
}

class _Profile extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    final Map dados = ModalRoute.of(context)!.settings.arguments as Map;
    final Map user = dados['user'];

    return Scaffold(
        backgroundColor: const Color(0xFF292967),
        appBar: AppBar(backgroundColor: const Color(0xFF292967)),
        drawer: CustomDrawer(
          user: user,
        ),
        body: ProfileWidget(
          user: user,
          isOwnProfile: true,
        ));
  }
}
